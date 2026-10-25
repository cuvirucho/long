import { Link2, Share2 } from 'lucide-react'
import { FacebookIcon, WhatsAppIcon } from '../assets/icons/Doodles.jsx'
import { useCart } from '../hooks/useCart.js'

// Botones para compartir un enlace en redes. En móviles con Web Share API se
// ofrece además el menú nativo del sistema.
export default function ShareButtons({ url, text, className = '' }) {
  const { notify } = useCart()
  const canShareNatively = typeof navigator !== 'undefined' && typeof navigator.share === 'function'
  const encodedUrl = encodeURIComponent(url)
  const encodedText = encodeURIComponent(text)

  const shareNatively = () => {
    navigator.share({ title: 'Long Wraps', text, url }).catch(() => {
      // El usuario canceló el menú de compartir.
    })
  }

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      notify('Enlace copiado. ¡Compártelo para sumar votos!')
    } catch {
      notify('No se pudo copiar el enlace.')
    }
  }

  return (
    <div className={`share ${className}`.trim()} role="group" aria-label="Compartir">
      {canShareNatively && (
        <button type="button" className="share__btn share__btn--native" onClick={shareNatively}>
          <Share2 size={18} aria-hidden="true" /> Compartir
        </button>
      )}
      <a
        className="share__btn share__btn--whatsapp"
        href={`https://wa.me/?text=${encodedText}%20${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Compartir en WhatsApp"
      >
        <WhatsAppIcon />
      </a>
      <a
        className="share__btn share__btn--facebook"
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Compartir en Facebook"
      >
        <FacebookIcon />
      </a>
      <a
        className="share__btn share__btn--x"
        href={`https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Compartir en X"
      >
        <span aria-hidden="true">𝕏</span>
      </a>
      <button type="button" className="share__btn" onClick={copyLink} aria-label="Copiar enlace">
        <Link2 size={18} aria-hidden="true" />
      </button>
    </div>
  )
}
