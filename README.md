# Long Wraps — Landing page

Landing de Long Wraps hecha con React, Vite y CSS puro. Incluye un constructor de wraps en cinco pasos, un carrito que guarda los pedidos en el navegador y un botón para enviar el pedido por WhatsApp.

## Instalación y ejecución

```bash
npm install
npm run dev       # servidor de desarrollo
npm run build     # compilación de producción en dist/
npm run preview   # sirve la compilación
npm run lint
```

## Dónde editar cada cosa

| Qué | Archivo |
| --- | --- |
| Productos del menú (nombre, descripción, precio) | `src/data/menu.js` |
| Opciones y precios del constructor y precio base | `src/data/ingredients.js` |
| WhatsApp, dirección, horario, teléfono, redes, mapa y enlaces legales | `src/config/site.js` |
| Fotografías y logotipo | `src/assets/images/index.js` |
| Colores, tipografías y medidas | `src/styles/variables.css` |

Los precios se guardan en **centavos** (`750` = $7.50) para evitar errores de redondeo. Se muestran con `Intl.NumberFormat('es-EC', { currency: 'USD' })`.

## Reglas del constructor

- Tortilla, proteína y salsa: se elige **una** opción. Son obligatorias y se validan antes de agregar al pedido.
- Ingredientes y extras: se pueden elegir **varios**.
- Un ingrediente es la porción normal y un extra es una porción **adicional** que se cobra aparte. Por ejemplo, Aguacate + Aguacate extra = doble porción. Cada opción tiene un id único, así que nada se cobra dos veces.
- Total = `BASE_PRICE_CENTS` + la suma de las opciones elegidas. El precio base es un dato de demostración y se cambia en `ingredients.js`. El cálculo está en la función pura `calculateWrapPrice` (`src/utils/wrapPricing.js`).
- Al agregar un wrap al carrito se guarda una copia de su configuración y su precio. Si después cambias el constructor, los wraps que ya están en el carrito no cambian.

## Pendiente de configurar (no se inventó ningún dato)

- **WhatsApp**: mientras `whatsappNumber` esté vacío, el carrito muestra un aviso para el administrador en lugar del botón de envío.
- **Dirección, horario, teléfono y redes**: se muestran como "Por configurar".
- **Mapa**: se muestra un mapa ilustrado de ejemplo. Para usar el mapa real, configura `mapsEmbedUrl` (el `src` del iframe que da Google Maps) y `mapsDirectionsUrl` (activa el botón "Cómo llegar").
- **Imágenes**: el logotipo, la mascota y las fotos son ilustraciones SVG provisionales. Para usar fotos reales, copia los archivos en `src/assets/images/`, impórtalos en `index.js` y asígnalos a su clave.
- **Documentos legales**: `#terminos` y `#privacidad` son marcadores. Cámbialos en `SITE.legal`.

Los precios son estimados. Esta página no cobra pagos ni envía pedidos a ningún sistema. El pedido se confirma con el restaurante por WhatsApp.
