// Ilustración de wrap usada como placeholder mientras no haya fotografía real.
// Cada "variant" cambia el relleno para diferenciar los productos del menú.

const FILLINGS = {
  pollo: ['#F1D3A1', '#7CC04B', '#E8432E', '#F6C343', '#E3B57A'],
  steak: ['#7A3B26', '#F6A623', '#7CC04B', '#5A2B1A', '#E8432E'],
  veggie: ['#9C7B3C', '#86C25A', '#E8432E', '#B9E07A', '#F5F0E0'],
  shrimp: ['#FF8A5B', '#FFD24A', '#7CC04B', '#F7A072', '#E8432E'],
}

const INK = '#5B3A1A'

function WrapHalf({ x, y, rotate, scale = 1, palette }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}>
      {/* Tortilla enrollada */}
      <path
        d="M-150 -46 C-60 -64 40 -62 120 -52 L120 52 C40 64 -60 62 -150 46 C-170 30 -170 -30 -150 -46 Z"
        fill="#EFCB8C"
        stroke="#C9964F"
        strokeWidth="3"
      />
      <path d="M-140 -20 C-60 -32 40 -30 110 -24" stroke="#D9A75E" strokeWidth="3" fill="none" />
      <path d="M-140 20 C-60 30 40 30 110 24" stroke="#D9A75E" strokeWidth="3" fill="none" />
      {[[-110, -30], [-70, 8], [-30, -36], [10, 18], [50, -14], [-90, 34], [70, 30], [-10, -8]].map(([cx, cy]) => (
        <ellipse key={`${cx}${cy}`} cx={cx} cy={cy} rx="9" ry="5" fill="#B9773A" opacity="0.55" />
      ))}
      {/* Corte con relleno */}
      <ellipse cx="120" cy="0" rx="34" ry="56" fill="#F7DFA8" stroke="#C9964F" strokeWidth="3" />
      <ellipse cx="122" cy="0" rx="26" ry="46" fill={palette[0]} />
      <circle cx="112" cy="-26" r="13" fill={palette[1]} />
      <circle cx="132" cy="-8" r="12" fill={palette[2]} />
      <circle cx="116" cy="12" r="12" fill={palette[3]} />
      <circle cx="130" cy="28" r="10" fill={palette[4]} />
      <circle cx="124" cy="-36" r="7" fill={palette[2]} />
      <circle cx="108" cy="-4" r="7" fill={palette[4]} />
      <path d="M100 -30 C110 -20 104 -6 112 6" stroke={INK} strokeOpacity="0.25" strokeWidth="2" fill="none" />
    </g>
  )
}

export default function WrapIllustration({ variant = 'pollo', className = '', withBoard = false }) {
  const palette = FILLINGS[variant] ?? FILLINGS.pollo
  return (
    <svg className={className} viewBox="0 0 480 340" aria-hidden="true">
      {withBoard && (
        <g>
          <path d="M20 300 L420 230 C445 226 470 250 460 270 L120 336 C90 342 30 330 20 300 Z" fill="#A86B3C" />
          <path d="M40 300 L420 236" stroke="#8A5530" strokeWidth="3" />
        </g>
      )}
      <WrapHalf x={230} y={130} rotate={-28} palette={palette} />
      <WrapHalf x={200} y={230} rotate={-14} scale={1.05} palette={palette} />
    </svg>
  )
}
