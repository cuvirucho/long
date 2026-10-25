import { useState } from 'react'
import { Heart, ShoppingBag } from 'lucide-react'
import { useCart } from '../hooks/useCart.js'
import { creationUrl, hasVoted, toggleVote } from '../services/creations.js'
import { formatMoney } from '../utils/money.js'
import { calculateWrapPrice, createWrapSnapshot } from '../utils/wrapPricing.js'
import Button from './Button.jsx'
import ShareButtons from './ShareButtons.jsx'
import WrapRecipe from './WrapRecipe.jsx'

export default function CreationCard({ creation, featured = false }) {
  const { addCustomWrap, notify } = useCart()
  const [voted, setVoted] = useState(() => hasVoted(creation.id))
  const [votes, setVotes] = useState(creation.votes)
  const [busy, setBusy] = useState(false)

  // Actualización optimista: el corazón cambia al instante y se revierte si falla.
  const handleVote = async () => {
    if (busy) return
    const previous = { voted, votes }
    setBusy(true)
    setVoted(!voted)
    setVotes(votes + (voted ? -1 : 1))
    try {
      const result = await toggleVote(creation.id)
      setVoted(result.voted)
      setVotes(result.votes)
    } catch {
      setVoted(previous.voted)
      setVotes(previous.votes)
      notify('No se pudo registrar tu voto. Intenta de nuevo.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <article className={`top-card creation-card ${featured ? 'creation-card--featured' : ''}`}>
      <div className="top-card__head">
        {featured && <span className="chip">Compartido contigo</span>}
        <button
          type="button"
          className={`vote-btn ${voted ? 'is-voted' : ''}`}
          onClick={handleVote}
          aria-pressed={voted}
          aria-label={`${voted ? 'Quitar voto de' : 'Votar por'} ${creation.name}, ${votes} ${votes === 1 ? 'voto' : 'votos'}`}
        >
          <Heart size={18} aria-hidden="true" fill={voted ? 'currentColor' : 'none'} />
          <span aria-hidden="true">{votes}</span>
        </button>
      </div>

      <h3 className="top-card__name">{creation.name}</h3>
      <p className="top-card__creator">
        creado por <strong>{creation.creator}</strong>
      </p>

      <WrapRecipe selection={creation.selection} />

      <div className="top-card__footer">
        <span className="price">{formatMoney(calculateWrapPrice(creation.selection))}</span>
        <Button variant="navy" icon={ShoppingBag} onClick={() => addCustomWrap(createWrapSnapshot(creation.selection), creation.name)}>
          Lo quiero
        </Button>
      </div>

      <ShareButtons
        className="creation-card__share"
        url={creationUrl(creation.id)}
        text={`¡Vota por "${creation.name}" de ${creation.creator} en Long Wraps!`}
      />
    </article>
  )
}
