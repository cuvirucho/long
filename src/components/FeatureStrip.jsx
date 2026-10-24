import { Fragment } from 'react'
import { Leaf, Sun, TreePalm } from 'lucide-react'
import { Squiggle, WrapIcon } from '../assets/icons/Doodles.jsx'

const FEATURES = [
  { id: 'frescos', icon: Leaf, text: 'Ingredientes frescos y naturales' },
  { id: 'personalizados', icon: WrapIcon, text: 'Wraps personalizados a tu gusto' },
  { id: 'tropicales', icon: TreePalm, text: 'Sabores únicos y tropicales' },
  { id: 'momento', icon: Sun, text: 'Ideal para cualquier momento' },
]

export default function FeatureStrip() {
  return (
    <section className="features" aria-label="Beneficios">
      <ul className="container features__list">
        {FEATURES.map(({ id, icon: Icon, text }, index) => (
          <Fragment key={id}>
            {index > 0 && (
              <li className="features__sep" aria-hidden="true">
                <Squiggle />
              </li>
            )}
            <li className="features__item">
              <span className="features__icon">
                <Icon size={34} strokeWidth={1.8} />
              </span>
              <span className="features__text">{text}</span>
            </li>
          </Fragment>
        ))}
      </ul>
    </section>
  )
}
