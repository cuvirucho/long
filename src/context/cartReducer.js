import { createContext } from 'react'

export const CartContext = createContext(null)

export const STORAGE_KEY = 'longwraps.cart.v1'

function isValidItem(item) {
  return (
    item &&
    typeof item.lineId === 'string' &&
    typeof item.name === 'string' &&
    Number.isInteger(item.unitPriceCents) &&
    Number.isInteger(item.qty) &&
    item.qty > 0
  )
}

// Inicialización perezosa: lee localStorage de forma segura.
export function loadCart() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed.filter(isValidItem) : []
  } catch {
    return []
  }
}

export function saveCart(items) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  } catch {
    // Almacenamiento no disponible (modo privado, cuota llena): el carrito sigue en memoria.
  }
}

export function cartReducer(items, action) {
  switch (action.type) {
    case 'add': {
      const { item } = action
      // Los productos del menú se agrupan; los personalizados siempre van en línea propia.
      if (item.type === 'menu') {
        const existing = items.find((line) => line.type === 'menu' && line.productId === item.productId)
        if (existing) {
          return items.map((line) =>
            line.lineId === existing.lineId ? { ...line, qty: line.qty + item.qty } : line,
          )
        }
      }
      return [...items, item]
    }
    case 'increment':
      return items.map((line) => (line.lineId === action.lineId ? { ...line, qty: line.qty + 1 } : line))
    case 'decrement':
      return items.map((line) =>
        line.lineId === action.lineId ? { ...line, qty: Math.max(1, line.qty - 1) } : line,
      )
    case 'remove':
      return items.filter((line) => line.lineId !== action.lineId)
    case 'clear':
      return []
    default:
      return items
  }
}

export function createLineId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID()
  return `line-${Date.now()}-${Math.random().toString(36).slice(2)}`
}
