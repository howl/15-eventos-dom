/**
 * Genera un array con los tags únicos presentes en una serie de elementos con tags.
 * @param {[]} elementos - Array de elementos de los que leer sus tags.
 * @returns {[]} - El Set con los tags únicos.
 */
const generarTagsDesdeElementos = (elementos) => {
  /*
    De las múltiples formas que se pueden hacer para obtener los elementos únicos,
    Ej: iterar cada array comprobando con includes en el array de destino si ya existe,
    elijo usar el objeto Set propio de javascript. Es mucho más rapido haciendo lo suyo.
  */
  const tags = new Set();

  elementos.forEach((elemento) => elemento.tags.forEach((tag) => tags.add(tag)));

  return Array.from(tags).sort();
};

/**
 * Genera los botones de filtrado en base a las etiquetas que se le pasan.
 * @param {[]} tags - Un Set con los tags para los que hacer botones.
 * @param {Element} elementoPadre - Elemento al que colocar las botones.
 */
const generarBotonesDesdeTags = (tags, elementoPadre) => {
  const fragmento = document.createDocumentFragment();

  tags.forEach((tag) => {
    const nuevoButton = fragmento.appendChild(document.createElement('button'));
    nuevoButton.textContent = tag;
  });

  elementoPadre.appendChild(fragmento);
};

/**
 * Filtra las imagenes por el tag añdiéndolas al elementoPadre devolviendo la
 * cantidad de imágenes filtradas.
 * @param {[]} imagenes - Array con las imagenes a filtrar.
 * @param {string} tag - Tag por el que filtrar las imagenes.
 * @param {Element} elementoPadre - Elemento al que colocar las imágenes.
 * @returns {number} - Cantidad de imágenes filtradas.
 */
const mostrarImagenesConTag = (imagenes, tag, elementoPadre) => {
  const fragmento = document.createDocumentFragment();
  const imagenesFiltradas = imagenes.filter(imagen => imagen.tags.includes(tag));

  elementoPadre.textContent = '';
  imagenesFiltradas.forEach((imagen, index) => {
    const imagenFigure = document.createElement('figure');
    const imagenImagen = document.createElement('img');
    const imagenCaption = document.createElement('figcaption');
    const imagenDescripcionExtendida = document.createElement('p');

    if (!index)
      imagenFigure.classList.add('flexItemPrincipio', 'flexItemSolitario');
    else
      imagenFigure.classList.add('flexItemFinal');
    imagenImagen.src = imagen.src;
    imagenImagen.alt = imagen.pais;
    imagenCaption.textContent = imagen.pais;
    imagenDescripcionExtendida.textContent = imagen.descripcion;
    imagenFigure.appendChild(imagenImagen);
    imagenFigure.appendChild(imagenCaption);
    imagenFigure.appendChild(imagenDescripcionExtendida);
    fragmento.appendChild(imagenFigure);
  });

  if (imagenesFiltradas.length > 1) {
    const imagenesRelacionadasTitulo = document.createElement('h3');

    imagenesRelacionadasTitulo.classList.add('flexItemSolitario');
    imagenesRelacionadasTitulo.textContent = 'Imágenes relacionadas';
    fragmento.appendChild(imagenesRelacionadasTitulo);
  }

  elementoPadre.appendChild(fragmento);

  return imagenesFiltradas.length;
};

/**
 * Función de ejecución principal.
 */
(() => {
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
      tags: ['ciudad', 'sol', 'calor', 'histórico'],
    }, {
      src: 'assets/images/viajes/viajes-5.jpg',
      pais: 'España',
      descripcion: 'La misma plaza desde otro lado, o quizás es Naboo.',
      tags: ['ciudad', 'sol', 'calor', 'histórico'],
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
  const botonesFiltrado = document.querySelector('#botonesFiltrado');

  document.addEventListener('click', ev => {
    if (ev.target.tagName === 'BUTTON' && ev.target.parentElement.id === 'botonesFiltrado') {
      const numImagesFiltradas = document.querySelector('#numImagesFiltradas');
      const pluralSingular = document.querySelector('#pluralSingular');
      const etiquetaFiltrada = document.querySelector('#etiquetaFiltrada');
      const galeriaFotos = document.querySelector('#galeriaFotos');
      const numImagesFiltradasNumber = mostrarImagenesConTag(imagenes, ev.target.textContent, galeriaFotos)

      numImagesFiltradas.textContent = numImagesFiltradasNumber;
      pluralSingular.textContent = numImagesFiltradasNumber === 1 ? 'imagen' : 'imágenes';

      etiquetaFiltrada.textContent = ev.target.textContent;
    }
  });

  generarBotonesDesdeTags(generarTagsDesdeElementos(imagenes), botonesFiltrado);
})();
