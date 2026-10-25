import { useState } from 'react'
import { CircleAlert, CircleCheck, Send, Trophy } from 'lucide-react'
import { CREATOR_MAX, NAME_MAX, creationUrl, publishCreation } from '../services/creations.js'
import Button from './Button.jsx'
import ShareButtons from './ShareButtons.jsx'

// Paso posterior a "Agregar al pedido": publicar el wrap para que la comunidad vote.
export default function PublishCreation({ selection, onClose }) {
  const [name, setName] = useState('')
  const [creator, setCreator] = useState('')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [publishedId, setPublishedId] = useState(null)

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!name.trim() || !creator.trim()) {
      setError('Escribe el nombre de tu wrap y tu nombre.')
      return
    }
    setSending(true)
    setError('')
    try {
      setPublishedId(await publishCreation({ name, creator, selection }))
    } catch {
      setError('No se pudo publicar. Revisa tu conexión e intenta de nuevo.')
    } finally {
      setSending(false)
    }
  }

  const viewCreations = () => {
    onClose()
    // Tras cerrar el modal (que devuelve el foco al botón que lo abrió), se baja a la sección.
    setTimeout(() => document.getElementById('creaciones')?.scrollIntoView({ behavior: 'smooth' }), 50)
  }

  if (publishedId) {
    return (
      <div className="publish publish--done">
        <Trophy className="publish__icon" size={44} aria-hidden="true" />
        <h2 id="builder-title" className="publish__title">¡Tu wrap ya está publicado!</h2>
        <p className="publish__text">Compártelo en tus redes para que tus amigos voten por <strong>{name.trim()}</strong>.</p>
        <ShareButtons
          className="publish__share"
          url={creationUrl(publishedId)}
          text={`¡Vota por mi wrap "${name.trim()}" en Long Wraps!`}
        />
        <div className="publish__actions">
          <Button variant="ghost" onClick={onClose}>
            Listo
          </Button>
          <Button variant="navy" onClick={viewCreations}>
            Ver creaciones
          </Button>
        </div>
      </div>
    )
  }

  return (
    <form className="publish" onSubmit={handleSubmit} noValidate>
      <p className="publish__added" role="status">
        <CircleCheck size={20} aria-hidden="true" /> ¡Agregado a tu pedido!
      </p>
      <h2 id="builder-title" className="publish__title">¿Publicas tu wrap?</h2>
      <p className="publish__text">Ponle nombre y deja que la comunidad vote por él. Los más votados llegan al Top 3.</p>

      <label className="field">
        <span className="field__label">Nombre de tu wrap</span>
        <input
          className="field__input"
          value={name}
          onChange={(event) => setName(event.target.value)}
          maxLength={NAME_MAX}
          placeholder="Ej. El Volcán"
          autoComplete="off"
          required
        />
      </label>
      <label className="field">
        <span className="field__label">Tu nombre</span>
        <input
          className="field__input"
          value={creator}
          onChange={(event) => setCreator(event.target.value)}
          maxLength={CREATOR_MAX}
          placeholder="Ej. Andrea M."
          autoComplete="given-name"
          required
        />
      </label>

      {error && (
        <p className="builder-panel__error" role="alert">
          <CircleAlert size={16} aria-hidden="true" /> {error}
        </p>
      )}

      <div className="publish__actions">
        <Button variant="ghost" onClick={onClose}>
          Ahora no
        </Button>
        <Button type="submit" icon={Send} disabled={sending}>
          {sending ? 'Publicando…' : 'Publicar'}
        </Button>
      </div>
      <p className="fine-print">Tu nombre y la receta serán visibles para todos.</p>
    </form>
  )
}
