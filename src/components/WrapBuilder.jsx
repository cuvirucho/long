import { ChevronLeft, ChevronRight, Drumstick, Salad, Soup, Sparkles } from 'lucide-react'
import { TortillaIcon } from '../assets/icons/Doodles.jsx'
import { useCart } from '../hooks/useCart.js'
import { useWrapBuilder } from '../hooks/useWrapBuilder.js'
import IngredientStep from './IngredientStep.jsx'
import PriceSummary from './PriceSummary.jsx'
import SectionTitle from './SectionTitle.jsx'
import TropicalLeaf from './TropicalLeaf.jsx'

const STEP_ICONS = {
  tortilla: TortillaIcon,
  protein: Drumstick,
  veggies: Salad,
  sauce: Soup,
  extras: Sparkles,
}

export default function WrapBuilder() {
  const builder = useWrapBuilder()
  const { addCustomWrap } = useCart()
  const { steps, selection, activeStep, setActiveStep, errors } = builder

  const handleAdd = () => {
    const snapshot = builder.validateAndSnapshot()
    // La selección se conserva tras agregar, para seguir personalizando otro wrap.
    if (snapshot) addCustomWrap(snapshot)
  }

  const goTo = (index) => setActiveStep(Math.min(steps.length - 1, Math.max(0, index)))

  return (
    <section className="section builder" id="crea-tu-wrap" aria-labelledby="builder-title">
      <TropicalLeaf className="leaf leaf--builder-l" />
      <TropicalLeaf className="leaf leaf--builder-r" />
      <div className="container">
        <SectionTitle id="builder-title" title="Crea tu wrap" subtitle="Selecciona tus ingredientes y arma el wrap perfecto." />

        <ol className="stepper" aria-label="Pasos del constructor">
          {steps.map((step, index) => {
            const Icon = STEP_ICONS[step.icon]
            const state = index === activeStep ? 'is-active' : errors[step.key] ? 'has-error' : ''
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
              onActivate={() => index !== activeStep && setActiveStep(index)}
              onSelectSingle={builder.selectSingle}
              onToggleMulti={builder.toggleMulti}
            />
          ))}
        </div>

        <div className="builder__nav">
          <button type="button" className="btn btn--ghost btn--md" onClick={() => goTo(activeStep - 1)} disabled={activeStep === 0}>
            <ChevronLeft size={18} aria-hidden="true" /> Anterior
          </button>
          <button
            type="button"
            className="btn btn--navy btn--md"
            onClick={() => goTo(activeStep + 1)}
            disabled={activeStep === steps.length - 1}
          >
            Siguiente <ChevronRight size={18} aria-hidden="true" />
          </button>
        </div>

        <PriceSummary totalCents={builder.totalCents} onAdd={handleAdd} />
      </div>
    </section>
  )
}
