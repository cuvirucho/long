// Trazos dibujados a mano: separadores, destellos, flechas e iconos de redes.

export function Squiggle({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 12 48" aria-hidden="true">
      <path d="M6 2 C12 8 0 12 6 18 C12 24 0 28 6 34 C12 40 0 44 6 46" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

export function Burst({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 40 30" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="3.5" strokeLinecap="round">
        <path d="M4 15 L22 15" />
        <path d="M8 4 L24 10" />
        <path d="M8 26 L24 20" />
      </g>
    </svg>
  )
}

export function HandArrow({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 80 40" aria-hidden="true">
      <path d="M4 30 C24 8 50 6 72 16" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M60 8 L73 16 L60 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function Underline({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 120 12" preserveAspectRatio="none" aria-hidden="true">
      <path d="M2 8 C30 2 70 2 118 6" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

export function TortillaIcon({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <ellipse cx="16" cy="18" rx="13" ry="7" />
      <path d="M5 15 C8 9 24 9 27 15" />
      <circle cx="11" cy="18" r="1" fill="currentColor" />
      <circle cx="19" cy="20" r="1" fill="currentColor" />
      <circle cx="22" cy="16" r="1" fill="currentColor" />
    </svg>
  )
}

export function WrapIcon({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 6 L24 6 L19 28 L13 28 Z" />
      <path d="M9 11 L23 11" />
      <circle cx="12" cy="5" r="2.5" />
      <circle cx="17" cy="4" r="2.5" />
      <circle cx="21.5" cy="5.5" r="2" />
    </svg>
  )
}

const social = { width: 20, height: 20, viewBox: '0 0 24 24', 'aria-hidden': true }

export function InstagramIcon() {
  return (
    <svg {...social} fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function FacebookIcon() {
  return (
    <svg {...social} fill="currentColor">
      <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4a21 21 0 0 0-2.3-.1c-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21h3.1Z" />
    </svg>
  )
}

export function TikTokIcon() {
  return (
    <svg {...social} fill="currentColor">
      <path d="M16.6 3c.3 2.2 1.7 3.8 3.9 4v3a7 7 0 0 1-3.9-1.2v6.4a5.8 5.8 0 1 1-5.8-5.8c.3 0 .6 0 .9.1v3.1a2.8 2.8 0 1 0 1.9 2.6V3h3Z" />
    </svg>
  )
}

export function WhatsAppIcon() {
  return (
    <svg {...social} fill="currentColor">
      <path d="M12 2.5a9.4 9.4 0 0 0-8.1 14.2L2.6 21.5l4.9-1.3A9.4 9.4 0 1 0 12 2.5Zm0 17.1c-1.4 0-2.8-.4-4-1.1l-.3-.2-2.9.8.8-2.8-.2-.3a7.7 7.7 0 1 1 6.6 3.6Zm4.3-5.8c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1a6.3 6.3 0 0 1-3.1-2.7c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.7-1.7c-.2-.5-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 2s.8 2.3.9 2.5c.1.2 1.6 2.5 4 3.5 1.5.6 2 .7 2.8.6.4-.1 1.4-.6 1.6-1.1.2-.5.2-1 .1-1.1l-.6-.4Z" />
    </svg>
  )
}
