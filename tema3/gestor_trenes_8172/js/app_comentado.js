"use strict";

// 1. IMPORTAR CONSTANTES

// Importamos las constantes que tenemos guardadas
// en el archivo constantes.js.

import {
  CLAVE_TRENES, // Nombre de la clave de localStorage.
  TIPOS_TREN, // Array con los tipos de trenes.
  ESTACIONES, // Array con los nombres de las estaciones.
  MATRIZ_DISTANCIAS, // Matriz con las distancias entre estaciones.
  EVENTOS, // Array con los posibles eventos aleatorios.
} from "./constantes.js";

// 2. RECOGER ELEMENTOS DEL HTML

// Recogemos el formulario donde registramos los trenes.

const formularioTren = document.getElementById("formularioTren");

// Recogemos los campos del formulario.

const nombre = document.getElementById("nombre");
const tipo = document.getElementById("tipo");
const velocidad = document.getElementById("velocidad");

// Elemento donde mostraremos los mensajes del registro.

const mensajeRegistro = document.getElementById("mensajeRegistro");

// Recogemos los elementos del simulador.

const origen = document.getElementById("origen");
const destino = document.getElementById("destino");
const trenSeleccionado = document.getElementById("trenSeleccionado");

const botonSimular = document.getElementById("simular");

const resultadoViaje = document.getElementById("resultadoViaje");

// Recogemos los elementos del listado y del buscador.

const busqueda = document.getElementById("busqueda");

const botonBuscar = document.getElementById("buscar");
const botonMostrarTodos = document.getElementById("mostrarTodos");

const listaTrenes = document.getElementById("listaTrenes");

const botonBorrarTodos = document.getElementById("borrarTodos");

// 3. RECUPERAR LOS TRENES

// Creamos el array trenes llamando a obtenerTrenes().
// Si hay trenes guardados, los recuperamos.
// Si no hay datos, obtenemos un array vacío.

let trenes = obtenerTrenes();

// 4. INICIALIZAR LA APLICACIÓN

// Ejecutamos estas funciones al abrir la página.

// Cargamos los tipos de tren en su selector.
cargarTipos();

// Cargamos las estaciones en los selectores de origen y destino.
cargarEstaciones();

// Mostramos los trenes guardados y actualizamos el selector.
actualizarPantalla();

// 5. EVENTOS

// Cuando se envía el formulario de registro,
// evitamos que se recargue la página y añadimos el tren.

formularioTren.addEventListener("submit", function (evento) {
  evento.preventDefault();

  añadirTren();
});

// Cuando pulsamos el botón de simular,
// ejecutamos la función simularViaje().

botonSimular.addEventListener("click", function () {
  simularViaje();
});

// Cuando pulsamos el botón de buscar,
// ejecutamos la función buscarTrenes().

botonBuscar.addEventListener("click", function () {
  buscarTrenes();
});

// Cuando pulsamos mostrar todos,
// limpiamos el buscador y mostramos el array completo.

botonMostrarTodos.addEventListener("click", function () {
  busqueda.value = "";

  mostrarTrenes(trenes);
});

// Cuando pulsamos borrar todos,
// ejecutamos la función que elimina los trenes.

botonBorrarTodos.addEventListener("click", function () {
  borrarTodosLosTrenes();
});

// 6. AÑADIR UN TREN

