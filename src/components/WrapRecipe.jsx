import { BUILDER_STEPS } from "../data/ingredients.js";
import { getSelectedOptions } from "../utils/wrapPricing.js";

// Receta de un wrap (paso → opciones elegidas), usada en el Top 3 y en Creaciones.
export default function WrapRecipe({ selection }) {
  return (
    <dl className="top-card__recipe">
      {BUILDER_STEPS.map((step) => {
        const options = getSelectedOptions(selection, step.key);
        if (options.length === 0) return null;
        return (
          <div key={step.key} className="top-card__row">
            <dt>{step.title}</dt>
            <dd>
              {options
                .map((option) =>
                  option.emoji ? `${option.emoji} ${option.name}` : option.name,
                )
                .join(", ")}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
