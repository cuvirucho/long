// Top 3 de wraps creados por la comunidad. Edita nombres, creadores y recetas aquí.
// `selection` usa los mismos ids que src/data/ingredients.js (tortilla, proteina,
// ingredientes, salsa, extras). El precio se calcula solo con esa receta, así
// siempre coincide con el constructor "Crea tu wrap".
// El orden del array define el puesto (#1, #2, #3).

export const TOP_WRAPS = [
  {
    id: "el-volcan",
    name: "EL VOLCÁN",
    creator: "Andrea M.",
    likes: 248,
    quote: "Picante, crujiente y con ese chipotle que te pide otro.",
    selection: {
      tortilla: "integral",
      proteina: ["pollo", "Tocino"],
      ingredientes: ["lechuga", "tomate-fresco", "cheddar"],
      salsa: ["chipotle"],
      extras: ["jalapenos"],
    },
  },
  {
    id: "mar-y-mango",
    name: "MAR Y MANGO",
    creator: "Carlos R.",
    likes: 197,
    quote: "Fresco, tropical y con doble aguacate. Sabe a playa.",
    selection: {
      tortilla: "espinaca",
      proteina: ["Mariscos"],
      ingredientes: ["lechuga", "aguacate", "pepino"],
      salsa: ["mango", "yogur"],
      extras: ["aguacate-extra"],
    },
  },
  {
    id: "la-bestia-bbq",
    name: "LA BESTIA BBQ",
    creator: "Joss P.",
    likes: 163,
    quote: "Tres carnes, BBQ y queso extra. Solo para valientes.",
    selection: {
      tortilla: "clasica",
      proteina: ["cerdo", "res-molida", "Chorizo"],
      ingredientes: ["cebolla", "cheddar"],
      salsa: ["bbq", "casa"],
      extras: ["queso-extra", "tocineta"],
    },
  },
];
