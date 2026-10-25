import { Clock, MapPin, Navigation, Phone } from "lucide-react";
import {
  FacebookIcon,
  HandArrow,
  InstagramIcon,
  TikTokIcon,
} from "../assets/icons/Doodles.jsx";
import { PENDING_LABEL, SITE } from "../config/site.js";
import Button from "./Button.jsx";
import GooseMascot from "./GooseMascot.jsx";
import SectionTitle from "./SectionTitle.jsx";
import SmartImage from "./SmartImage.jsx";
import TropicalLeaf from "./TropicalLeaf.jsx";
import { IMAGES } from "../assets/images/index.js";

function Pending({ value, children }) {
  return value ? (
    (children ?? value)
  ) : (
    <span className="pending">{PENDING_LABEL}</span>
  );
}

function StorefrontIllustration() {
  return (
    <img
      src={IMAGES.mascota2}
      alt="Fachada del restaurante Long Wraps"
      className="location__photo"
    />
  );
}

function MapIllustration() {
  return (
    <svg viewBox="0 0 400 300" aria-hidden="true">
      <rect width="400" height="300" fill="#EEF0E6" />
      <path
        d="M300 0 C280 80 330 150 300 300 L400 300 L400 0 Z"
        fill="#A9DCEA"
      />
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
  );
}

export default function LocationSection() {
  const { address, schedule, phone, social, mapsEmbedUrl, mapsDirectionsUrl } =
    SITE;
  const hasAddress = Boolean(address.line1);
  const socialLinks = [
    {
      id: "instagram",
      href: social.instagram,
      icon: InstagramIcon,
      label: "Instagram",
    },
    {
      id: "facebook",
      href: social.facebook,
      icon: FacebookIcon,
      label: "Facebook",
    },
    { id: "tiktok", href: social.tiktok, icon: TikTokIcon, label: "TikTok" },
  ];

  return (
    <section
      className="section location"
      id="ubicacion"
      aria-labelledby="location-title"
    >
      <TropicalLeaf className="leaf leaf--location-l" color="var(--orange)" />
      <TropicalLeaf className="leaf leaf--location-r" />
      <div className="container">
        <SectionTitle
          id="location-title"
          title="Visítanos"
          subtitle="Estamos en el corazón de la ciudad. ¡Te esperamos!"
        />

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
                  <MapPin
                    size={34}
                    fill="var(--orange)"
                    color="var(--white)"
                    aria-hidden="true"
                  />
                  <span>Long Wraps</span>
                </span>
                <span className="map-placeholder__label">
                  Mapa de ejemplo · ubicación por configurar
                </span>
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
                  {address.line2 && (
                    <>
                      <br />
                      {address.line2}
                    </>
                  )}
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
                    <a href={`tel:${phone.replace(/[^\d+]/g, "")}`}>{phone}</a>
                  </Pending>
                </p>
              </div>
            </li>
            <li className="contact__item">
              <span
                className="contact__icon contact__icon--text"
                aria-hidden="true"
              >
                @
              </span>
              <div>
                <h3>Síguenos</h3>
                <div className="social-row">
                  {socialLinks.map(({ id, href, icon: Icon, label }) =>
                    href ? (
                      <a
                        key={id}
                        className="social-btn"
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                      >
                        <Icon />
                      </a>
                    ) : (
                      <span
                        key={id}
                        className="social-btn is-disabled"
                        title={`${label}: ${PENDING_LABEL}`}
                      >
                        <Icon />
                        <span className="visually-hidden">
                          {label} ({PENDING_LABEL})
                        </span>
                      </span>
                    ),
                  )}
                  <span className="social-handle">{social.handle}</span>
                </div>
              </div>
            </li>
            <li>
              {mapsDirectionsUrl && hasAddress ? (
                <Button
                  as="a"
                  href={mapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  icon={Navigation}
                >
                  Cómo llegar
                </Button>
              ) : (
                <Button
                  icon={Navigation}
                  disabled
                  title="Configura la dirección y mapsDirectionsUrl en src/config/site.js"
                >
                  Cómo llegar (pronto)
                </Button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
