// Datos del constructor de wraps. Precios en centavos.
//
// Reglas comerciales:
// - "single": se elige exactamente una opción (tortilla, proteína, salsa).
// - "multi": se pueden elegir varias o ninguna (ingredientes, extras).
// - Un ingrediente es la porción normal incluida en el wrap. Un extra es una
//   porción ADICIONAL y se cobra aparte, aunque el mismo ingrediente esté
//   marcado en el paso 3 (ej. "Aguacate" + "Aguacate extra" = doble porción).
//   Cada id es único en todo el constructor, así nada se cobra dos veces.

// Precio base de preparación del wrap (dato de demostración, editable).
export const BASE_PRICE_CENTS = 500

export const BUILDER_STEPS = [
  {
    key: 'tortilla',
    title: 'Tortilla',
    hint: 'Elige tu base',
    type: 'single',
    required: true,
    icon: 'tortilla',
    options: [
      { id: 'clasica', name: 'Clásica', priceCents: 0, color: '#F3D9A4' },
      { id: 'integral', name: 'Integral', priceCents: 50, color: '#C99B63' },
      { id: 'espinaca', name: 'Espinaca', priceCents: 50, color: '#9CC07A' },
      { id: 'tomate', name: 'Tomate', priceCents: 50, color: '#E9876B' },
    ],
  },
  {
    key: 'proteina',
    title: 'Proteínas',
    hint: 'Una proteína principal',
    type: 'single',
    required: true,
    icon: 'protein',
    options: [
      { id: 'pollo', name: 'Pollo a la parrilla', priceCents: 250, emoji: '🍗' },
      { id: 'res', name: 'Carne de res', priceCents: 300, emoji: '🥩' },
      { id: 'jamon', name: 'Jamón', priceCents: 200, emoji: '🥓' },
      { id: 'falafel', name: 'Falafel', priceCents: 200, emoji: '🧆' },
      { id: 'camarones', name: 'Camarones', priceCents: 350, emoji: '🍤' },
    ],
  },
  {
    key: 'ingredientes',
    title: 'Ingredientes',
    hint: 'Ingredientes frescos',
    type: 'multi',
    required: false,
    icon: 'veggies',
    options: [
      { id: 'lechuga', name: 'Lechuga', priceCents: 50, emoji: '🥬' },
      { id: 'tomate-fresco', name: 'Tomate', priceCents: 50, emoji: '🍅' },
      { id: 'cebolla', name: 'Cebolla morada', priceCents: 50, emoji: '🧅' },
      { id: 'pepino', name: 'Pepino', priceCents: 50, emoji: '🥒' },
      { id: 'maiz', name: 'Maíz', priceCents: 50, emoji: '🌽' },
      { id: 'aguacate', name: 'Aguacate', priceCents: 100, emoji: '🥑' },
      { id: 'cheddar', name: 'Queso cheddar', priceCents: 100, emoji: '🧀' },
    ],
  },
  {
    key: 'salsa',
    title: 'Salsas',
    hint: 'Dale sabor',
    type: 'single',
    required: true,
    icon: 'sauce',
    options: [
      { id: 'casa', name: 'Salsa de la casa', priceCents: 0, color: '#F2A65A' },
      { id: 'chipotle', name: 'Chipotle', priceCents: 50, color: '#C8553D' },
      { id: 'mango', name: 'Mango', priceCents: 50, color: '#FFB627' },
      { id: 'yogur', name: 'Yogur', priceCents: 50, color: '#F4F1EA' },
      { id: 'bbq', name: 'BBQ', priceCents: 50, color: '#6B2D1F' },
    ],
  },
  {
    key: 'extras',
    title: 'Extras',
    hint: 'Extras perfectos',
    type: 'multi',
    required: false,
    icon: 'extras',
    note: 'Los extras son una porción adicional y se suman a la porción normal.',
    options: [
      { id: 'queso-extra', name: 'Queso extra', priceCents: 100, emoji: '🧀' },
      { id: 'aguacate-extra', name: 'Aguacate extra', priceCents: 100, emoji: '🥑' },
      { id: 'tocineta', name: 'Tocineta', priceCents: 100, emoji: '🥓' },
      { id: 'jalapenos', name: 'Jalapeños', priceCents: 50, emoji: '🌶️' },
      { id: 'maiz-extra', name: 'Maíz extra', priceCents: 50, emoji: '🌽' },
    ],
  },
]

export const INITIAL_SELECTION = {
  tortilla: 'clasica',
  proteina: 'pollo',
  ingredientes: ['lechuga', 'tomate-fresco'],
  salsa: 'casa',
  extras: [],
}
