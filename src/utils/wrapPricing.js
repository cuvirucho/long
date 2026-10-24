import { BASE_PRICE_CENTS, BUILDER_STEPS } from '../data/ingredients.js'
import { sumCents } from './money.js'

const STEP_BY_KEY = Object.fromEntries(BUILDER_STEPS.map((step) => [step.key, step]))

function findOption(stepKey, optionId) {
  return STEP_BY_KEY[stepKey]?.options.find((option) => option.id === optionId) ?? null
}

// Devuelve las opciones seleccionadas de un paso como array (vacío si no hay).
// Los ids repetidos se ignoran para no cobrar dos veces la misma opción.
export function getSelectedOptions(selection, stepKey) {
  const value = selection[stepKey]
  const ids = Array.isArray(value) ? [...new Set(value)] : value ? [value] : []
  return ids.map((id) => findOption(stepKey, id)).filter(Boolean)
}

// Función pura: precio total en centavos de una configuración de wrap.
export function calculateWrapPrice(selection) {
  const optionPrices = BUILDER_STEPS.flatMap((step) =>
    getSelectedOptions(selection, step.key).map((option) => option.priceCents),
  )
  return BASE_PRICE_CENTS + sumCents(optionPrices)
}

// Devuelve { [stepKey]: mensaje } con los pasos obligatorios sin completar.
export function validateSelection(selection) {
  const errors = {}
  for (const step of BUILDER_STEPS) {
    if (step.required && getSelectedOptions(selection, step.key).length === 0) {
      errors[step.key] = `Selecciona una opción de ${step.title.toLowerCase()}.`
    }
  }
  return errors
}

// Copia inmutable de la configuración con nombres y precios, para el carrito.
export function createWrapSnapshot(selection) {
  const pick = (key) => getSelectedOptions(selection, key).map(({ id, name, priceCents }) => ({ id, name, priceCents }))
  return {
    basePriceCents: BASE_PRICE_CENTS,
    tortilla: pick('tortilla')[0] ?? null,
    proteina: pick('proteina')[0] ?? null,
    ingredientes: pick('ingredientes'),
    salsa: pick('salsa')[0] ?? null,
    extras: pick('extras'),
    totalCents: calculateWrapPrice(selection),
  }
}
