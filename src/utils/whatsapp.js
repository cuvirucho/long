import { formatMoney } from './money.js'

export function describeCartItem(item) {
  if (item.type !== 'custom') return item.description ? [item.description] : []
  const { tortilla, proteina, ingredientes, salsa, extras } = item.details
  // [].concat acepta también wraps guardados antes, con proteína y salsa como objeto único.
  const names = (list) => {
    const options = [].concat(list ?? [])
    return options.length ? options.map((option) => option.name).join(', ') : 'Ninguno'
  }
  return [
    `Tortilla: ${tortilla?.name ?? '-'}`,
    `Proteínas: ${names(proteina)}`,
    `Ingredientes: ${names(ingredientes)}`,
    `Salsas: ${names(salsa)}`,
    `Extras: ${names(extras)}`,
  ]
}

export function buildOrderMessage(items, totalCents) {
  const lines = ['¡Hola Long Wraps! Quiero hacer este pedido:', '']
  items.forEach((item, index) => {
    lines.push(`${index + 1}. ${item.name} x${item.qty}`)
    describeCartItem(item).forEach((detail) => lines.push(`   - ${detail}`))
    lines.push(`   Precio por unidad: ${formatMoney(item.unitPriceCents)}`)
    lines.push('')
  })
  lines.push(`TOTAL ESTIMADO: ${formatMoney(totalCents)}`)
  lines.push('(Precio estimado, sujeto a confirmación del restaurante.)')
  return lines.join('\n')
}

export function buildWhatsAppUrl(phoneNumber, message) {
  const digits = String(phoneNumber ?? '').replace(/\D/g, '')
  if (!digits) return null
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`
}
