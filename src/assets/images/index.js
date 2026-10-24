// Registro central de imágenes.
//
// Para usar una fotografía real:
//   1. Copia el archivo en esta carpeta (ej. hero-wrap.webp).
//   2. Impórtalo:  import heroWrap from './hero-wrap.webp'
//   3. Asígnalo a su clave:  heroWrap: heroWrap,
//
// Mientras una clave valga null, la interfaz muestra una ilustración de reemplazo.

export const IMAGES = {
  logo: "https://res.cloudinary.com/db8e98ggo/image/upload/v1792871713/Usa_la_imagen_adjunta_como_referencia_maestra_del_personaje_y_desarrolla_una_identidad_gr%C3%A1fica_comercial_completa_para_una_marca_de_comida._El_objetivo_es_crear_una_marca_gastron%C3%B3mica_atractiva_m_7_to6gpk.png", // Logotipo original (si existe, sustituye a la oca SVG del navbar/footer)
  heroWrap:
    "https://res.cloudinary.com/db8e98ggo/image/upload/v1792868009/Usa_la_imagen_adjunta_como_referencia_maestra_del_personaje_y_desarrolla_una_identidad_gr%C3%A1fica_comercial_completa_para_una_marca_de_comida._El_objetivo_es_crear_una_marca_gastron%C3%B3mica_atractiva_m_6_mb50ys.png", // Wrap abierto con pollo y vegetales (hero)
  mascota:
    "https://res.cloudinary.com/db8e98ggo/image/upload/v1792866187/Usa_la_imagen_adjunta_como_referencia_maestra_del_personaje_y_desarrolla_una_identidad_gr%C3%A1fica_comercial_completa_para_una_marca_de_comida._El_objetivo_es_crear_una_marca_gastron%C3%B3mica_atractiva_m_5_z3y2vl.png", // Mascota de la marca
  bannerWrap: null, // Wrap grande para el banner "Crea tu wrap"
  wrapSteak: null,
  GRANGERA: null,
  mascota2:
    "https://res.cloudinary.com/db8e98ggo/image/upload/v1792865042/Usa_la_imagen_adjunta_como_referencia_maestra_del_personaje_y_desarrolla_una_identidad_gr%C3%A1fica_comercial_completa_para_una_marca_de_comida._El_objetivo_es_crear_una_marca_gastron%C3%B3mica_atractiva_m_2_khlm7h.png",
  wrapVeggie: null,
  wrapShrimp: null,
  storefront: null, // Fachada del restaurante
};
