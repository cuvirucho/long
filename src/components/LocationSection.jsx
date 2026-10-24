import { Clock, MapPin, Navigation, Phone } from 'lucide-react'
import { FacebookIcon, HandArrow, InstagramIcon, TikTokIcon } from '../assets/icons/Doodles.jsx'
import { PENDING_LABEL, SITE } from '../config/site.js'
import Button from './Button.jsx'
import GooseMascot from './GooseMascot.jsx'
import SectionTitle from './SectionTitle.jsx'
import SmartImage from './SmartImage.jsx'
import TropicalLeaf from './TropicalLeaf.jsx'

function Pending({ value, children }) {
  return value ? children ?? value : <span className="pending">{PENDING_LABEL}</span>
}

function StorefrontIllustration() {
  return (
    <svg viewBox="0 0 400 280" aria-hidden="true">
      <rect width="400" height="280" fill="#BFE6EE" />
      <circle cx="330" cy="50" r="26" fill="#FFD27A" />
      <rect x="20" y="70" width="360" height="210" fill="#FFF5E7" />
      <rect x="20" y="70" width="360" height="70" fill="#FF5C00" />
      <circle cx="76" cy="105" r="26" fill="#fff" stroke="#001F5B" strokeWidth="3" />
      <GooseMascot variant="head" holdingWrap={false} x="54" y="83" width="44" height="44" />
      <text x="116" y="117" fontFamily="Anton, Impact, sans-serif" fontSize="38" fill="#fff">Long Wraps</text>
      <g fill="#17A2B8">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <path key={i} d={`M${20 + i * 45} 140 h45 v14 a22.5 12 0 0 1 -45 0 Z`} opacity={i % 2 ? 0.75 : 1} />
        ))}
      </g>
      <rect x="40" y="176" width="140" height="104" fill="#3B6E8A" opacity="0.8" />
      <rect x="220" y="176" width="140" height="104" fill="#3B6E8A" opacity="0.8" />
      <path d="M60 190 L100 230 M250 190 L300 240" stroke="#fff" strokeOpacity="0.4" strokeWidth="6" />
      <rect x="175" y="214" width="56" height="66" rx="4" fill="#1F2A2E" />
      <text x="203" y="238" textAnchor="middle" fontFamily="'Caveat Brush', cursive" fontSize="11" fill="#fff">WRAPS</text>
      <text x="203" y="254" textAnchor="middle" fontFamily="'Caveat Brush', cursive" fontSize="11" fill="#fff">CAFÉ</text>
    </svg>
  )
}

function MapIllustration() {
  return (
    <svg viewBox="0 0 400 300" aria-hidden="true">
      <rect width="400" height="300" fill="#EEF0E6" />
      <path d="M300 0 C280 80 330 150 300 300 L400 300 L400 0 Z" fill="#A9DCEA" />
      <g stroke="#fff" strokeWidth="10">
        <path d="M0 80 L300 60" />
        <path d="M0 190 L310 170" />
        <path d="M90 0 L120 300" />
        <path d="M210 0 L220 300" />
      </g>
      <g stroke="#FFE0A8" strokeWidth="6">
        <path d="M0 130 L305 115" />
        <path d="M160 0 L170 300" />
      </g>
      <rect x="20" y="210" width="50" height="50" rx="6" fill="#CFE8C0" />
      <rect x="240" y="80" width="40" height="70" rx="6" fill="#CFE8C0" />
    </svg>
  )
}

export default function LocationSection() {
  const { address, schedule, phone, social, mapsEmbedUrl, mapsDirectionsUrl } = SITE
  const hasAddress = Boolean(address.line1)
  const socialLinks = [
    { id: 'instagram', href: social.instagram, icon: InstagramIcon, label: 'Instagram' },
    { id: 'facebook', href: social.facebook, icon: FacebookIcon, label: 'Facebook' },
    { id: 'tiktok', href: social.tiktok, icon: TikTokIcon, label: 'TikTok' },
  ]

  return (
    <section className="section location" id="ubicacion" aria-labelledby="location-title">
      <TropicalLeaf className="leaf leaf--location-l" color="var(--orange)" />
      <TropicalLeaf className="leaf leaf--location-r" />
      <div className="container">
        <SectionTitle id="location-title" title="Visítanos" subtitle="Estamos en el corazón de la ciudad. ¡Te esperamos!" />

        <div className="location__grid">
          <SmartImage
            imageKey="storefront"
            alt="Fachada del restaurante Long Wraps"
            className="location__photo"
            fallback={<StorefrontIllustration />}
          />

          <div className="location__map">
            {mapsEmbedUrl ? (
              <iframe
                title="Mapa de ubicación de Long Wraps"
                src={mapsEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <div className="map-placeholder">
                <MapIllustration />
                <span className="map-placeholder__pin">
                  <MapPin size={34} fill="var(--orange)" color="var(--white)" aria-hidden="true" />
                  <span>Long Wraps</span>
                </span>
                <span className="map-placeholder__label">Mapa de ejemplo · ubicación por configurar</span>
              </div>
            )}
            <p className="location__wait" aria-hidden="true">
              Te esperamos <HandArrow className="location__arrow" />
            </p>
          </div>

          <ul className="contact">
            <li className="contact__item">
              <MapPin className="contact__icon" aria-hidden="true" />
              <div>
                <h3>Dirección</h3>
                <p>
                  <Pending value={address.line1} />
                  {address.line2 && <><br />{address.line2}</>}
                </p>
              </div>
            </li>
            <li className="contact__item">
              <Clock className="contact__icon" aria-hidden="true" />
              <div>
                <h3>Horario de atención</h3>
                {schedule.map((row) => (
                  <p key={row.days}>
                    {row.days}
                    <br />
                    <Pending value={row.hours} />
                  </p>
                ))}
              </div>
            </li>
            <li className="contact__item">
              <Phone className="contact__icon" aria-hidden="true" />
              <div>
                <h3>Teléfono</h3>
                <p>
                  <Pending value={phone}>
                    <a href={`tel:${phone.replace(/[^\d+]/g, '')}`}>{phone}</a>
                  </Pending>
                </p>
              </div>
            </li>
            <li className="contact__item">
              <span className="contact__icon contact__icon--text" aria-hidden="true">@</span>
              <div>
                <h3>Síguenos</h3>
                <div className="social-row">
                  {socialLinks.map(({ id, href, icon: Icon, label }) =>
                    href ? (
                      <a key={id} className="social-btn" href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                        <Icon />
                      </a>
                    ) : (
                      <span key={id} className="social-btn is-disabled" title={`${label}: ${PENDING_LABEL}`}>
                        <Icon />
                        <span className="visually-hidden">{label} ({PENDING_LABEL})</span>
                      </span>
                    ),
                  )}
                  <span className="social-handle">{social.handle}</span>
                </div>
              </div>
            </li>
            <li>
              {mapsDirectionsUrl && hasAddress ? (
                <Button as="a" href={mapsDirectionsUrl} target="_blank" rel="noopener noreferrer" icon={Navigation}>
                  Cómo llegar
                </Button>
              ) : (
                <Button icon={Navigation} disabled title="Configura la dirección y mapsDirectionsUrl en src/config/site.js">
                  Cómo llegar (pronto)
                </Button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
