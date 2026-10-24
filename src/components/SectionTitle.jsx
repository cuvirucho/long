import { Burst } from '../assets/icons/Doodles.jsx'

export default function SectionTitle({ id, title, subtitle, light = false }) {
  return (
    <header className={`section-title ${light ? 'section-title--light' : ''}`}>
      <h2 id={id}>
        <Burst className="section-title__burst section-title__burst--left" />
        {title}
        <Burst className="section-title__burst" />
      </h2>
      {subtitle && <p>{subtitle}</p>}
    </header>
  )
}
