// Hoja de palma decorativa generada con SVG.

// Tallo: curva cuadrática de P0 a P2 con control P1.
const P0 = [10, 190]
const P1 = [60, 40]
const P2 = [190, 20]
const DEG = 180 / Math.PI

function pointAt(t) {
  const u = 1 - t
  return [
    u * u * P0[0] + 2 * u * t * P1[0] + t * t * P2[0],
    u * u * P0[1] + 2 * u * t * P1[1] + t * t * P2[1],
  ]
}

function angleAt(t) {
  const dx = 2 * (1 - t) * (P1[0] - P0[0]) + 2 * t * (P2[0] - P1[0])
  const dy = 2 * (1 - t) * (P1[1] - P0[1]) + 2 * t * (P2[1] - P1[1])
  return Math.atan2(dy, dx)
}

// Foliolos a ambos lados del tallo, inclinados hacia la punta.
const LEAFLETS = Array.from({ length: 10 }, (_, index) => {
  const t = 0.12 + index * 0.085
  const [x, y] = pointAt(t)
  const stem = angleAt(t)
  const length = 52 - Math.abs(t - 0.4) * 60
  return [-1, 1].map((side) => {
    const angle = stem + side * 0.95
    return {
      key: `${index}${side}`,
      cx: x + Math.cos(angle) * length * 0.5,
      cy: y + Math.sin(angle) * length * 0.5,
      rx: length * 0.55,
      rotate: angle * DEG,
    }
  })
}).flat()

export default function TropicalLeaf({ className = '', color = 'var(--turquoise)' }) {
  return (
    <svg className={className} viewBox="0 0 200 200" aria-hidden="true">
      <g fill={color}>
        {LEAFLETS.map(({ key, cx, cy, rx, rotate }) => (
          <ellipse key={key} cx={cx} cy={cy} rx={rx} ry={rx * 0.18 + 2} transform={`rotate(${rotate} ${cx} ${cy})`} />
        ))}
      </g>
      <path d={`M${P0} Q${P1} ${P2}`} stroke={color} strokeWidth="4" fill="none" strokeLinecap="round" />
    </svg>
  )
}
