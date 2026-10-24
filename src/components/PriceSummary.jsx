import { ShoppingCart } from 'lucide-react'
import { BASE_PRICE_CENTS } from '../data/ingredients.js'
import { formatMoney } from '../utils/money.js'
import Button from './Button.jsx'

export default function PriceSummary({ totalCents, onAdd }) {
  return (
    <div className="summary">
      <p className="summary__tagline" aria-hidden="true">
        Tu wrap,
        <br />
        tus reglas
      </p>

      <div className="summary__total" aria-live="polite" aria-atomic="true">
        <span className="summary__label">Total estimado</span>
        <span className="summary__amount">{formatMoney(totalCents)}</span>
        <span className="summary__base">Incluye preparación base {formatMoney(BASE_PRICE_CENTS)}</span>
      </div>

      <Button size="lg" icon={ShoppingCart} onClick={onAdd} className="summary__add">
        Agregar al pedido
      </Button>
    </div>
  )
}