function añadirTren() {
  // Recogemos los datos escritos o seleccionados
  // en el formulario.

  let nombreTren = nombre.value.trim();

  let tipoTren = tipo.value;

  let velocidadTren = Number(velocidad.value);

  // Comprobamos que el nombre no esté vacío.

  if (nombreTren === "") {
    mensajeRegistro.textContent = "El nombre es obligatorio";

    return; // Detenemos la función si hay un error.
  }

  // Comprobamos que la velocidad esté entre 10 y 300.

  if (velocidadTren < 10 || velocidadTren > 300) {
    mensajeRegistro.textContent = "La velocidad debe estar entre 10 y 300 km/h";

    return;
  }

  // Creamos un objeto con todos los datos del nuevo tren.

  let tren = {
    nombre: nombreTren,

    tipo: tipoTren,

    velocidad: velocidadTren,

    // Obtenemos la fecha actual en formato español.
    fechaAlta: new Date().toLocaleDateString("es-ES"),
  };

  // Añadimos el objeto al final del array trenes.

  trenes.push(tren);

  // Guardamos el array actualizado en localStorage.

  guardarTrenes();

  // Actualizamos el listado y el selector de trenes.

  actualizarPantalla();

  // Mostramos un mensaje de confirmación.

  mensajeRegistro.textContent = "Tren añadido correctamente";

  // Limpiamos los campos del formulario.

  formularioTren.reset();
}

// 7. OBTENER LOS TRENES DE LOCALSTORAGE

function obtenerTrenes() {
  // Recuperamos los datos guardados utilizando la clave.

  let datos = localStorage.getItem(CLAVE_TRENES);

  // Si no existen datos guardados, devolvemos un array vacío.

  if (datos === null) {
    return [];
  }

  // Convertimos el texto recuperado en un array de JavaScript.

  return JSON.parse(datos);
}

// 8. GUARDAR LOS TRENES EN LOCALSTORAGE

function guardarTrenes() {
  // Guardamos el array de trenes.
  // JSON.stringify() convierte el array en texto.

  localStorage.setItem(CLAVE_TRENES, JSON.stringify(trenes));
}

// 9. CARGAR LOS TIPOS DE TREN

function cargarTipos() {
  // Vaciamos el selector para evitar opciones duplicadas.

  tipo.innerHTML = "";

  // Recorremos el array de tipos de tren.

  for (let tipoTren of TIPOS_TREN) {
    // Creamos una nueva opción HTML.

    let opcion = document.createElement("option");

    // Asignamos el valor y el texto de la opción.

    opcion.value = tipoTren;

    opcion.textContent = tipoTren;

    // Introducimos la opción dentro del selector.

    tipo.appendChild(opcion);
  }
}

// 10. CARGAR LAS ESTACIONES

function cargarEstaciones() {
  // Vaciamos los dos selectores.

  origen.innerHTML = "";

  destino.innerHTML = "";

  // Recorremos el array de estaciones.

  for (let estacion of ESTACIONES) {
    // Creamos una opción para el selector de origen.

    let opcionOrigen = document.createElement("option");

    opcionOrigen.value = estacion;

    opcionOrigen.textContent = estacion;

    origen.appendChild(opcionOrigen);

    // Creamos otra opción para el selector de destino.

    let opcionDestino = document.createElement("option");

    opcionDestino.value = estacion;

    opcionDestino.textContent = estacion;

    destino.appendChild(opcionDestino);
  }

  // Establecemos las estaciones seleccionadas inicialmente.

  origen.value = "Knapford";

  destino.value = "Sodor Central";
}

// 11. CARGAR EL SELECTOR DE TRENES

function cargarSelectTrenes() {
  // Limpiamos el selector antes de introducir los trenes.

  trenSeleccionado.innerHTML = "";

  // Comprobamos si el array está vacío.

  if (trenes.length === 0) {
    // Creamos una opción indicando que no hay trenes.

    let opcion = document.createElement("option");

    opcion.value = "";

    opcion.textContent = "No hay trenes registrados";

    trenSeleccionado.appendChild(opcion);

    return; // No continuamos porque no hay trenes.
  }

  // Recorremos todos los trenes mediante un bucle for.

  for (let i = 0; i < trenes.length; i++) {
    // Creamos una opción HTML.

    let opcion = document.createElement("option");

    // Guardamos la posición del tren como valor.

    opcion.value = i;

    // Mostramos el nombre del tren en el selector.

    opcion.textContent = trenes[i].nombre;

    // Añadimos la opción al selector.

    trenSeleccionado.appendChild(opcion);
  }
}

// 12. MOSTRAR LOS TRENES

