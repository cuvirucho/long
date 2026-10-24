// Datos de demostración del menú. Edita nombres, descripciones y precios aquí.
// Los precios están en centavos (750 = $7.50).
// `image` corresponde a una clave de src/assets/images/index.js.

export const MENU = [
  {
    id: "LA-GRANGERA",
    name: "LA GRANGERA",
    description:
      "Tortilla .de harina dorada y ligeramente tostada, rellena de tres carnes jugosas: pollo, res y cerdo, acompañadas de lechuga fresca, tomate, cebolla morada y nuestra salsa especial cremosa. Una combinación abundante, sabrosa y perfecta para los amantes de la carne",
    priceCents: 550,
    image: "GRANGERA",
    tag: "Favorito",
  },
  {
    id: "steak-dream",
    name: "Steak Dream",
    description:
      "Carne de res, queso cheddar, cebolla caramelizada, lechuga y salsa chipotle.",
    priceCents: 890,
    image: "wrapSteak",
  },
  {
    id: "veggie-power",
    name: "Veggie Power",
    description: "Falafel, aguacate, tomate, pepino, lechuga y salsa de yogur.",
    priceCents: 750,
    image: "wrapVeggie",
    tag: "Vegetariano",
  },
  {
    id: "shrimp-tropical",
    name: "Shrimp Tropical",
    description: "Camarones, piña, lechuga, queso y salsa de mango.",
    priceCents: 950,
    image: "wrapShrimp",
  },
];
