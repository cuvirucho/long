// Configuración del negocio. Reemplaza los valores vacíos por los datos reales.
// Mientras un valor esté vacío, la interfaz muestra un marcador "Por configurar"
// en lugar de inventar información.

export const SITE = {
  name: "Long Wraps",

  // Número de WhatsApp en formato internacional, solo dígitos (ej. "593991234567").
  // Si está vacío, el carrito muestra un aviso al administrador y no abre WhatsApp.
  whatsappNumber: "+593 99 547 3454",

  address: {
    line1: "Hermano Miguel", // ej. "Av. Principal 123"
    line2: "Calle Larga", // ej. "Centro, Ciudad"
  },

  // Horario visible en la sección de ubicación.
  schedule: [
    { days: "Lun - Dom", hours: "8:00 a.m. - 8:00 p.m." }, // ej. "10:00 a.m. - 10:00 p.m."
  ],

  phone: "+593 99 547 3454", // ej. "+593 99 123 4567"

  // URL "embed" de Google Maps (Compartir → Insertar un mapa → copiar el src del iframe).
  mapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15938.804804791129!2d-79.02121201489186!3d-2.9021527189717475!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91cd18135c4957eb%3A0x5d2b5f4e2342186f!2sMoritas%20Cafe%20%26%20Snack!5e0!3m2!1ses!2sec!4v1792882291375!5m2!1ses!2sec",
  // URL para "Cómo llegar" (ej. "https://www.google.com/maps/dir/?api=1&destination=...").
  mapsDirectionsUrl: "",

  social: {
    instagram: "https://www.instagram.com/longwrap/ ", // ej. "https://instagram.com/longwraps"
    facebook:
      "https://www.facebook.com/profile.php?id=61595715572208https://www.facebook.com/profile.php?id=61595715572208",
    tiktok: "",
    handle: "@longwraps",
  },

  legal: {
    terms: "#terminos", // Sustituir por la ruta del documento real cuando exista.
    privacy: "#privacidad",
  },
};

export const PENDING_LABEL = "Por configurar";
