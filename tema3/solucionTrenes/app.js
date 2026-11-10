
// 1. IMPORTAR CONSTANTES
import {
  CLAVE_TRENES,
  ESTACIONES,
  MATRIZ_DISTANCIAS,
  RUTAS,
  EVENTOS,
} from "./constantes.js";


// 2. VARIABLES

// Recuperamos los trenes guardados.

let trenes = leerTrenes();

// 3. ELEMENTOS DEL HTML


const formularioTren = document.getElementById("formularioTren");

const nombre = document.getElementById("nombre");
const tipo = document.getElementById("tipo");
const velocidad = document.getElementById("velocidad");

const origen = document.getElementById("origen");
const destino = document.getElementById("destino");
const trenViaje = document.getElementById("trenViaje");

const botonSimular = document.getElementById("botonSimular");
const resultadoViaje = document.getElementById("resultadoViaje");

const buscar = document.getElementById("buscar");
const botonBuscar = document.getElementById("botonBuscar");

const listaTrenes = document.getElementById("listaTrenes");
const botonBorrar = document.getElementById("botonBorrar");


// 4. LEER LOS TRENES


function leerTrenes() {
  let datos = localStorage.getItem(CLAVE_TRENES);

  if (datos === null) {
    return [];
  }

  return JSON.parse(datos);
}


// 5. GUARDAR LOS TRENES


function guardarTrenes() {
  localStorage.setItem(CLAVE_TRENES, JSON.stringify(trenes));
}


// 6. CARGAR LAS ESTACIONES


function cargarEstaciones() {
  for (let i = 0; i < ESTACIONES.length; i++) {
    let opcionOrigen = document.createElement("option");

    opcionOrigen.value = ESTACIONES[i];
    opcionOrigen.textContent = ESTACIONES[i];

    origen.appendChild(opcionOrigen);

    let opcionDestino = document.createElement("option");

    opcionDestino.value = ESTACIONES[i];
    opcionDestino.textContent = ESTACIONES[i];

    destino.appendChild(opcionDestino);
  }

  // Seleccionamos estaciones diferentes inicialmente.

  destino.selectedIndex = 1;
}


// 7. AÑADIR UN TREN


function anadirTren(evento) {
  // Evitamos que se recargue la página.

  evento.preventDefault();

  // Recogemos los datos.

  let nombreTren = nombre.value.trim();

  let tipoTren = tipo.value;

  let velocidadTren = Number(velocidad.value);

  // Comprobamos el nombre.

  if (nombreTren === "") {
    
    return;
  }

  // Comprobamos la velocidad.

  if (velocidadTren < 10 || velocidadTren > 300) {

    return;
  }

  // Obtenemos la fecha actual.

  let fecha = new Date().toLocaleDateString("es-ES");

  // Creamos el objeto.

  let nuevoTren = {
    nombre: nombreTren,

    tipo: tipoTren,

    velocidad: velocidadTren,

    fechaAlta: fecha,
  };

  // Añadimos el tren al array.

  trenes.push(nuevoTren);

  // Guardamos en localStorage.

  guardarTrenes();

  // Actualizamos el listado y el selector.

  mostrarTrenes(buscar.value);

  actualizarSelectorTrenes();

  // Limpiamos el formulario.

  formularioTren.reset();
}


// 8. ACTUALIZAR SELECTOR DE TRENES


function actualizarSelectorTrenes() {
  trenViaje.innerHTML = "";

  // Si no hay trenes registrados.

  if (trenes.length === 0) {
    let opcion = document.createElement("option");

    opcion.value = "";

    opcion.textContent = "No hay trenes registrados";

    trenViaje.appendChild(opcion);

    return;
  }

  // Recorremos el array de trenes.

  for (let i = 0; i < trenes.length; i++) {
    let opcion = document.createElement("option");

    opcion.value = i;

    opcion.textContent = trenes[i].nombre + " (" + trenes[i].tipo + ")";

    trenViaje.appendChild(opcion);
  }
}


// 9. MOSTRAR LOS TRENES


function mostrarTrenes(filtro = "") {
  // Limpiamos el listado anterior.

  listaTrenes.innerHTML = "";

  let encontrados = 0;

  // Recorremos todos los trenes.

  for (let i = 0; i < trenes.length; i++) {
    let tren = trenes[i];

    // Pasamos los datos a minúsculas.

    let nombreMinusculas = tren.nombre.toLowerCase();

    let tipoMinusculas = tren.tipo.toLowerCase();

    let textoBuscar = filtro.toLowerCase().trim();

    // Comprobamos si coincide el nombre o el tipo.

    if (
      nombreMinusculas.includes(textoBuscar) ||
      tipoMinusculas.includes(textoBuscar)
    ) {
      let tarjeta = document.createElement("div");

      tarjeta.classList.add("tarjeta");

      tarjeta.textContent =
        " " +
        tren.nombre +
        "\nTipo: " +
        tren.tipo +
        "\nVelocidad: " +
        tren.velocidad +
        " km/h" +
        "\nFecha de alta: " +
        tren.fechaAlta;

      // Añadimos la tarjeta al listado.

      listaTrenes.appendChild(tarjeta);

      encontrados++;
    }
  }

  // Si no hay resultados.

  if (encontrados === 0) {
    listaTrenes.textContent = "No se encontraron trenes.";
  }
}