function mostrarTrenes(lista) {
  // Limpiamos el contenido anterior del listado.

  listaTrenes.innerHTML = "";

  // Comprobamos si la lista está vacía.

  if (lista.length === 0) {
    listaTrenes.textContent = "No hay trenes";

    return;
  }

  // Recorremos los trenes que recibimos como parámetro.

  for (let tren of lista) {
    // Creamos una tarjeta HTML de tipo article.

    let tarjeta = document.createElement("article");

    // Añadimos la clase CSS tren.

    tarjeta.classList.add("tren");

    // Introducimos los datos del tren dentro de la tarjeta.
    // Las ${} permiten introducir variables en una plantilla literal.

    tarjeta.innerHTML = `
            <h3>${tren.nombre}</h3>

            <p><strong>Tipo:</strong> ${tren.tipo}</p>

            <p><strong>Velocidad:</strong> ${tren.velocidad} km/h</p>

            <p><strong>Fecha de alta:</strong> ${tren.fechaAlta}</p>
        `;

    // Añadimos la tarjeta al contenedor del listado.

    listaTrenes.appendChild(tarjeta);
  }
}

// 13. BUSCAR TRENES

function buscarTrenes() {
  // Recogemos el texto del buscador.
  // trim() elimina espacios sobrantes.
  // toLowerCase() convierte el texto a minúsculas.

  let texto = busqueda.value.trim().toLowerCase();

  // Si el buscador está vacío, mostramos todos los trenes.

  if (texto === "") {
    mostrarTrenes(trenes);

    return;
  }

  // filter() crea un nuevo array con los trenes
  // que cumplen la condición de búsqueda.

  let encontrados = trenes.filter(function (tren) {
    // Convertimos el nombre y el tipo a minúsculas.

    let nombreTren = tren.nombre.toLowerCase();

    let tipoTren = tren.tipo.toLowerCase();

    // Comprobamos si el texto aparece en el nombre O en el tipo.
    // includes() comprueba si un texto contiene otro.

    return nombreTren.includes(texto) || tipoTren.includes(texto);
  });

  // Mostramos únicamente los trenes encontrados.

  mostrarTrenes(encontrados);
}

// 14. SIMULAR UN VIAJE

function simularViaje() {
  // Primero comprobamos que haya trenes registrados.

  if (trenes.length === 0) {
    resultadoViaje.innerHTML = "<p>Primero debes registrar un tren</p>";

    return;
  }

  // Recogemos las estaciones seleccionadas.

  let estacionOrigen = origen.value;

  let estacionDestino = destino.value;

  // Comprobamos que el origen y el destino sean diferentes.

  if (estacionOrigen === estacionDestino) {
    resultadoViaje.innerHTML = "<p>Origen y destino deben ser diferentes</p>";

    return;
  }

  // Obtenemos la posición del tren seleccionado.

  let indiceTren = Number(trenSeleccionado.value);

  // Recuperamos el objeto del tren utilizando su posición.

  let tren = trenes[indiceTren];

  // Calculamos la distancia entre las dos estaciones.

  let distancia = calcularDistancia(estacionOrigen, estacionDestino);

  // Calculamos el tiempo estimado en minutos.
  // Distancia / velocidad da horas.
  // Multiplicamos por 60 para convertirlas en minutos.
  // Math.round() redondea el resultado.

  let tiempoEstimado = Math.round((distancia / tren.velocidad) * 60);

  // Generamos un evento aleatorio del array EVENTOS.

  let evento = generarEventoAleatorio();

  // Sumamos el retraso al tiempo estimado.

  let tiempoTotal = tiempoEstimado + evento.retraso;

  // Creamos una variable vacía para mostrar el retraso.

  let textoRetraso = "";

  // Si el evento tiene retraso, añadimos los minutos.

  if (evento.retraso > 0) {
    textoRetraso = " (+" + evento.retraso + " min)";
  }

  // Construimos el resultado del viaje utilizando HTML.

  resultadoViaje.innerHTML = `
        <h3>
            Viaje de ${estacionOrigen}
            a ${estacionDestino}
        </h3>

        <p>
            <strong>Tren:</strong>
            ${tren.nombre}
            (${tren.tipo}, ${tren.velocidad} km/h)
        </p>

        <p>
            <strong>Distancia:</strong>
            ${distancia} km
        </p>

        <p>
            <strong>Tiempo estimado:</strong>
            ${tiempoEstimado} minutos
        </p>

        <p class="evento">
            ${evento.texto}${textoRetraso}
        </p>

        <p>
            <strong>Tiempo total:</strong>
            ${tiempoTotal} minutos
        </p>
    `;
}

