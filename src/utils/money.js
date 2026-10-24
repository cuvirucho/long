// Todos los importes de la app se manejan en centavos enteros para evitar
// errores de precisión con decimales.

const formatter = new Intl.NumberFormat('es-EC', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

export function formatMoney(cents) {
  return formatter.format((Number(cents) || 0) / 100)
}

export function sumCents(values) {
  return values.reduce((total, value) => total + (Number.isInteger(value) ? value : 0), 0)
}
