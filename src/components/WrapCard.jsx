import { ArrowRight } from 'lucide-react'
import { formatMoney } from '../utils/money.js'
import SmartImage from './SmartImage.jsx'
import WrapIllustration from './WrapIllustration.jsx'

const VARIANT_BY_IMAGE = {
  wrapPollo: 'pollo',
  wrapSteak: 'steak',
  wrapVeggie: 'veggie',
  wrapShrimp: 'shrimp',
}

export function ProductImage({ product, className }) {
  return (
    <SmartImage
      imageKey={product.image}
      alt={`Wrap ${product.name}`}
      className={className}
      fallback={<WrapIllustration variant={VARIANT_BY_IMAGE[product.image]} />}
    />
  )
}

export default function WrapCard({ product, onSelect }) {
  return (
    <article className="wrap-card">
      <button type="button" className="wrap-card__hit" onClick={() => onSelect(product)} aria-label={`Ver detalle de ${product.name}`} />
      <div className="wrap-card__media">
        <ProductImage product={product} className="wrap-card__img" />
        {product.tag && <span className="wrap-card__tag">{product.tag}</span>}
      </div>
      <div className="wrap-card__body">
        <h3 className="wrap-card__name">{product.name}</h3>
        <p className="wrap-card__desc">{product.description}</p>
        <div className="wrap-card__footer">
          <span className="price">{formatMoney(product.priceCents)}</span>
          <span className="round-arrow" aria-hidden="true">
            <ArrowRight size={18} />
          </span>
        </div>
      </div>
    </article>
  )
}
