/**
 * Genera un array con los tags únicos presentes en una serie de viajes con
 * tags.
 * @param {[]} viajes - Array de viajes de los que leer sus tags.
 * @returns {[]} - El array con los tags únicos.
 */
const generarTagsDesdeViajes = (viajes, primerTag) => {
  /*
    De las múltiples formas que se pueden hacer para obtener los tags únicos,
    Ej: iterar cada array comprobando con includes en el array de destino si ya
    existe, elijo usar el objeto Set propio de javascript. Es mucho más rapido
    haciendo lo suyo.
  */
  const tags = new Set();

  viajes.forEach((viaje) => viaje.tags.forEach((tag) => tags.add(tag)));

  /* Colo el tag en primerTag el primero y el resto ordenados de forma normal */
  return Array.from(tags).sort((a, b) => a === primerTag ? false : b === primerTag ? true : a > b);
};

/**
 * Genera los botones de filtrado en base a los tags que se le pasan.
 * @param {[]} tags - Un array con los tags para los que hacer botones.
 * @param {Element} elementoPadre - Elemento al que colocar las botones.
 */
const generarBotonesDesdeTags = (tags, elementoPadre) => {
  const fragmento = document.createDocumentFragment();

  tags.forEach((tag) => {
    const nuevoButton = fragmento.appendChild(document.createElement('button'));
    nuevoButton.classList.add('cajaTransparente');
    nuevoButton.appendChild(document.createTextNode(tag));
  });

  elementoPadre.appendChild(fragmento);
};

/**
 * Filtra los viajes por el tag añdiéndolos al elementoPadre devolviendo la
 * cantidad de viajes filtrados.
 * @param {[]} viajes - Array con los viajes a filtrar.
 * @param {string} tag - Tag por el que filtrar los viajes.
 * @param {Element} elementoPadre - Elemento al que colocar los viajes.
 * @returns {number} - Cantidad de viajes filtrados.
 */
const mostrarViajesConTag = (viajes, tag, elementoPadre) => {
  const fragmento = document.createDocumentFragment();
  const viajesFiltrados = viajes.filter(viaje => viaje.tags.includes(tag));

  elementoPadre.textContent = '';
  /*
    Es importante colocar el primero en la estructura HTML el título de la
    sección secundaria, ya que sino el efecto de scroll suave para el viaje que
    es principal por defecto al pasarlo a secundaria y retornarlo a principal
    hace un desplazamiento brusco a la parte superior de la página y luego baja
    suave.
    Así lo hace desde abajo sin movimiento brusco inicial como las demás.
  */
  if (viajesFiltrados.length > 1) {
    const viajesRelacionadosTitulo = document.createElement('h3');

    viajesRelacionadosTitulo.classList.add('flexItem');
    viajesRelacionadosTitulo.textContent = 'Viajes relacionados';
    fragmento.appendChild(viajesRelacionadosTitulo);
  }
  viajesFiltrados.forEach((viaje, index) => {
    const viajeElemento = document.createElement('div');
    const contenedorInterior = document.createElement('div');
    const viajeFigure = document.createElement('figure');
    const viajeImagen = document.createElement('img');
    const viajeCaption = document.createElement('figcaption');
    const viajeCaptionLabel = document.createElement('span');
    const viajeDescripcionExtendida = document.createElement('p');
    const viajeDescripcionExtendidaLabel = document.createElement('span');

    viajeElemento.classList.add('cajaTransparente');
    viajeElemento.classList.add('flexItem', !index ? 'flexItemPrincipal' : 'flexItemSecundario');
    viajeElemento.appendChild(contenedorInterior);
    contenedorInterior.appendChild(viajeFigure);
    viajeFigure.appendChild(viajeImagen);
    viajeImagen.src = viaje.imgSrc;
    viajeImagen.alt = viaje.pais;
    viajeFigure.appendChild(viajeCaption);
    viajeCaption.appendChild(viajeCaptionLabel);
    viajeCaptionLabel.classList.add('negrita');
    viajeCaptionLabel.appendChild(document.createTextNode('Título'));
    viajeCaption.appendChild(document.createTextNode(`: ${viaje.pais}`));
    contenedorInterior.appendChild(viajeDescripcionExtendida);
    viajeDescripcionExtendida.classList.add('cursiva');
    viajeDescripcionExtendida.appendChild(viajeDescripcionExtendidaLabel);
    viajeDescripcionExtendidaLabel.classList.add('cursiva');
    viajeDescripcionExtendidaLabel.classList.add('negrita');
    viajeDescripcionExtendidaLabel.appendChild(document.createTextNode('Descripción'));
    viajeDescripcionExtendida.appendChild(document.createTextNode(`: ${viaje.descripcion}`));

    fragmento.appendChild(viajeElemento);
  });

  elementoPadre.appendChild(fragmento);

  return viajesFiltrados.length;
};

