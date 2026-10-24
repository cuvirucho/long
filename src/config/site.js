// Configuración del negocio. Reemplaza los valores vacíos por los datos reales.
// Mientras un valor esté vacío, la interfaz muestra un marcador "Por configurar"
// en lugar de inventar información.

export const SITE = {
  name: 'Long Wraps',

  // Número de WhatsApp en formato internacional, solo dígitos (ej. "593991234567").
  // Si está vacío, el carrito muestra un aviso al administrador y no abre WhatsApp.
  whatsappNumber: '',

  address: {
    line1: '', // ej. "Av. Principal 123"
    line2: '', // ej. "Centro, Ciudad"
  },

  // Horario visible en la sección de ubicación.
  schedule: [
    { days: 'Lun - Dom', hours: '' }, // ej. "10:00 a.m. - 10:00 p.m."
  ],

  phone: '', // ej. "+593 99 123 4567"

  // URL "embed" de Google Maps (Compartir → Insertar un mapa → copiar el src del iframe).
  mapsEmbedUrl: '',
  // URL para "Cómo llegar" (ej. "https://www.google.com/maps/dir/?api=1&destination=...").
  mapsDirectionsUrl: '',

  social: {
    instagram: '', // ej. "https://instagram.com/longwraps"
    facebook: '',
    tiktok: '',
    handle: '@longwraps',
  },

  legal: {
    terms: '#terminos', // Sustituir por la ruta del documento real cuando exista.
    privacy: '#privacidad',
  },
}

export const PENDING_LABEL = 'Por configurar'