// 15. GENERAR UN EVENTO ALEATORIO

function generarEventoAleatorio() {
  // Generamos una posición aleatoria entre 0
  // y la última posición del array EVENTOS.

  let posicion = Math.floor(Math.random() * EVENTOS.length);

  // Devolvemos el objeto que está en esa posición.

  return EVENTOS[posicion];
}

// 16. CALCULAR LA DISTANCIA ENTRE ESTACIONES

function calcularDistancia(estacionOrigen, estacionDestino) {
  // Buscamos la posición de la estación de origen
  // dentro del array ESTACIONES.

  let indiceOrigen = ESTACIONES.indexOf(estacionOrigen);

  // Buscamos la posición de la estación de destino.

  let indiceDestino = ESTACIONES.indexOf(estacionDestino);

  // Creamos una copia de la matriz de distancias.
  // map() recorre cada fila y crea otra matriz.
  // El segundo map() recorre cada valor de cada fila.
  // Sustituimos null por Infinity para indicar
  // que no existe una conexión directa.

  let distancias = MATRIZ_DISTANCIAS.map(function (fila) {
    return fila.map(function (valor) {
      if (valor === null) {
        return Infinity;
      }

      return valor;
    });
  });

  // ALGORITMO FLOYD-WARSHALL
  // Busca las distancias más cortas entre estaciones.
  // Probamos todas las estaciones como posibles intermedias.

  // Primer bucle: selecciona la estación intermedia.

  for (let intermedia = 0; intermedia < ESTACIONES.length; intermedia++) {
    // Segundo bucle: selecciona la estación de inicio.

    for (let inicio = 0; inicio < ESTACIONES.length; inicio++) {
      // Tercer bucle: selecciona la estación de destino.

      for (let fin = 0; fin < ESTACIONES.length; fin++) {
        // Calculamos cuánto costaría ir desde el inicio
        // hasta la estación intermedia y después hasta el final.

        let nuevaDistancia =
          distancias[inicio][intermedia] + distancias[intermedia][fin];

        // Comparamos la nueva distancia con la que
        // ya tenemos guardada entre inicio y fin.

        if (nuevaDistancia < distancias[inicio][fin]) {
          // Si el nuevo recorrido es más corto,
          // sustituimos la distancia anterior.

          distancias[inicio][fin] = nuevaDistancia;
        }
      }
    }
  }

  // Devolvemos la distancia mínima entre el origen y el destino.

  return distancias[indiceOrigen][indiceDestino];
}

// 17. BORRAR TODOS LOS TRENES

function borrarTodosLosTrenes() {
  // Vaciamos el array de trenes.

  trenes = [];

  // Eliminamos la clave de trenes de localStorage.

  localStorage.removeItem(CLAVE_TRENES);

  // Limpiamos el resultado de la última simulación.

  resultadoViaje.innerHTML = "";

  // Mostramos un mensaje de confirmación.

  mensajeRegistro.textContent = "Todos los trenes han sido borrados";

  // Actualizamos el listado y el selector.

  actualizarPantalla();
}

// 18. ACTUALIZAR LA PANTALLA

function actualizarPantalla() {
  // Mostramos todos los trenes registrados.

  mostrarTrenes(trenes);

  // Actualizamos el selector para poder elegir un tren.

  cargarSelectTrenes();
}
