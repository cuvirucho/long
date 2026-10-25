import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, Drumstick, Salad, Soup, Sparkles, X } from 'lucide-react'
import { TortillaIcon } from '../assets/icons/Doodles.jsx'
import { isFirebaseConfigured } from '../config/firebase.js'
import { useCart } from '../hooks/useCart.js'
import { useDialog } from '../hooks/useDialog.js'
import { useWrapBuilder } from '../hooks/useWrapBuilder.js'
import { formatMoney } from '../utils/money.js'
import IngredientStep from './IngredientStep.jsx'
import PriceSummary from './PriceSummary.jsx'
import PublishCreation from './PublishCreation.jsx'
import SectionTitle from './SectionTitle.jsx'

const STEP_ICONS = {
  tortilla: TortillaIcon,
  protein: Drumstick,
  veggies: Salad,
  sauce: Soup,
  extras: Sparkles,
}

export default function WrapBuilder() {
  const { isBuilderOpen } = useCart()
  // Se monta solo al abrir, así cada apertura empieza con una selección limpia.
  return isBuilderOpen ? <WrapBuilderModal /> : null
}

function WrapBuilderModal() {
  const builder = useWrapBuilder()
  const { addCustomWrap, closeBuilder } = useCart()
  const panelRef = useDialog(true, closeBuilder)
  const { steps, selection, activeStep, setActiveStep, errors } = builder
  // Receta ya agregada al pedido que se ofrece publicar (null mientras se arma).
  const [addedSelection, setAddedSelection] = useState(null)

  const handleAdd = () => {
    const snapshot = builder.validateAndSnapshot()
    if (!snapshot) return
    addCustomWrap(snapshot)
    if (isFirebaseConfigured) setAddedSelection(selection)
    else closeBuilder()
  }

  const isLastStep = activeStep === steps.length - 1

  // Solo se avanza si los pasos requeridos anteriores están completos.
  const goTo = (index) => {
    const target = Math.min(steps.length - 1, Math.max(0, index))
    if (target <= activeStep || builder.validateBefore(target)) setActiveStep(target)
  }

  // Cada paso nuevo se muestra desde arriba (útil en móvil).
  useEffect(() => {
    if (panelRef.current) panelRef.current.scrollTop = 0
  }, [activeStep, addedSelection, panelRef])

  return (
    <div className="overlay" onMouseDown={(event) => event.target === event.currentTarget && closeBuilder()}>
      <div
        className="builder-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="builder-title"
        tabIndex={-1}
        ref={panelRef}
      >
        <button type="button" className="icon-btn modal__close builder-modal__close" onClick={closeBuilder} aria-label="Cerrar constructor">
          <X size={20} />
        </button>
        {addedSelection ? (
          <PublishCreation selection={addedSelection} onClose={closeBuilder} />
        ) : (
          <>
            <SectionTitle id="builder-title" title="Crea tu wrap" subtitle="Selecciona tus ingredientes y arma el wrap perfecto." />

            <ol className="stepper" aria-label="Pasos del constructor">
              {steps.map((step, index) => {
                const Icon = STEP_ICONS[step.icon]
                const state =
                  index === activeStep ? 'is-active' : errors[step.key] ? 'has-error' : index < activeStep ? 'is-done' : ''
                return (
                  <li key={step.key} className={`stepper__item ${state}`}>
                    <button
                      type="button"
                      className="stepper__btn"
                      onClick={() => goTo(index)}
                      aria-current={index === activeStep ? 'step' : undefined}
                    >
                      <span className="stepper__circle">
                        <Icon size={30} strokeWidth={1.7} aria-hidden="true" />
                      </span>
                      <span className="stepper__label">
                        {index + 1}. {step.title}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ol>

            <p className="builder__progress" aria-live="polite">
              Paso {activeStep + 1} de {steps.length}: <strong>{steps[activeStep].title}</strong>
              <span className="builder__running-total"> · Total {formatMoney(builder.totalCents)}</span>
            </p>

            <div className="builder__panels">
              {steps.map((step, index) => (
                <IngredientStep
                  key={step.key}
                  step={step}
                  index={index}
                  isActive={index === activeStep}
                  value={selection[step.key]}
                  error={errors[step.key]}
                  onSelectSingle={builder.selectSingle}
                  onToggleMulti={builder.toggleMulti}
                />
              ))}
            </div>

            <div className="builder__nav">
              <button type="button" className="btn btn--ghost btn--md" onClick={() => goTo(activeStep - 1)} disabled={activeStep === 0}>
                <ChevronLeft size={18} aria-hidden="true" /> Anterior
              </button>
              {!isLastStep && (
                <button type="button" className="btn btn--navy btn--md" onClick={() => goTo(activeStep + 1)}>
                  Siguiente <ChevronRight size={18} aria-hidden="true" />
                </button>
              )}
            </div>

            {isLastStep && <PriceSummary totalCents={builder.totalCents} onAdd={handleAdd} />}
          </>
        )}
      </div>
    </div>
  )
}
