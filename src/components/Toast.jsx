import { CircleCheck, X } from 'lucide-react'
import { useCart } from '../hooks/useCart.js'

export default function Toast() {
  const { notice, count, isOpen, openCart, dismissNotice } = useCart()

  return (
    <div className="toast-region" role="status" aria-live="polite">
      {notice && !isOpen && (
        <div className="toast" key={notice.id}>
          <CircleCheck size={22} aria-hidden="true" className="toast__icon" />
          <p className="toast__msg">
            {notice.message}
            <span className="toast__count">
              {count} {count === 1 ? 'producto' : 'productos'} en tu pedido
            </span>
          </p>
          <button
            type="button"
            className="toast__action"
            onClick={() => {
              dismissNotice()
              openCart()
            }}
          >
            Ver pedido
          </button>
          <button type="button" className="icon-btn icon-btn--light" onClick={dismissNotice} aria-label="Cerrar aviso">
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  )
}
