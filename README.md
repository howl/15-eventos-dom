# Práctica de eventos del DOM

## Fases de la práctica

### Array de objetos

El ejercicio parte de un array de objetos que corresponden a una serie de imágenes y presentan la siguiente definición:

```
    {
      src: 'path/a/la/imagen.jpg',
      pais: 'País de donde es la imagen',
      descripcion: 'Una descripción de la imagen.',
      tags: ['etiquetas', 'que', 'categorizan', 'la', 'imagen'],
    },
```

### Botones de etiquetas

La primera parte consiste en recorrer el array de tags contenido en cada uno de los objetos y generar un nuevo array que contenga las etiquetas únicas de todas las imágenes.

Este array de etiquetas únicas ha de ser mostrado como una hilera de botones que nos servirá para filtrar las imágenes que contengan la etiqueta correspondiente al botón que se pulse.

![Listado de etiquetas antes de pulsar alguna](assets/images/readme/tags.png)

### Mostrar las imágenes con la etiqueta pulsada

La siguiente parte consiste en mostrar las imágenes que contienen la etiqueta que se ha pulsado mostrando una de ellas como principal en primer lugar y ocupando siempre el ancho completo.

Después de la imagen principal se mostrará un encabezado que diga 'Imágenes relacionadas' y posteriormente todas las demás imágenes que contienen la etiqueta.

![Imágenes que contienen la etiqueta pulsada](assets/images/readme/tag-click.png)

### Colocar como imagen principal aquella que se pulse

La última parte consiste en hacer que al pulsar en alguna de las imágenes relacionadas, esta se coloque como la imagen principal.

![Imagen principal cambiada por la que se pulsó](assets/images/readme/image-click.png)

## Requisitos
El ejercicio ha de cumplir una serie de condiciones:

- Ha de realizarse en un repositorio Git en una rama distinta a la principal realizando diversos commits en base a según se realiza el ejercicio.
- Usar exclusivamente HTML (utilizando correctamente etiquetas semánticas), CSS (haciendo uso adecuado de selectores) y JavaScript (creando funciones de forma racional).
- Ha de tener un diseño responsive para múltiples dispositivos.