import { ensureUser, getFirebase } from '../config/firebase.js'
import { BUILDER_STEPS } from '../data/ingredients.js'
import { calculateWrapPrice } from '../utils/wrapPricing.js'

// Wraps publicados por la comunidad, en la colección "creaciones" de Firestore.
// Cada voto es un documento creaciones/{id}/votos/{uid}; las reglas de Firestore
// (firestore.rules) garantizan un voto por usuario y que el contador cambie de 1 en 1.

export const COLLECTION = 'creaciones'
export const PAGE_SIZE = 10
export const NAME_MAX = 40
export const CREATOR_MAX = 30
export const MIN_SEARCH = 2

// Evento que emite el modal "Crea tu wrap" al publicar, para refrescar la lista.
export const CREATION_PUBLISHED_EVENT = 'longwraps:creation-published'

const MAX_TOKEN_LENGTH = 15
const MAX_TOKENS = 100
const VOTED_KEY = 'longwraps:votos'

// Minúsculas, sin tildes ni signos: "Pollo Picosón!" → "pollo picoson".
export function normalizeSearch(text) {
  return String(text ?? '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

// Prefijos de cada palabra del nombre y del creador, para buscar con una sola
// consulta "array-contains" ("pol" encuentra "Pollo Loco" y al creador "Pola").
export function buildSearchTokens(name, creator) {
  const tokens = new Set()
  for (const word of normalizeSearch(`${name} ${creator}`).split(' ')) {
    for (let length = MIN_SEARCH; length <= Math.min(word.length, MAX_TOKEN_LENGTH); length += 1) {
      tokens.add(word.slice(0, length))
    }
  }
  return [...tokens].slice(0, MAX_TOKENS)
}

// Término de búsqueda: la palabra más larga (la más selectiva), recortada como los tokens.
function searchTerm(search) {
  const words = normalizeSearch(search).split(' ').filter((word) => word.length >= MIN_SEARCH)
  if (!words.length) return null
  const longest = words.reduce((best, word) => (word.length > best.length ? word : best))
  return longest.slice(0, MAX_TOKEN_LENGTH)
}

// Solo se guardan los pasos conocidos y sin ids vacíos.
function cleanSelection(selection) {
  return Object.fromEntries(
    BUILDER_STEPS.map(({ key, type }) => {
      const value = selection[key]
      return [key, type === 'single' ? value || '' : (value ?? []).filter(Boolean)]
    }),
  )
}

function toCreation(snapshot) {
  const data = snapshot.data()
  return {
    id: snapshot.id,
    name: data.name,
    creator: data.creator,
    selection: data.selection ?? {},
    votes: data.votes ?? 0,
    createdAt: data.createdAt?.toDate?.() ?? null,
  }
}

export async function publishCreation({ name, creator, selection }) {
  const user = await ensureUser()
  const { fs, db } = await getFirebase()
  const cleanName = name.trim().slice(0, NAME_MAX)
  const cleanCreator = creator.trim().slice(0, CREATOR_MAX)
  const ref = await fs.addDoc(fs.collection(db, COLLECTION), {
    name: cleanName,
    creator: cleanCreator,
    selection: cleanSelection(selection),
    totalCents: calculateWrapPrice(selection),
    votes: 0,
    searchTokens: buildSearchTokens(cleanName, cleanCreator),
    authorUid: user.uid,
    createdAt: fs.serverTimestamp(),
  })
  window.dispatchEvent(new CustomEvent(CREATION_PUBLISHED_EVENT, { detail: { id: ref.id } }))
  return ref.id
}

// Página de 10 con paginación por cursor: pide 11 solo para saber si hay siguiente.
// `cursor` es el último documento de la página anterior (o null para la primera).
export async function fetchCreationsPage({ sort = 'votes', search = '', cursor = null }) {
  const { fs, db } = await getFirebase()
  const constraints = []
  const term = searchTerm(search)
  if (term) constraints.push(fs.where('searchTokens', 'array-contains', term))
  // Un solo orderBy: sin búsqueda no hace falta índice compuesto (Firestore
  // desempata por id, así el cursor sigue siendo estable).
  constraints.push(sort === 'votes' ? fs.orderBy('votes', 'desc') : fs.orderBy('createdAt', 'desc'))
  if (cursor) constraints.push(fs.startAfter(cursor))
  constraints.push(fs.limit(PAGE_SIZE + 1))

  const snapshot = await fs.getDocs(fs.query(fs.collection(db, COLLECTION), ...constraints))
  const docs = snapshot.docs.slice(0, PAGE_SIZE)
  return {
    items: docs.map(toCreation),
    nextCursor: snapshot.docs.length > PAGE_SIZE ? docs[docs.length - 1] : null,
  }
}

export async function fetchCreation(id) {
  const { fs, db } = await getFirebase()
  const snapshot = await fs.getDoc(fs.doc(db, COLLECTION, id))
  return snapshot.exists() ? toCreation(snapshot) : null
}

export async function fetchTopCreations(count = 3) {
  const { fs, db } = await getFirebase()
  const snapshot = await fs.getDocs(
    fs.query(fs.collection(db, COLLECTION), fs.orderBy('votes', 'desc'), fs.limit(count)),
  )
  return snapshot.docs.map(toCreation)
}

// Vota o quita el voto en una transacción: el documento del voto y el contador
// cambian juntos, así las reglas pueden verificar que solo suba o baje 1.
export async function toggleVote(id) {
  const user = await ensureUser()
  const { fs, db } = await getFirebase()
  const creationRef = fs.doc(db, COLLECTION, id)
  const voteRef = fs.doc(creationRef, 'votos', user.uid)

  const result = await fs.runTransaction(db, async (transaction) => {
    const creation = await transaction.get(creationRef)
    const vote = await transaction.get(voteRef)
    if (!creation.exists()) throw new Error('La creación ya no existe')
    const votes = creation.data().votes ?? 0
    if (vote.exists()) {
      transaction.delete(voteRef)
      transaction.update(creationRef, { votes: votes - 1 })
      return { voted: false, votes: votes - 1 }
    }
    transaction.set(voteRef, { createdAt: fs.serverTimestamp() })
    transaction.update(creationRef, { votes: votes + 1 })
    return { voted: true, votes: votes + 1 }
  })

  rememberVote(id, result.voted)
  return result
}

// Copia local de los votos, solo para pintar el corazón sin lecturas extra.
function readVoted() {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(VOTED_KEY) ?? '[]')
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function hasVoted(id) {
  return readVoted().includes(id)
}

function rememberVote(id, voted) {
  try {
    const others = readVoted().filter((votedId) => votedId !== id)
    window.localStorage.setItem(VOTED_KEY, JSON.stringify(voted ? [...others, id] : others))
  } catch {
    // Almacenamiento no disponible: el voto sigue registrado en Firestore.
  }
}

// Enlace para compartir: abre la página directamente en la creación.
export function creationUrl(id) {
  const url = new URL(window.location.href)
  url.search = ''
  url.hash = 'creaciones'
  url.searchParams.set('creacion', id)
  return url.toString()
}
