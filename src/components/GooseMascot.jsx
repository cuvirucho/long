// Mascota de Long Wraps: oca blanca con gafas de sol y sombrero tropical.
// Si se dispone del archivo original de la mascota, sustitúyelo en
// src/assets/images/ e impórtalo donde se usa <GooseMascot />.

const INK = '#001F5B'

export default function GooseMascot({ variant = 'full', holdingWrap = true, className = '', title, ...svgProps }) {
  // "head" recorta el lienzo para usarlo en el logotipo.
  const viewBox = variant === 'head' ? '52 4 120 112' : '0 0 220 250'

  return (
    <svg
      className={className}
      viewBox={viewBox}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      fill="none"
      stroke={INK}
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...svgProps}
    >
      {/* Cuerpo */}
      <path d="M38 250 C26 196 52 150 100 146 C150 142 188 182 180 250 Z" fill="#fff" />
      {/* Cuello */}
      <path d="M86 156 C84 128 80 104 86 82 L122 82 C120 106 118 128 124 152 Z" fill="#fff" stroke="none" />
      <path d="M86 156 C84 128 80 104 86 82" />
      <path d="M122 82 C120 106 118 128 124 152" />
      {/* Cabeza */}
      <circle cx="104" cy="66" r="34" fill="#fff" />
      {/* Pico */}
      <path d="M130 62 C152 58 166 66 162 76 C154 84 136 82 126 76 Z" fill="#FF8A1F" />
      <path d="M130 71 C142 73 152 73 160 71" strokeWidth="3" />
      {/* Mejilla */}
      <ellipse cx="96" cy="80" rx="6" ry="3.5" fill="#FFB38A" stroke="none" />
      {/* Gafas de sol */}
      <rect x="80" y="52" width="24" height="16" rx="6" fill={INK} />
      <rect x="108" y="52" width="24" height="16" rx="6" fill={INK} />
      <path d="M104 58 L108 58" />
      <path d="M80 57 L72 54" />
      <path d="M85 56 L91 56" stroke="#fff" strokeWidth="2.5" />
      <path d="M113 56 L119 56" stroke="#fff" strokeWidth="2.5" />
      {/* Sombrero */}
      <ellipse cx="104" cy="38" rx="48" ry="10" fill="#fff" />
      <path d="M76 38 C74 10 134 10 132 38 Z" fill="#fff" />
      <path d="M77 30 C92 25 118 25 131 30 L132 37 C118 32 92 32 76 37 Z" fill="#FF5C00" strokeWidth="3" />
      {/* Mechón */}
      <path d="M100 14 C96 6 104 2 108 8" strokeWidth="3" />

      {holdingWrap && (
        <g>
          {/* Wrap en la mano */}
          <g transform="rotate(-18 160 150)">
            <path d="M140 118 L182 118 L170 196 L152 196 Z" fill="#F3D9A4" />
            <path d="M146 140 L176 140" strokeWidth="2.5" />
            <circle cx="152" cy="160" r="2.5" fill="#C98A3E" stroke="none" />
            <circle cx="166" cy="174" r="2.5" fill="#C98A3E" stroke="none" />
            <ellipse cx="161" cy="118" rx="22" ry="8" fill="#F3D9A4" />
            <circle cx="150" cy="112" r="7" fill="#7CC04B" strokeWidth="3" />
            <circle cx="163" cy="108" r="7" fill="#E8432E" strokeWidth="3" />
            <circle cx="174" cy="113" r="6" fill="#F6C343" strokeWidth="3" />
            <circle cx="158" cy="116" r="5" fill="#F5E1C0" strokeWidth="3" />
          </g>
          {/* Ala / mano */}
          <path d="M120 196 C122 176 138 168 150 172 C162 176 166 190 156 200 C146 210 124 212 120 196 Z" fill="#fff" />
          <path d="M140 178 C146 180 150 186 148 192" strokeWidth="3" />
        </g>
      )}
    </svg>
  )
}
