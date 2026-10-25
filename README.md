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

- Tortilla: se elige **una** opción.
- Proteínas, ingredientes, salsas y extras: se pueden elegir **varias**. Proteínas y salsas son obligatorias (al menos una) y se validan antes de avanzar.
- Un ingrediente es la porción normal y un extra es una porción **adicional** que se cobra aparte. Por ejemplo, Aguacate + Aguacate extra = doble porción. Cada opción tiene un id único, así que nada se cobra dos veces.
- Total = `BASE_PRICE_CENTS` + la suma de las opciones elegidas. El precio base es un dato de demostración y se cambia en `ingredients.js`. El cálculo está en la función pura `calculateWrapPrice` (`src/utils/wrapPricing.js`).
- Al agregar un wrap al carrito se guarda una copia de su configuración y su precio. Si después cambias el constructor, los wraps que ya están en el carrito no cambian.

## Creaciones de la comunidad (Firebase)

Al agregar un wrap desde "Crea tu wrap" se ofrece publicarlo en la colección `creaciones` de Firestore. La sección "Creaciones" lista los wraps publicados (10 por página, con paginación por cursor), permite buscar por nombre o creador, votar (un voto por dispositivo, con sesión anónima) y compartir en redes. El Top 3 muestra los 3 más votados.

Configuración:

1. Crea un proyecto en [Firebase](https://console.firebase.google.com) y agrega una app web.
2. Activa **Firestore** y, en **Authentication → Sign-in method**, el proveedor **Anónimo**.
3. Copia `.env.example` como `.env.local` y pega los datos de la app web.
4. Publica las reglas y los índices: `npx firebase-tools deploy --only firestore` (usa `firebase.json`, `firestore.rules` y `firestore.indexes.json`).

| Qué | Archivo |
| --- | --- |
| Conexión y sesión anónima | `src/config/firebase.js` |
| Consultas, búsqueda, votos y enlace para compartir | `src/services/creations.js` |
| Reglas de seguridad (voto único, contador de 1 en 1) | `firestore.rules` |

Mientras Firebase no esté configurado, la página funciona igual que antes y la sección muestra un aviso para el administrador.

## Pendiente de configurar (no se inventó ningún dato)

- **WhatsApp**: mientras `whatsappNumber` esté vacío, el carrito muestra un aviso para el administrador en lugar del botón de envío.
- **Dirección, horario, teléfono y redes**: se muestran como "Por configurar".
- **Mapa**: se muestra un mapa ilustrado de ejemplo. Para usar el mapa real, configura `mapsEmbedUrl` (el `src` del iframe que da Google Maps) y `mapsDirectionsUrl` (activa el botón "Cómo llegar").
- **Imágenes**: el logotipo, la mascota y las fotos son ilustraciones SVG provisionales. Para usar fotos reales, copia los archivos en `src/assets/images/`, impórtalos en `index.js` y asígnalos a su clave.
- **Documentos legales**: `#terminos` y `#privacidad` son marcadores. Cámbialos en `SITE.legal`.

Los precios son estimados. Esta página no cobra pagos ni envía pedidos a ningún sistema. El pedido se confirma con el restaurante por WhatsApp.
