// Datos del constructor de wraps. Precios en centavos.
//
// Reglas comerciales:
// - "single": se elige exactamente una opción (solo la tortilla).
// - "multi": se pueden elegir varias opciones (proteínas, ingredientes, salsas,
//   extras). Con "required" hace falta al menos una (proteínas y salsas).
// - Un ingrediente es la porción normal incluida en el wrap. Un extra es una
//   porción ADICIONAL y se cobra aparte, aunque el mismo ingrediente esté
//   marcado en el paso 3 (ej. "Aguacate" + "Aguacate extra" = doble porción).
//   Cada id es único en todo el constructor, así nada se cobra dos veces.

// Precio base de preparación del wrap (dato de demostración, editable).
export const BASE_PRICE_CENTS = 200;

export const BUILDER_STEPS = [
  {
    key: "tortilla",
    title: "Tortilla",
    hint: "Elige tu base",
    type: "single",
    required: true,
    icon: "tortilla",
    options: [
      { id: "clasica", name: "Clásica", priceCents: 0, color: "#F3D9A4" },
      { id: "integral", name: "Integral", priceCents: 50, color: "#C99B63" },
      { id: "espinaca", name: "Espinaca", priceCents: 50, color: "#9CC07A" },
    ],
  },
  {
    key: "proteina",
    title: "Proteínas",
    hint: "Elige una o varias",
    type: "multi",
    required: true,
    icon: "protein",
    options: [
      {
        id: "pollo",
        name: "Pollo apanado",
        priceCents: 350,
        emoji: "🍗",
      },

      { id: "cerdo", name: "Carne de cerdo", priceCents: 300, emoji: "🥩" },
      {
        id: "res-molida",
        name: "Carne de res molida.",
        priceCents: 300,
        emoji: "🍖",
      },
      { id: "Tocino", name: "Tocino", priceCents: 350, emoji: "🥓" },
      { id: "Chorizo", name: "Chorizo", priceCents: 350, emoji: "🍠" },
      { id: "Mariscos", name: "Mariscos", priceCents: 350, emoji: "🍣" },
    ],
  },
  {
    key: "ingredientes",
    title: "Ingredientes",
    hint: "Ingredientes frescos",
    type: "multi",
    required: false,
    icon: "veggies",
    options: [
      { id: "lechuga", name: "Lechuga", priceCents: 50, emoji: "🥬" },
      { id: "tomate-fresco", name: "Tomate", priceCents: 50, emoji: "🍅" },
      { id: "cebolla", name: "Cebolla morada", priceCents: 50, emoji: "🧅" },
      { id: "pepino", name: "Pepino", priceCents: 50, emoji: "🥒" },
      { id: "maiz", name: "Maíz", priceCents: 50, emoji: "🌽" },
      { id: "aguacate", name: "Aguacate", priceCents: 100, emoji: "🥑" },
      { id: "cheddar", name: "Queso cheddar", priceCents: 100, emoji: "🧀" },
    ],
  },
  {
    key: "salsa",
    title: "Salsas",
    hint: "Dale sabor",
    type: "multi",
    required: true,
    icon: "sauce",
    options: [
      { id: "casa", name: "Salsa de la casa", priceCents: 0, color: "#F2A65A" },
      { id: "chipotle", name: "Chipotle", priceCents: 50, color: "#C8553D" },
      { id: "mango", name: "Mango", priceCents: 50, color: "#FFB627" },
      { id: "yogur", name: "Yogur", priceCents: 50, color: "#F4F1EA" },
      { id: "bbq", name: "BBQ", priceCents: 50, color: "#6B2D1F" },
    ],
  },
  {
    key: "extras",
    title: "Extras",
    hint: "Extras perfectos",
    type: "multi",
    required: false,
    icon: "extras",
    note: "Los extras son una porción adicional y se suman a la porción normal.",
    options: [
      { id: "queso-extra", name: "Queso extra", priceCents: 100, emoji: "🧀" },
      {
        id: "aguacate-extra",
        name: "Aguacate extra",
        priceCents: 100,
        emoji: "🥑",
      },
      { id: "tocineta", name: "Tocineta", priceCents: 100, emoji: "🥓" },
      { id: "jalapenos", name: "Jalapeños", priceCents: 50, emoji: "🌶️" },
      { id: "maiz-extra", name: "Maíz extra", priceCents: 50, emoji: "🌽" },
    ],
  },
];

export const INITIAL_SELECTION = {
  tortilla: "clasica",
  proteina: [],
  ingredientes: ["", ""],
  salsa: [],
  extras: [],
};
