import { CircleAlert } from 'lucide-react'
import { formatMoney } from '../utils/money.js'

function OptionThumb({ stepKey, option }) {
  if (stepKey === 'tortilla') {
    return <span className="thumb thumb--tortilla" style={{ '--thumb-color': option.color }} aria-hidden="true" />
  }
  if (stepKey === 'salsa') {
    return <span className="thumb thumb--sauce" style={{ '--thumb-color': option.color }} aria-hidden="true" />
  }
  return (
    <span className="thumb thumb--emoji" aria-hidden="true">
      {option.emoji}
    </span>
  )
}

export default function IngredientStep({ step, index, isActive, value, error, onSelectSingle, onToggleMulti }) {
  const isSingle = step.type === 'single'
  const inputName = `builder-${step.key}`
  const isChecked = (id) => (isSingle ? value === id : value.includes(id))

  return (
    <fieldset
      className={`builder-panel ${isActive ? 'is-active' : ''} ${error ? 'has-error' : ''}`}
      aria-describedby={error ? `${inputName}-error` : undefined}
    >
      <legend className="builder-panel__title">
        <span className="builder-panel__num">{index + 1}.</span> {step.title}
        <span className="visually-hidden">
          {isSingle ? ' (elige una opción)' : ' (puedes elegir varias opciones)'}
        </span>
      </legend>

      <ul className="builder-options">
        {step.options.map((option) => (
          <li key={option.id}>
            <label className={`option ${isChecked(option.id) ? 'is-checked' : ''}`}>
              <input
                className={`option__input option__input--${isSingle ? 'radio' : 'check'}`}
                type={isSingle ? 'radio' : 'checkbox'}
                name={inputName}
                value={option.id}
                checked={isChecked(option.id)}
                onChange={() => (isSingle ? onSelectSingle(step.key, option.id) : onToggleMulti(step.key, option.id))}
              />
              <OptionThumb stepKey={step.key} option={option} />
              <span className="option__name">{option.name}</span>
              <span className="option__price">
                {option.priceCents === 0 ? 'Incluido' : `+${formatMoney(option.priceCents)}`}
              </span>
            </label>
          </li>
        ))}
      </ul>

      {step.note && <p className="builder-panel__note">{step.note}</p>}
      <p className="builder-panel__hint" aria-hidden="true">{step.hint}</p>

      {error && (
        <p className="builder-panel__error" id={`${inputName}-error`} role="alert">
          <CircleAlert size={16} aria-hidden="true" /> {error}
        </p>
      )}
    </fieldset>
  )
}
