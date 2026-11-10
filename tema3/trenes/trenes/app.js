"use strict";

// =====================================================
// 1. ARRAY DE OBJETOS
// =====================================================

// Creamos un array llamado trenes.
// Dentro guardamos varios objetos.
// Cada objeto representa un tren y tiene sus propiedades:
// id, destino, estado y retraso.

let trenes = [
  {
    id: 1,
    destino: "Madrid",
    estado: "puntual",
    retraso: 0,
  },

  {
    id: 2,
    destino: "Barcelona",
    estado: "retrasado",
    retraso: 15,
  },

  {
    id: 3,
    destino: "Bilbao",
    estado: "puntual",
    retraso: 0,
  },

  {
    id: 4,
    destino: "Sevilla",
    estado: "retrasado",
    retraso: 5,
  },
];

// =====================================================
// 2. SELECCIONAR ELEMENTOS DEL HTML
// =====================================================

// Utilizamos getElementById() para seleccionar
// los elementos HTML mediante su atributo id.

// Guardamos cada elemento en una constante para
// poder utilizarlo posteriormente en JavaScript.

const filtroEstado = document.getElementById("filtroEstado");

const buscarId = document.getElementById("buscarId");

const botonBuscar = document.getElementById("botonBuscar");

const botonEvento = document.getElementById("eventoAleatorio");

const listaTrenes = document.getElementById("listaTrenes");

const mensaje = document.getElementById("mensaje");

// =====================================================
// 3. MOSTRAR LOS TRENES INICIALMENTE
// =====================================================

// Llamamos a la función mostrarTrenes().
// Le pasamos el array completo como argumento.
// Así conseguimos que aparezcan todos los trenes
// nada más abrir la página.

mostrarTrenes(trenes);

// =====================================================
// 4. EVENTOS
// =====================================================

// EVENTO DEL FILTRO

// addEventListener() permite detectar acciones
// realizadas por el usuario.

// El evento "change" se ejecuta cuando cambia
// la opción seleccionada en el filtro.

filtroEstado.addEventListener("change", function () {
  // Cuando cambia el filtro, llamamos a la función.
  filtrarTrenes();
});

// EVENTO DEL BOTÓN BUSCAR

// El evento "click" se ejecuta cuando pulsamos
// el botón de búsqueda.

botonBuscar.addEventListener("click", function () {
  // Llamamos a la función que busca un tren por su ID.
  buscarTren();
});

// EVENTO DEL BOTÓN DE EVENTO ALEATORIO

// Cuando pulsamos el botón, se ejecuta
// la función que genera un evento aleatorio.

botonEvento.addEventListener("click", function () {
  generarEventoAleatorio();
});

// =====================================================
// 5. FUNCIÓN PARA MOSTRAR LOS TRENES
// =====================================================

// Recibe un array como parámetro llamado lista.
// Puede recibir todos los trenes o solamente
// los trenes que hayan pasado un filtro.

function mostrarTrenes(lista) {
  // Limpiamos el contenido anterior del listado.
  // Así evitamos que se repitan las tarjetas
  // cada vez que llamamos a esta función.

  listaTrenes.innerHTML = "";

  // Comprobamos si el array está vacío.
  // Si no hay trenes, mostramos un mensaje.

  if (lista.length === 0) {
    listaTrenes.textContent = "No hay trenes";

    // return finaliza la función.
    // No continúa ejecutando el código inferior.

    return;
  }

  // Recorremos todos los elementos del array.
  // "tren" representa cada objeto del array
  // durante cada vuelta del bucle.

  for (let tren of lista) {
    // Creamos un nuevo elemento HTML <div>.
    // Cada tren tendrá su propia tarjeta.

    let tarjeta = document.createElement("div");

    // Introducimos el contenido HTML dentro del div.
    // ${} permite insertar los valores de las propiedades
    // del objeto directamente en la plantilla.

    tarjeta.innerHTML = `
            <h3>Tren ${tren.id}</h3>

            <p>
                Destino: ${tren.destino}
            </p>

            <p>
                Estado: ${tren.estado}
            </p>

            <p>
                Retraso: ${tren.retraso} minutos
            </p>

            <hr>
        `;

    // Añadimos la tarjeta creada al listado del HTML.
    // Cada vuelta del bucle añade una tarjeta nueva.

    listaTrenes.appendChild(tarjeta);
  }
}

