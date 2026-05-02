/**
 * Genera un array con los tags únicos presentes en una serie de elementos con tags.
 * @param {[]} elementos - Array de elementos de los que leer sus tags.
 * @returns {[]} - El array con los tags únicos.
 */
const generarTagsDesdeElementos = (elementos, primerTag) => {
  /*
    De las múltiples formas que se pueden hacer para obtener los elementos únicos,
    Ej: iterar cada array comprobando con includes en el array de destino si ya existe,
    elijo usar el objeto Set propio de javascript. Es mucho más rapido haciendo lo suyo.
  */
  const tags = new Set();

  elementos.forEach((elemento) => elemento.tags.forEach((tag) => tags.add(tag)));

  /* Colo el tag especificado en primerTag el primero y los demás de forma normal */
  return Array.from(tags).sort((a, b) => a === primerTag ? false : b === primerTag ? true : a > b);
};

/**
 * Genera los botones de filtrado en base a las etiquetas que se le pasan.
 * @param {[]} tags - Un array con los tags para los que hacer botones.
 * @param {Element} elementoPadre - Elemento al que colocar las botones.
 */
const generarBotonesDesdeTags = (tags, elementoPadre) => {
  const fragmento = document.createDocumentFragment();

  tags.forEach((tag) => {
    const nuevoButton = fragmento.appendChild(document.createElement('button'));
    nuevoButton.classList.add('cajaTransparente');
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
  /*
    Es importante colocar el primero en la estructura HTML el título de la
    sección secundaria, ya que sino el efecto de scroll suave para la imagen que
    es principal por defecto al pasarla    a secundaria y retornarla a principal
    hace un desplazamiento brusco a la parte superior de la página y luego baja suave.
    Así lo hace desde abajo sin movimiento brusco inicial como las demás.
  */
  if (imagenesFiltradas.length > 1) {
    const imagenesRelacionadasTitulo = document.createElement('h3');

    imagenesRelacionadasTitulo.classList.add('flexItem');
    imagenesRelacionadasTitulo.textContent = 'Imágenes relacionadas';
    fragmento.appendChild(imagenesRelacionadasTitulo);
  }
  imagenesFiltradas.forEach((imagen, index) => {
    const elemento = document.createElement('div');
    const contenedorInterior = document.createElement('div');
    const imagenFigure = document.createElement('figure');
    const imagenImagen = document.createElement('img');
    const imagenCaption = document.createElement('figcaption');
    const imagenDescripcionExtendida = document.createElement('p');

    elemento.classList.add('cajaTransparente');
    elemento.classList.add('flexItem', !index ? 'flexItemPrincipal' : 'flexItemSecundario');
    imagenImagen.src = imagen.src;
    imagenImagen.alt = imagen.pais;
    imagenCaption.textContent = imagen.pais;
    imagenDescripcionExtendida.textContent = imagen.descripcion;
    imagenFigure.appendChild(imagenImagen);
    imagenFigure.appendChild(imagenCaption);
    contenedorInterior.appendChild(imagenFigure);
    contenedorInterior.appendChild(imagenDescripcionExtendida);
    elemento.appendChild(contenedorInterior);
    fragmento.appendChild(elemento);
  });

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
      tags: ['todas', 'playa', 'tropical', 'costa', 'sol', 'calor'],
    }, {
      src: 'assets/images/viajes/viajes-2.jpg',
      pais: 'Maldivas',
      descripcion: 'Disfruta de los mejores atolones del mundo.',
      tags: ['todas', 'playa', 'tropical', 'costa', 'atolón', 'sol', 'calor'],
    }, {
      src: 'assets/images/viajes/viajes-3.jpg',
      pais: 'Múltiples destinos',
      descripcion: 'Si no te decides que país quieres visitar hay disponibles viajes por varios de ellos a la vez.',
      tags: ['todas', 'letreros'],
    }, {
      src: 'assets/images/viajes/viajes-4.jpg',
      pais: 'España',
      descripcion: 'Sevilla tiene un color especial.',
      tags: ['todas', 'ciudad', 'sol', 'calor', 'histórico'],
    }, {
      src: 'assets/images/viajes/viajes-5.jpg',
      pais: 'España',
      descripcion: 'La misma plaza desde otro lado, o quizás es Naboo.',
      tags: ['todas', 'ciudad', 'sol', 'calor', 'histórico'],
    }, {
      src: 'assets/images/viajes/viajes-6.jpg',
      pais: 'España',
      descripcion: 'Paseo del Arañón.',
      tags: ['todas', 'costa', 'frio'],
    }, {
      src: 'assets/images/viajes/viajes-7.jpg',
      pais: 'España',
      descripcion: 'Castillo de la Yedra.',
      tags: ['todas', 'histórico', 'sol', 'calor'],
    },
  ];
  const botonesFiltrado = document.querySelector('#botonesFiltrado');

  document.addEventListener('click', ev => {
    /* Como uso un único listener general, no secciono cada parte en funciones distintas ya que no va a existir reuso de código */

    /* Click sobre cualquier tag no pulsado actualmente */
    if (ev.target.tagName === 'BUTTON' && ev.target.parentElement.id === 'botonesFiltrado' && !ev.target.classList.contains('pulsado')) {
      const botonPulsadoAnterior = document.querySelector('#botonesFiltrado>button.pulsado');
      const pluralSingular = document.querySelectorAll('#infoDeFiltrado>.pluralSingular');
      const numImagesFiltradas = document.querySelector('#numImagesFiltradas');
      const etiquetaFiltrada = document.querySelector('#etiquetaFiltrada');
      const numImagesFiltradasNumber = mostrarImagenesConTag(imagenes, ev.target.textContent, document.querySelector('#galeriaFotos'))

      if (!botonPulsadoAnterior) {
        const infoDeUso = document.querySelector('#infoDeUso');
        const infoDeFiltrado = document.querySelector('#infoDeFiltrado');

        infoDeUso.classList.toggle('displayNone');
        infoDeFiltrado.classList.toggle('displayNone');
      }
      else
        botonPulsadoAnterior.classList.remove('pulsado');
      ev.target.classList.add('pulsado');
      numImagesFiltradas.textContent = numImagesFiltradasNumber;
      if (numImagesFiltradasNumber === 1) {
        pluralSingular[0].textContent = 'ha';
        pluralSingular[1].textContent = 'imagen';
      } else {
        pluralSingular[0].textContent = 'han';
        pluralSingular[1].textContent = 'imágenes';
      }
      etiquetaFiltrada.textContent = ev.target.textContent;
    }

    /* Click sobre cualquier elemento de la galeria menos la propia galeria y el título de la sección secundaria */
    if (document.querySelector('#galeriaFotos').contains(ev.target) && ev.target !== document.querySelector('#galeriaFotos') && ev.target.tagName !== 'H3') {
      const flexItemPrincipal = document.querySelector('#galeriaFotos>.flexItemPrincipal');
      let flexItemPulsado = ev.target;

      while (!flexItemPulsado.classList.contains('flexItem'))
        flexItemPulsado = flexItemPulsado.parentElement;
      if (flexItemPrincipal !== flexItemPulsado) {
        flexItemPrincipal.classList.remove('flexItemPrincipal');
        flexItemPrincipal.classList.add('flexItemSecundario');
        flexItemPulsado.classList.add('flexItemPrincipal');
        flexItemPulsado.classList.remove('flexItemSecundario');
        flexItemPulsado.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });

  generarBotonesDesdeTags(generarTagsDesdeElementos(imagenes, 'todas'), botonesFiltrado);
})();
