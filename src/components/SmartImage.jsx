import { IMAGES } from '../assets/images/index.js'

// Muestra la imagen registrada en IMAGES[imageKey] o, si no existe, el fallback ilustrado.
export default function SmartImage({ imageKey, alt, fallback, className = '', loading = 'lazy' }) {
  const src = IMAGES[imageKey]
  if (src) return <img className={className} src={src} alt={alt} loading={loading} decoding="async" />
  return (
    <div className={`${className} smart-image--fallback`} role="img" aria-label={alt}>
      {fallback}
    </div>
  )
}
