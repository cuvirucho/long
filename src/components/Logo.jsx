import { IMAGES } from '../assets/images/index.js'
import GooseMascot from './GooseMascot.jsx'

export default function Logo({ inverted = false, href = '#inicio' }) {
  return (
    <a className={`logo ${inverted ? 'logo--inverted' : ''}`} href={href} aria-label="Long Wraps, ir al inicio">
      {IMAGES.logo ? (
        <img className="logo__img" src={IMAGES.logo} alt="" />
      ) : (
        <>
          <span className="logo__badge">
            <GooseMascot variant="head" holdingWrap={false} />
          </span>
          <span className="logo__text">
            <span className="logo__long">Long</span>
            <span className="logo__wraps">WRAPS</span>
          </span>
        </>
      )}
    </a>
  )
}
