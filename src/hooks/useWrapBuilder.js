import { useCallback, useMemo, useState } from 'react'
import { BUILDER_STEPS, INITIAL_SELECTION } from '../data/ingredients.js'
import { calculateWrapPrice, createWrapSnapshot, validateSelection } from '../utils/wrapPricing.js'

export { calculateWrapPrice }

export function useWrapBuilder(initialSelection = INITIAL_SELECTION) {
  const [selection, setSelection] = useState(initialSelection)
  const [activeStep, setActiveStep] = useState(0)
  const [errors, setErrors] = useState({})

  const clearError = (stepKey) =>
    setErrors((prev) => {
      if (!prev[stepKey]) return prev
      const next = { ...prev }
      delete next[stepKey]
      return next
    })

  const selectSingle = useCallback((stepKey, optionId) => {
    setSelection((prev) => ({ ...prev, [stepKey]: optionId }))
    clearError(stepKey)
  }, [])

  const toggleMulti = useCallback((stepKey, optionId) => {
    setSelection((prev) => {
      const current = prev[stepKey] ?? []
      const next = current.includes(optionId)
        ? current.filter((id) => id !== optionId)
        : [...current, optionId]
      return { ...prev, [stepKey]: next }
    })
  }, [])

  const totalCents = useMemo(() => calculateWrapPrice(selection), [selection])

  // Valida y, si todo es correcto, devuelve una instantánea; si no, null.
  const validateAndSnapshot = useCallback(() => {
    const found = validateSelection(selection)
    setErrors(found)
    const firstInvalid = BUILDER_STEPS.findIndex((step) => found[step.key])
    if (firstInvalid !== -1) {
      setActiveStep(firstInvalid)
      return null
    }
    return createWrapSnapshot(selection)
  }, [selection])

  const reset = useCallback(() => {
    setSelection(initialSelection)
    setErrors({})
    setActiveStep(0)
  }, [initialSelection])

  return {
    steps: BUILDER_STEPS,
    selection,
    activeStep,
    setActiveStep,
    errors,
    selectSingle,
    toggleMulti,
    totalCents,
    validateAndSnapshot,
    reset,
  }
}