// =====================================================
// 6. FUNCIÓN PARA FILTRAR LOS TRENES
// =====================================================

// Esta función permite filtrar los trenes
// según el estado seleccionado por el usuario.

function filtrarTrenes() {
  // Obtenemos el valor seleccionado en el HTML.
  // Por ejemplo: "puntual", "retrasado" o "todos".

  let estadoSeleccionado = filtroEstado.value;

  // Si el usuario selecciona "todos",
  // mostramos el array completo.

  if (estadoSeleccionado === "todos") {
    mostrarTrenes(trenes);

    // Finalizamos la función porque ya hemos
    // mostrado todos los trenes.

    return;
  }

  // filter() crea un nuevo array con los elementos
  // que cumplen la condición indicada.

  // Comparamos el estado de cada tren con el
  // estado seleccionado por el usuario.

  let trenesFiltrados = trenes.filter(function (tren) {
    return tren.estado === estadoSeleccionado;
  });

  // Mostramos solamente los trenes filtrados.

  mostrarTrenes(trenesFiltrados);
}

// =====================================================
// 7. FUNCIÓN PARA BUSCAR UN TREN POR ID
// =====================================================

// Esta función busca un tren concreto
// utilizando su identificador.

function buscarTren() {
  // Obtenemos el valor escrito en el input.
  // Number() convierte el texto en un número.
  // Es importante porque los ID de los objetos
  // también son números.

  let id = Number(buscarId.value);

  // find() busca el primer elemento que cumple
  // la condición indicada.
  // Devuelve el objeto encontrado o undefined
  // si no existe ningún resultado.

  let trenEncontrado = trenes.find(function (tren) {
    return tren.id === id;
  });

  // Comprobamos si no hemos encontrado el tren.

  if (trenEncontrado === undefined) {
    mensaje.textContent = "No existe ese tren";

    // Finalizamos la función si no hay coincidencias.

    return;
  }

  // Si existe el tren, mostramos sus datos.
  // Concatenamos textos (+) con las propiedades
  // del objeto encontrado.

  mensaje.textContent =
    "Tren encontrado: " +
    trenEncontrado.destino +
    " - Retraso: " +
    trenEncontrado.retraso +
    " minutos";

  // Mostramos únicamente el tren encontrado.
  // Lo metemos entre corchetes porque la función
  // mostrarTrenes() espera recibir un array.

  mostrarTrenes([trenEncontrado]);
}

// =====================================================
// 8. FUNCIÓN PARA GENERAR UN EVENTO ALEATORIO
// =====================================================

// Esta función simula un posible incidente
// durante el funcionamiento de los trenes.

function generarEventoAleatorio() {
  // Math.random() genera un número aleatorio
  // entre 0 (incluido) y 1 (sin incluir).

  let numeroAleatorio = Math.random();

  // Si el número generado es menor que 0.3,
  // se produce un incidente.
  // Esto representa una probabilidad del 30%.

  if (numeroAleatorio < 0.3) {
    // Math.random() genera otro número aleatorio.
    // Lo multiplicamos por trenes.length para obtener
    // una posición dentro del array.
    // Math.floor() redondea hacia abajo.

    let posicionAleatoria = Math.floor(Math.random() * trenes.length);

    // Accedemos al tren que se encuentra
    // en la posición aleatoria obtenida.

    let tren = trenes[posicionAleatoria];

    // Modificamos directamente las propiedades
    // del objeto seleccionado.
    // Sumamos 10 minutos al retraso que ya tenía.

    tren.retraso = tren.retraso + 10;

    // Cambiamos el estado del tren a retrasado.

    tren.estado = "retrasado";

    // Mostramos el mensaje del incidente.
    // Concatenamos el ID del tren con el texto.

    mensaje.textContent =
      "🐑 Rebaño de ovejas en la vía del tren " + tren.id + ". +10 minutos.";
  } else {
    // Si el número aleatorio es igual o superior a 0.3,
    // no se produce ningún incidente.

    mensaje.textContent = "No ha ocurrido ningún incidente.";
  }

  // Actualizamos el listado para que aparezcan
  // los posibles cambios de estado y retraso.

  mostrarTrenes(trenes);
}