// 10. BUSCAR TRENES


function buscarTrenes() {
  let texto = buscar.value;

  mostrarTrenes(texto);
}


// 11. BORRAR TODOS LOS TRENES


function borrarTrenes() {
  trenes = [];

  // Actualizamos localStorage.

  guardarTrenes();

  // Actualizamos la página.

  mostrarTrenes();

  actualizarSelectorTrenes();

  // Limpiamos los campos.

  buscar.value = "";

  resultadoViaje.textContent = "";
}


// 12. CALCULAR DISTANCIA


function calcularDistancia(estacionOrigen, estacionDestino) {
  let distancia = MATRIZ_DISTANCIAS[estacionOrigen][estacionDestino];

  return distancia;
}


// 13. CALCULAR TIEMPO


function calcularTiempo(distancia, velocidadTren) {
  let tiempo = (distancia / velocidadTren) * 60;

  return Math.round(tiempo);
}


// 14. GENERAR EVENTO ALEATORIO


function generarEvento() {
  let posicion = Math.floor(Math.random() * EVENTOS.length);

  return EVENTOS[posicion];
}


// 15. SIMULAR VIAJE


function simularViaje() {
  // Recogemos las estaciones.

  let estacionOrigen = origen.value;

  let estacionDestino = destino.value;

  // Comprobamos que sean diferentes.

  if (estacionOrigen === estacionDestino) {
    alert("El origen y el destino deben ser diferentes.");

    return;
  }

  // Comprobamos que existan trenes.

  if (trenes.length === 0) {
    alert("Primero debes registrar un tren.");

    return;
  }

  // Recogemos el tren seleccionado.

  let posicionTren = Number(trenViaje.value);

  let trenSeleccionado = trenes[posicionTren];

  // Calculamos la distancia.

  let distancia = calcularDistancia(estacionOrigen, estacionDestino);

  // Calculamos el tiempo estimado.

  let tiempoEstimado = calcularTiempo(distancia, trenSeleccionado.velocidad);

  // Generamos el evento aleatorio.

  let evento = generarEvento();

  // Calculamos el tiempo total.

  let tiempoTotal = tiempoEstimado + evento.retraso;

  // Comprobamos si existe una ruta intermedia.

  let ruta;

  if (RUTAS[estacionOrigen] !== undefined) {
    ruta = RUTAS[estacionOrigen][estacionDestino];
  }

  // Preparamos el resultado.

  let resultado =
    "🚂 Viaje de " +
    estacionOrigen +
    " a " +
    estacionDestino +
    "\n\nTren: " +
    trenSeleccionado.nombre +
    " (" +
    trenSeleccionado.tipo +
    ", " +
    trenSeleccionado.velocidad +
    " km/h)" +
    "\n\nDistancia: " +
    distancia +
    " km";

  // Añadimos la ruta si existe.

  if (ruta !== undefined) {
    resultado += "\nRuta: " + ruta;
  }

  resultado += "\n\nTiempo estimado: " + tiempoEstimado + " minutos";

  // Mostramos el evento.

  resultado += "\n\n" + evento.mensaje;

  // Si existe retraso, indicamos los minutos.

  if (evento.retraso > 0) {
    resultado += " (+" + evento.retraso + " min)";
  }

  // Añadimos el tiempo total.

  resultado += "\n\nTiempo total: " + tiempoTotal + " minutos";

  // Mostramos el resultado.

  resultadoViaje.textContent = resultado;

  // Cambiamos el estilo según el evento.

  if (evento.retraso > 0) {
    resultadoViaje.className = "retraso";
  } else {
    resultadoViaje.className = "sinIncidente";
  }
}


// 16. EVENTOS


// Añadir tren.

formularioTren.addEventListener("submit", anadirTren);

// Buscar trenes.

botonBuscar.addEventListener("click", buscarTrenes);

// Borrar todos los trenes.

botonBorrar.addEventListener("click", borrarTrenes);

// Simular viaje.

botonSimular.addEventListener("click", simularViaje);


// 17. INICIALIZAR APLICACIÓN


// Cargamos las estaciones.

cargarEstaciones();

// Mostramos los trenes guardados.

mostrarTrenes();

// Actualizamos el selector de trenes.

actualizarSelectorTrenes();
