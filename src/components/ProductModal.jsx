import { useState } from 'react'
import { Minus, Plus, ShoppingCart, X } from 'lucide-react'
import { useCart } from '../hooks/useCart.js'
import { useDialog } from '../hooks/useDialog.js'
import { formatMoney } from '../utils/money.js'
import Button from './Button.jsx'
import { ProductImage } from './WrapCard.jsx'

export default function ProductModal({ product, onClose }) {
  const [qty, setQty] = useState(1)
  const { addMenuItem, openBuilder } = useCart()
  const panelRef = useDialog(true, onClose)

  const handleAdd = () => {
    addMenuItem(product, qty)
    onClose()
  }

  const handleCustomize = () => {
    onClose()
    openBuilder()
  }

  return (
    <div className="overlay" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-modal-title"
        tabIndex={-1}
        ref={panelRef}
      >
        <button type="button" className="icon-btn modal__close" onClick={onClose} aria-label="Cerrar detalle">
          <X size={20} />
        </button>
        <ProductImage product={product} className="modal__img" />
        <div className="modal__body">
          {product.tag && <span className="chip">{product.tag}</span>}
          <h3 id="product-modal-title" className="modal__title">{product.name}</h3>
          <p className="modal__desc">{product.description}</p>
          <p className="modal__price">
            <span className="price">{formatMoney(product.priceCents)}</span>
            <span className="muted"> por unidad</span>
          </p>

          <div className="modal__actions">
            <div className="qty" role="group" aria-label="Cantidad">
              <button type="button" className="qty__btn" onClick={() => setQty((value) => Math.max(1, value - 1))} aria-label="Reducir cantidad" disabled={qty <= 1}>
                <Minus size={16} />
              </button>
              <span className="qty__value" aria-live="polite">{qty}</span>
              <button type="button" className="qty__btn" onClick={() => setQty((value) => value + 1)} aria-label="Aumentar cantidad">
                <Plus size={16} />
              </button>
            </div>
            <Button icon={ShoppingCart} onClick={handleAdd}>
              Agregar · {formatMoney(product.priceCents * qty)}
            </Button>
          </div>
          <p className="fine-print">¿Lo quieres a tu manera? <button type="button" className="link-btn link-btn--inline" onClick={handleCustomize}>Arma tu propio wrap</button>.</p>
        </div>
      </div>
    </div>
  )
}
