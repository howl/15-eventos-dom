const imagenes = [
  {
    src: 'assets/images/viajes/viajes-1.jpg',
    pais: 'Cuba',
    descripcion: 'En Varadero encontrarás las mejores playas cristalinas.',
    tags: ['playa', 'tropical', 'costa', 'sol', 'calor'],
  }, {
    src: 'assets/images/viajes/viajes-2.jpg',
    pais: 'Maldivas',
    descripcion: 'Disfruta de los mejores atolones del mundo.',
    tags: ['playa', 'tropical', 'costa', 'atolón', 'sol', 'calor'],
  }, {
    src: 'assets/images/viajes/viajes-3.jpg',
    pais: 'Múltiples destinos',
    descripcion: 'Si no te decides que país quieres visitar hay disponibles viajes por varios de ellos a la vez.',
    tags: ['letreros'],
  }, {
    src: 'assets/images/viajes/viajes-4.jpg',
    pais: 'España',
    descripcion: 'Sevilla tiene un color especial.',
    tags: ['ciudad', 'sol', 'calor'],
  }, {
    src: 'assets/images/viajes/viajes-5.jpg',
    pais: 'España',
    descripcion: 'La misma plaza desde otro lado, o quizás es Naboo.',
    tags: ['ciudad', 'sol', 'calor'],
  }, {
    src: 'assets/images/viajes/viajes-6.jpg',
    pais: 'España',
    descripcion: 'Paseo del Arañón.',
    tags: ['costa', 'frio'],
  }, {
    src: 'assets/images/viajes/viajes-7.jpg',
    pais: 'España',
    descripcion: 'Castillo de la Yedra.',
    tags: ['histórico', 'sol', 'calor'],
  },
];

/**
 * Genera un array con los tags únicos presentes en una serie de elementos con tags.
 * @param {[]} elementos - Array de elementos de los que leer sus tags.
 * @returns {Set} - El Set con los tags únicos.
 */
const generarTagsDesdeElementos = (elementos) => {
  /*
    De las múltiples formas que se pueden hacer para obtener los elementos únicos,
    Ej: iterar cada array comprobando con includes en el array de destino si ya existe,
    elijo usar el objeto Set propio de javascript. Es mucho más rapido haciendo lo suyo.
  */
  const tags = new Set();
  elementos.forEach((elemento) => elemento.tags.forEach((tag) => tags.add(tag)));
  return tags;
};

/**
 * Genera los botones de filtrado en base a las etiquetas que se le pasan.
 * @param {Set} tags - Un Set con los tags para los que hacer botones.
 * @returns {DocumentFragment}
 */
const generarBotonesDesdeTags = (tags) => {
  const fragmento = document.createDocumentFragment();

  tags.forEach((tag) => {
    const nuevoButton = fragmento.appendChild(document.createElement('button'));
    nuevoButton.textContent = tag;
  });

  return fragmento;
};