/**
 * Función de ejecución principal.
 */
(() => {
  const viajes = [
    {
      imgSrc: 'assets/images/viajes/viajes-1.jpg',
      pais: 'Cuba',
      descripcion: 'En Varadero encontrarás las mejores playas cristalinas.',
      tags: ['todas', 'playa', 'tropical', 'costa', 'sol', 'calor'],
    }, {
      imgSrc: 'assets/images/viajes/viajes-2.jpg',
      pais: 'Maldivas',
      descripcion: 'Disfruta de los mejores atolones del mundo.',
      tags: ['todas', 'playa', 'tropical', 'costa', 'atolón', 'sol', 'calor'],
    }, {
      imgSrc: 'assets/images/viajes/viajes-3.jpg',
      pais: 'Múltiples destinos',
      descripcion: 'Si no te decides que país quieres visitar hay disponibles viajes por varios de ellos a la vez.',
      tags: ['todas', 'letreros'],
    }, {
      imgSrc: 'assets/images/viajes/viajes-4.jpg',
      pais: 'España',
      descripcion: 'Sevilla tiene un color especial.',
      tags: ['todas', 'ciudad', 'sol', 'calor', 'histórico'],
    }, {
      imgSrc: 'assets/images/viajes/viajes-5.jpg',
      pais: 'España',
      descripcion: 'La misma plaza desde otro lado, o quizás es Naboo.',
      tags: ['todas', 'ciudad', 'sol', 'calor', 'histórico'],
    }, {
      imgSrc: 'assets/images/viajes/viajes-6.jpg',
      pais: 'España',
      descripcion: 'Paseo del Arañón.',
      tags: ['todas', 'costa', 'frio'],
    }, {
      imgSrc: 'assets/images/viajes/viajes-7.jpg',
      pais: 'España',
      descripcion: 'Castillo de la Yedra.',
      tags: ['todas', 'histórico', 'sol', 'calor'],
    },
  ];
  const botonesFiltrado = document.querySelector('#botonesFiltrado');

  document.addEventListener('click', ev => {
    /*
      Como uso un único listener general, no secciono cada parte en funciones
      distintas ya que no va a existir reuso de código
    */

    /* Click sobre cualquier tag no pulsado actualmente */
    {
      const botonPulsado = ev.target.closest('#botonesFiltrado>button:not(.pulsado)');
      if (botonPulsado) {
        const botonPulsadoAnterior = document.querySelector('#botonesFiltrado>button.pulsado');
        const pluralSingular = document.querySelectorAll('#infoDeFiltrado>.pluralSingular');
        const numViajesFiltradosNumber = mostrarViajesConTag(viajes, botonPulsado.textContent, document.querySelector('#galeriaViajes'))

        if (!botonPulsadoAnterior) {
          const infoDeUso = document.querySelector('#infoDeUso');
          const infoDeFiltrado = document.querySelector('#infoDeFiltrado');

          infoDeUso.classList.toggle('displayNone');
          infoDeFiltrado.classList.toggle('displayNone');
        }
        else
          botonPulsadoAnterior.classList.remove('pulsado');
        botonPulsado.classList.add('pulsado');
        document.querySelector('#numViajesFiltrados').textContent = numViajesFiltradosNumber;
        if (numViajesFiltradosNumber === 1) {
          pluralSingular[0].textContent = 'ha';
          pluralSingular[1].textContent = 'viaje';
        } else {
          pluralSingular[0].textContent = 'han';
          pluralSingular[1].textContent = 'viajes';
        }
        document.querySelector('#etiquetaFiltrada').textContent = botonPulsado.textContent;
        ev.target.closest('main').scrollIntoView({ behavior: 'smooth' });
      }
    }

    /*
      Click sobre cualquier elemento que tengo algún antecesor siendo un div con
      clase flexItem pero no flexItemPrincipal e hijo directo de galeriaViajes
    */
    {
      const flexItemPulsado = ev.target.closest('#galeriaViajes>div.flexItem:not(.flexItemPrincipal)');
      if (flexItemPulsado) {
        const flexItemPrincipal = document.querySelector('#galeriaViajes>.flexItemPrincipal');

        flexItemPrincipal.classList.remove('flexItemPrincipal');
        flexItemPrincipal.classList.add('flexItemSecundario');
        flexItemPulsado.classList.add('flexItemPrincipal');
        flexItemPulsado.classList.remove('flexItemSecundario');
        flexItemPulsado.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });

  generarBotonesDesdeTags(generarTagsDesdeViajes(viajes, 'todas'), botonesFiltrado);
})();
