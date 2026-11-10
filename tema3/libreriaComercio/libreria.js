// CLAVE_LIBROS es la constante que contiene el nombre de la clave de almacenamiento.
import { CLAVE_LIBROS } from "./constantes.js";

// 1. LEER LOS LIBROS GUARDADOS

function leerLibros() {
  let datos = sessionStorage.getItem(CLAVE_LIBROS);

  // null significa que no hay ningún dato guardado.
  if (datos === null) {
    // [] representa un array vacío.
    return [];
  }

  // Devolvemos los libros recuperados.
  return JSON.parse(datos);
}

// 2. GUARDAR LA LISTA DE LIBROS

function guardarLibros(listaLibros) {
  sessionStorage.setItem(CLAVE_LIBROS, JSON.stringify(listaLibros));
}

// 3. MOSTRAR LOS LIBROS EN LA PÁGINA CONSULTAR

function mostrarLibros() {
  // Llamamos a leerLibros() para recuperar los libros guardados.

  let listaLibros = leerLibros();

  // Buscamos el div donde vamos a mostrar los libros.
  const contenedor = document.getElementById("contenedorLibros");

  // Comprobamos si el contenedor existe.
  if (contenedor === null) {
    return;
  }

  // Lo dejamos vacío para limpiar el contenedor antes de mostrar los libros.
  contenedor.innerHTML = "";

  // Comprobamos si el array tiene cero libros.
  if (listaLibros.length === 0) {
    // Si no hay libros, mostramos un mensaje.
    contenedor.textContent = "Todavía no hay libros guardados.";
  } else {
    // for...of permite recorrer todos los elementos de un array.
    // En cada repetición, libro representa un elemento diferente del array.
    for (let libro of listaLibros) {
      // createElement() crea un nuevo elemento HTML.

      let tarjeta = document.createElement("article");

      tarjeta.textContent =
        "Nombre: " +
        libro.nombre +
        " | Autor: " +
        libro.autor +
        " | Páginas: " +
        libro.numeroPaginas +
        " | Prestado: " +
        (libro.prestado ? "Sí" : "No");

      contenedor.appendChild(tarjeta);
    }
  }
}

// 4. RECUPERAR LOS LIBROS AL CARGAR LA PÁGINA

// Llamamos a leerLibros() para recuperar los libros guardados.
// Así podemos añadir nuevos libros sin perder los anteriores.
let listaLibros = leerLibros();

// 5. DETECTAR CUANDO SE ENVÍA EL FORMULARIO

const formulario = document.getElementById("formulario");

// Comprobamos que el formulario existe.
if (formulario !== null) {
  formulario.addEventListener("submit", function (event) {
    // En este caso evita que el formulario recargue la página.
    event.preventDefault();
    // RECOGEMOS LOS VALORES ESCRITOS POR EL USUARIO.
    const nombre = document.getElementById("idNombre").value;
    const autor = document.getElementById("idAutor").value;
    const numeroPaginas = Number(document.getElementById("idNumPag").value);
    const prestado = document.getElementById("prestado").checked;

    // CREAMOS UN OBJETO CON LOS DATOS DEL LIBRO.

    const libro = {
      nombre: nombre,
      autor: autor,
      numeroPaginas: numeroPaginas,
      prestado: prestado,
    };

    // AÑADIMOS EL NUEVO LIBRO AL ARRAY.

    listaLibros.push(libro);

    // GUARDAMOS EL ARRAY ACTUALIZADO.

    guardarLibros(listaLibros);

    // reset() limpia los campos del formulario.
    
    formulario.reset();
  });
}

// 6. MOSTRAR LOS LIBROS SI ESTAMOS EN CONSULTAR.HTML

mostrarLibros();
