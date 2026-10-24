import { CircleAlert, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react'
import { WhatsAppIcon } from '../assets/icons/Doodles.jsx'
import { SITE } from '../config/site.js'
import { useCart } from '../hooks/useCart.js'
import { useDialog } from '../hooks/useDialog.js'
import { formatMoney } from '../utils/money.js'
import { buildOrderMessage, buildWhatsAppUrl, describeCartItem } from '../utils/whatsapp.js'
import Button from './Button.jsx'

function CartLine({ item, onIncrement, onDecrement, onRemove }) {
  const details = describeCartItem(item)
  return (
    <li className="cart-line">
      <div className="cart-line__head">
        <h3 className="cart-line__name">{item.name}</h3>
        <button type="button" className="icon-btn icon-btn--danger" onClick={onRemove} aria-label={`Eliminar ${item.name}`}>
          <Trash2 size={18} />
        </button>
      </div>
      {details.length > 0 && (
        <ul className="cart-line__details">
          {details.map((detail) => (
            <li key={detail}>{detail}</li>
          ))}
        </ul>
      )}
      <div className="cart-line__foot">
        <div className="qty qty--sm" role="group" aria-label={`Cantidad de ${item.name}`}>
          <button type="button" className="qty__btn" onClick={onDecrement} disabled={item.qty <= 1} aria-label="Reducir cantidad">
            <Minus size={14} />
          </button>
          <span className="qty__value">{item.qty}</span>
          <button type="button" className="qty__btn" onClick={onIncrement} aria-label="Aumentar cantidad">
            <Plus size={14} />
          </button>
        </div>
        <div className="cart-line__prices">
          <span className="muted">{formatMoney(item.unitPriceCents)} c/u</span>
          <strong>{formatMoney(item.unitPriceCents * item.qty)}</strong>
        </div>
      </div>
    </li>
  )
}

export default function CartDrawer() {
  const cart = useCart()
  const panelRef = useDialog(cart.isOpen, cart.closeCart)
  const whatsappUrl = buildWhatsAppUrl(SITE.whatsappNumber, buildOrderMessage(cart.items, cart.totalCents))
  const isEmpty = cart.items.length === 0

  return (
    // Siempre montado para animar apertura y cierre; "inert" lo saca del foco cuando está cerrado.
    <div
      className={`drawer-overlay ${cart.isOpen ? 'is-open' : ''}`}
      inert={!cart.isOpen}
      onMouseDown={(event) => event.target === event.currentTarget && cart.closeCart()}
    >
      <aside className="drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title" tabIndex={-1} ref={panelRef}>
        <header className="drawer__header">
          <h2 id="cart-title">Tu pedido</h2>
          <button type="button" className="icon-btn" onClick={cart.closeCart} aria-label="Cerrar pedido">
            <X size={22} />
          </button>
        </header>

        {isEmpty ? (
          <div className="drawer__empty">
            <ShoppingBag size={48} strokeWidth={1.5} aria-hidden="true" />
            <p>Tu pedido está vacío.</p>
            <div className="drawer__empty-actions">
              <Button as="a" href="#menu" variant="ghost" onClick={cart.closeCart}>Ver menú</Button>
              <Button as="a" href="#crea-tu-wrap" onClick={cart.closeCart}>Crear mi wrap</Button>
            </div>
          </div>
        ) : (
          <>
            <ul className="drawer__list">
              {cart.items.map((item) => (
                <CartLine
                  key={item.lineId}
                  item={item}
                  onIncrement={() => cart.increment(item.lineId)}
                  onDecrement={() => cart.decrement(item.lineId)}
                  onRemove={() => cart.remove(item.lineId)}
                />
              ))}
            </ul>

            <footer className="drawer__footer">
              <dl className="drawer__totals">
                <div>
                  <dt>Subtotal</dt>
                  <dd>{formatMoney(cart.totalCents)}</dd>
                </div>
                <div className="drawer__grand">
                  <dt>Total estimado</dt>
                  <dd>{formatMoney(cart.totalCents)}</dd>
                </div>
              </dl>
              <p className="fine-print">
                Precio estimado. El pedido se confirma con el restaurante por WhatsApp; no se realiza ningún pago en esta página.
              </p>

              {whatsappUrl ? (
                <Button as="a" href={whatsappUrl} target="_blank" rel="noopener noreferrer" variant="whatsapp" size="lg" icon={WhatsAppIcon} className="btn--block">
                  Continuar por WhatsApp
                </Button>
              ) : (
                <div className="admin-warning" role="note">
                  <CircleAlert size={18} aria-hidden="true" />
                  <p>
                    <strong>Aviso para el administrador:</strong> el número de WhatsApp aún no está configurado. Defínelo en{' '}
                    <code>src/config/site.js</code> (<code>whatsappNumber</code>) para habilitar el envío del pedido.
                  </p>
                </div>
              )}

              <div className="drawer__secondary">
                <button type="button" className="link-btn" onClick={cart.closeCart}>Seguir comprando</button>
                <button type="button" className="link-btn link-btn--danger" onClick={cart.clear}>Vaciar pedido</button>
              </div>
            </footer>
          </>
        )}
      </aside>
    </div>
  )
}

