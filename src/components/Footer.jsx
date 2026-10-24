import { FacebookIcon, InstagramIcon, TikTokIcon, WhatsAppIcon } from '../assets/icons/Doodles.jsx'
import { PENDING_LABEL, SITE } from '../config/site.js'
import { NAV_LINKS } from '../data/navigation.js'
import TropicalLeaf from './TropicalLeaf.jsx'
import Logo from './Logo.jsx'

export default function Footer() {
  const whatsappHref = SITE.whatsappNumber ? `https://wa.me/${SITE.whatsappNumber.replace(/\D/g, '')}` : ''
  const socialLinks = [
    { id: 'instagram', href: SITE.social.instagram, icon: InstagramIcon, label: 'Instagram' },
    { id: 'facebook', href: SITE.social.facebook, icon: FacebookIcon, label: 'Facebook' },
    { id: 'tiktok', href: SITE.social.tiktok, icon: TikTokIcon, label: 'TikTok' },
    { id: 'whatsapp', href: whatsappHref, icon: WhatsAppIcon, label: 'WhatsApp' },
  ]

  return (
    <footer className="footer">
      <TropicalLeaf className="leaf leaf--footer" />
      <div className="container footer__inner">
        <Logo inverted />

        <p className="footer__motto">
          Wraps <span aria-hidden="true">·</span> Buena comida <span aria-hidden="true">·</span> Gente feliz
        </p>

        <nav aria-label="Pie de página">
          <ul className="footer__links">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a href={`#${link.id}`}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="footer__social">
          {socialLinks.map(({ id, href, icon: Icon, label }) => (
            <li key={id}>
              {href ? (
                <a className="social-btn social-btn--light" href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                  <Icon />
                </a>
              ) : (
                <span className="social-btn social-btn--light is-disabled" title={`${label}: ${PENDING_LABEL}`}>
                  <Icon />
                  <span className="visually-hidden">{label} ({PENDING_LABEL})</span>
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>© {new Date().getFullYear()} Long Wraps. Todos los derechos reservados.</p>
          <p className="footer__legal">
            <a href={SITE.legal.terms}>Términos y condiciones</a>
            <span aria-hidden="true">|</span>
            <a href={SITE.legal.privacy}>Política de privacidad</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
