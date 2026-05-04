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
  return Array.from(tags).sort((a, b) => a === primerTag ? -1 : b === primerTag ? 1 : a > b);
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
    nuevoButton.classList.add('tag', 'cajaTransparente');
    nuevoButton.appendChild(document.createTextNode(tag));
  });

  elementoPadre.appendChild(fragmento);
};

/**
 * Genera un elemento de galería que corresponde a un viaje.
 * @param {String} viaje - El objeto viaje a mostrar
 * @param {Boolean} esPrincipal - Determina si el elemento generado se considera principal a efectos de estilo (clase flexItemPrincipal o flexItemSecundario)
 * @returns
 */
const generarViajeElemento = (viaje, esPrincipal = false) => {
  const viajeElemento = document.createElement('div');
  const contenedorInterior = document.createElement('div');
  const viajeFigure = document.createElement('figure');
  const viajeImagen = document.createElement('img');
  const viajeCaption = document.createElement('figcaption');
  const viajeCaptionLabel = document.createElement('span');
  const viajeDescripcionExtendida = document.createElement('p');
  const viajeDescripcionExtendidaLabel = document.createElement('span');

  viajeElemento.classList.add('cajaTransparente', 'flexItem', esPrincipal ? 'flexItemPrincipal' : 'flexItemSecundario');
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
  viajeDescripcionExtendidaLabel.classList.add('cursiva', 'negrita');
  viajeDescripcionExtendidaLabel.appendChild(document.createTextNode('Descripción'));
  viajeDescripcionExtendida.appendChild(document.createTextNode(`: ${viaje.descripcion}`));

  return viajeElemento;
};

/**
 * Filtra los viajes por el tag añdiéndolos a los elementoPadres devolviendo la
 * cantidad de viajes filtrados.
 * @param {[]} viajes - Array con los viajes a filtrar.
 * @param {String} tag - Tag por el que filtrar los viajes.
 * @param {Element} elementoPadrePrincipal - Elemento al que colocar el viaje principal.
 * @param {Element} elementoPadreSecundario - Elemento al que colocar los viajes secundarios.
 * @returns {Number} - Cantidad de viajes filtrados.
 */
const mostrarViajesConTag = (viajes, tag, elementoPadrePrincipal, elementoPadreSecundario) => {
  const fragmento = document.createDocumentFragment();
  const viajesFiltrados = viajes.filter(viaje => viaje.tags.includes(tag));
  const numViajesFiltrados = viajesFiltrados.length;
  /*
    Para no favorecer a ninguno de los viajes elijo aleatoriamente el que se
    mostrará como principal
  */
  const indiceViajeAleatorio = Math.floor(Math.random() * numViajesFiltrados);

  elementoPadrePrincipal.replaceChildren(generarViajeElemento(viajesFiltrados[indiceViajeAleatorio], true));

  viajesFiltrados.filter((viaje, index) => index != indiceViajeAleatorio).forEach((viaje) => fragmento.appendChild(generarViajeElemento(viaje)));
  elementoPadreSecundario.replaceChildren(fragmento);

  return numViajesFiltrados;
};

/**
 * Actualiza la información de filtrado sobre el elemento infoDeFiltrado.
 * @param {Number} numViajesFiltrados - Cantidad de viajes filtrados.
 * @param {String} tag - Etiqueta por la que se ha filtrado.
 * @param {Element} infoDeFiltrado - Elemento al que se aplicará la actiualización.
 */
const actualizarInfoDeFiltrado = (numViajesFiltrados, tag, infoDeFiltrado) => {
  const fragmento = document.createDocumentFragment();
  const tagEnNegrita = document.createElement('span');

  tagEnNegrita.classList.add('negrita');
  tagEnNegrita.appendChild(document.createTextNode(tag));

  if (!numViajesFiltrados) {
    fragmento.appendChild(document.createTextNode('No se han encontrado viajes con el tag '));
    fragmento.appendChild(tagEnNegrita);
  } else {
    const cantidadEnNegrita = document.createElement('span');
    const pluralSingular = ['', ''];

    cantidadEnNegrita.classList.add('negrita');
    cantidadEnNegrita.appendChild(document.createTextNode(numViajesFiltrados));

    if (numViajesFiltrados > 1)
      [pluralSingular[0], pluralSingular[1]] = ['n', 's'];

    fragmento.appendChild(document.createTextNode(`Se ha${pluralSingular[0]} encontrado `));
    fragmento.appendChild(cantidadEnNegrita);
    fragmento.appendChild(document.createTextNode(` viaje${pluralSingular[1]} con el tag `));
    fragmento.appendChild(tagEnNegrita);
  }

  infoDeFiltrado.replaceChildren(fragmento);
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
      const botonPulsado = ev.target.closest('#botonesFiltrado>.tag:not(.pulsado)');
      if (botonPulsado) {
        {
          const botonPulsadoAnterior = document.querySelector('#botonesFiltrado>.tag.pulsado');
          if (botonPulsadoAnterior)
            botonPulsadoAnterior.classList.remove('pulsado');
        }

        const tag = botonPulsado.textContent;
        const numViajesFiltrados = mostrarViajesConTag(viajes, tag, document.querySelector('#viajePrincipal'), document.querySelector('#galeriaViajesRelacionados'))
        const tituloViajesRelacionados = document.querySelector('#tituloViajesRelacionados')

        botonPulsado.classList.add('pulsado');

        actualizarInfoDeFiltrado(numViajesFiltrados, tag, document.querySelector('#infoDeFiltrado'));

        if (numViajesFiltrados > 1)
          tituloViajesRelacionados.classList.remove('displayNone');
        else
          tituloViajesRelacionados.classList.add('displayNone');

        ev.target.closest('main').scrollIntoView({ behavior: 'smooth' });
      }
    }

    /*
      Click sobre cualquier elemento que sea de la clase flexItemSecundario
      dentro de galeriaViajes
    */
    // {
    //   const flexItemPulsado = ev.target.closest('#galeriaViajes>.flexItemSecundario');
    //   if (flexItemPulsado) {
    //     const flexItemPrincipal = document.querySelector('#galeriaViajes>.flexItemPrincipal');

    //     flexItemPrincipal.classList.remove('flexItemPrincipal');
    //     flexItemPrincipal.classList.add('flexItemSecundario');
    //     flexItemPulsado.classList.add('flexItemPrincipal');
    //     flexItemPulsado.classList.remove('flexItemSecundario');
    //     flexItemPulsado.scrollIntoView({ behavior: 'smooth' });
    //   }
    // }
  });

  generarBotonesDesdeTags(generarTagsDesdeViajes(viajes, 'todas'), botonesFiltrado);
})();
