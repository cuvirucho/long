import { useEffect, useState } from 'react'
import { Menu, ShoppingCart, X } from 'lucide-react'
import { NAV_LINKS } from '../data/navigation.js'
import { useCart } from '../hooks/useCart.js'
import Logo from './Logo.jsx'

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (!sections.length || !('IntersectionObserver' in window)) return undefined
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting)
        if (visible.length) setActive(visible[0].target.id)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [ids])

  return active
}

const SECTION_IDS = NAV_LINKS.filter((link) => !link.opensBuilder).map((link) => link.id)

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const active = useActiveSection(SECTION_IDS)
  const { count, openCart, openBuilder } = useCart()

  useEffect(() => {
    if (!open) return undefined
    const onKey = (event) => event.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const cartLabel = `Abrir pedido, ${count} ${count === 1 ? 'producto' : 'productos'}`

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <Logo />

        <nav className={`navbar__nav ${open ? 'is-open' : ''}`} id="main-nav" aria-label="Principal">
          <ul className="navbar__links">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                {link.opensBuilder ? (
                  <button
                    type="button"
                    className="navbar__link navbar__link--btn"
                    onClick={() => {
                      setOpen(false)
                      openBuilder()
                    }}
                  >
                    {link.label}
                  </button>
                ) : (
                  <a
                    href={`#${link.id}`}
                    className={`navbar__link ${active === link.id ? 'is-active' : ''}`}
                    aria-current={active === link.id ? 'true' : undefined}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="navbar__actions">
          <button type="button" className="btn btn--primary btn--md navbar__order" onClick={openCart} aria-label={cartLabel}>
            <ShoppingCart size={18} aria-hidden="true" />
            <span className="navbar__order-text">Ordena ahora</span>
            {count > 0 && <span className="cart-badge" aria-hidden="true">{count}</span>}
          </button>
          <button
            type="button"
            className="navbar__toggle"
            aria-expanded={open}
            aria-controls="main-nav"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  )
}
