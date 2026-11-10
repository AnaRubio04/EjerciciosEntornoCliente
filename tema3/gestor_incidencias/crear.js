import {
  CLAVE_INCIDENCIAS,
  PENDIENTE,
  CLAVE_SIGUIENTE_ID,
  EN_PROCESO,
  RESUELTA,
} from "./constantes.js";

const formulario = document.getElementById("formulario");
const titulo = document.getElementById("titulo");
const descripcion = document.getElementById("descripcion");
const equipo = document.getElementById("equipo");
const prioridad = document.getElementById("prioridad");
const fecha = document.getElementById("fecha");

const contenedorIncidencias = document.getElementById("contenedorIncidencias");

// ELEMENTOS DE LOS FILTROS
const busqueda = document.getElementById("busqueda");
const filtroPrioridad = document.getElementById("filtroPrioridad");
const filtroEstado = document.getElementById("filtroEstado");
const contador = document.getElementById("contador");

// ELEMENTOS DE LAS ESTADÍSTICAS
const total = document.getElementById("total");
const pendientes = document.getElementById("pendientes");
const enProceso = document.getElementById("enProceso");
const resueltas = document.getElementById("resueltas");

if (formulario !== null) {
  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();
    crearIncidencia();
  });
}

function crearIncidencia() {
  let tituloIncidencia = titulo.value;
  let descripcionIncidencia = descripcion.value;
  let equipoIncidencia = equipo.value;
  let prioridadIncidencia = prioridad.value;
  let fechaIncidencia = fecha.value;
  /**Validar datos */

  /**Obtener incidencias pasadas */
  let incidencias = obtenerIncidencias();

  let incidencia = {
    id: obtenerSiguienteId(),
    titulo: tituloIncidencia,
    descripcion: descripcionIncidencia,
    equipo: equipoIncidencia,
    prioridad: prioridadIncidencia,
    //hay que guardar el estado inicial de la incidencia al crearse
    estado: PENDIENTE,
    fecha: fechaIncidencia,
  };
  incidencias.push(incidencia);
  sessionStorage.setItem(CLAVE_INCIDENCIAS, JSON.stringify(incidencias));
  formulario.reset();
  actualizarEstadisticas();
}
function obtenerIncidencias() {
  let datos = sessionStorage.getItem(CLAVE_INCIDENCIAS);

  if (datos == null) {
    return [];
  }
  return JSON.parse(datos);
}
//poner ids para que no se repitam
function obtenerSiguienteId() {
  let siguienteId = sessionStorage.getItem(CLAVE_SIGUIENTE_ID);

  if (siguienteId === null) {
    siguienteId = 1;
  } else {
    siguienteId = Number(siguienteId);
  }

  sessionStorage.setItem(CLAVE_SIGUIENTE_ID, siguienteId + 1);

  return siguienteId;
}

function mostrarIncidencias() {
  // Recuperamos todas las incidencias guardadas.
  let incidencias = obtenerIncidencias();

  // Aplicar los filtros
  let incidenciasFiltradas = incidencias.filter(function (incidencia) {
    let texto = busqueda.value.toLowerCase();

    let coincideTexto =
      incidencia.titulo.toLowerCase().includes(texto) ||
      incidencia.descripcion.toLowerCase().includes(texto) ||
      incidencia.equipo.toLowerCase().includes(texto);

    let coincidePrioridad =
      filtroPrioridad.value === "" ||
      incidencia.prioridad === filtroPrioridad.value;

    let coincideEstado =
      filtroEstado.value === "" || incidencia.estado === filtroEstado.value;

    return coincideTexto && coincidePrioridad && coincideEstado;
  });

  // Limpiar el listado
  contenedorIncidencias.innerHTML = "";

  // Actualizar contador
  contador.textContent =
    "Mostrando " +
    incidenciasFiltradas.length +
    " de " +
    incidencias.length +
    " incidencias";

  if (incidenciasFiltradas.length === 0) {
    contenedorIncidencias.textContent = "No hay incidencias";
    return;
  }

  for (let incidencia of incidenciasFiltradas) {
    // Creamos la tarjeta.
    let tarjeta = document.createElement("article");

    // Creamos el título.
    let titulo = document.createElement("h3");
    titulo.textContent = incidencia.titulo;

    // Creamos los datos.
    let equipo = document.createElement("p");
    equipo.textContent = "Equipo: " + incidencia.equipo;

    let prioridad = document.createElement("p");
    prioridad.textContent = "Prioridad: " + incidencia.prioridad;

    let estado = document.createElement("p");
    estado.textContent = "Estado: " + incidencia.estado;

    let fecha = document.createElement("p");
    fecha.textContent = "Fecha: " + incidencia.fecha;

    let descripcion = document.createElement("p");
    descripcion.textContent = incidencia.descripcion;

    // BOTÓN PARA PASAR A EN PROCESO.
    let botonProceso = document.createElement("button");
    botonProceso.textContent = "Pasar a en proceso";

    // BOTÓN PARA MARCAR COMO RESUELTA.
    let botonResuelta = document.createElement("button");
    botonResuelta.textContent = "Marcar como resuelta";

    // BOTÓN PARA ELIMINAR.
    let botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar";

    // Añadimos los elementos a la tarjeta.
    tarjeta.appendChild(titulo);
    tarjeta.appendChild(equipo);
    tarjeta.appendChild(prioridad);
    tarjeta.appendChild(estado);
    tarjeta.appendChild(fecha);
    tarjeta.appendChild(descripcion);
    tarjeta.appendChild(botonProceso);
    tarjeta.appendChild(botonResuelta);
    tarjeta.appendChild(botonEliminar);
    botonProceso.addEventListener("click", function () {
      cambiarEstado(incidencia.id, EN_PROCESO);
    });

    botonResuelta.addEventListener("click", function () {
      cambiarEstado(incidencia.id, RESUELTA);
    });

    botonEliminar.addEventListener("click", function () {
      eliminarIncidencia(incidencia.id);
    });

    // Añadimos la tarjeta al contenedor.
    contenedorIncidencias.appendChild(tarjeta);
  }
}

// CAMBIAR ESTADO DE UNA INCIDENCIA

function cambiarEstado(id, nuevoEstado) {
  // Recuperamos las incidencias.
  let incidencias = obtenerIncidencias();

  //Busca un elemento dentro de un array y devuelve su posición.Va recorriendo los objetos del array, uno por uno.
  // Buscamos la incidencia por su ID.
  let posicion = incidencias.findIndex(function (incidencia) {
    return incidencia.id === id;
  });

  // Modificamos su estado.
  //findIndex() devuelve -1 cuando no encuentra ningún elemento.
  if (posicion !== -1) {
    incidencias[posicion].estado = nuevoEstado;
  }

  // Guardamos los cambios.
  sessionStorage.setItem(CLAVE_INCIDENCIAS, JSON.stringify(incidencias));

  // Actualizamos las tarjetas.
  mostrarIncidencias();
}
// ELIMINAR UNA INCIDENCIA

function eliminarIncidencia(id) {
  // Recuperamos las incidencias.
  let incidencias = obtenerIncidencias();

  // Eliminamos la incidencia que tenga ese ID.
  incidencias = incidencias.filter(function (incidencia) {
    return incidencia.id !== id;
  });

  // Guardamos el nuevo array.
  sessionStorage.setItem(CLAVE_INCIDENCIAS, JSON.stringify(incidencias));

  // Actualizamos las tarjetas.
  mostrarIncidencias();
}
mostrarIncidencias();
// EVENTOS DE LOS FILTROS

if (busqueda !== null) {
  busqueda.addEventListener("input", mostrarIncidencias);
}

if (filtroPrioridad !== null) {
  filtroPrioridad.addEventListener("change", mostrarIncidencias);
}

if (filtroEstado !== null) {
  filtroEstado.addEventListener("change", mostrarIncidencias);
}
// ACTUALIZAR ESTADÍSTICAS

function actualizarEstadisticas() {
  let incidencias = obtenerIncidencias();

  let numeroPendientes = 0;
  let numeroEnProceso = 0;
  let numeroResueltas = 0;

  for (let incidencia of incidencias) {
    if (incidencia.estado === PENDIENTE) {
      numeroPendientes++;
    } else if (incidencia.estado === EN_PROCESO) {
      numeroEnProceso++;
    } else if (incidencia.estado === RESUELTA) {
      numeroResueltas++;
    }
  }

  if (total !== null) {
    total.textContent = incidencias.length;
    pendientes.textContent = numeroPendientes;
    enProceso.textContent = numeroEnProceso;
    resueltas.textContent = numeroResueltas;
  }
}
// INICIAR LA PÁGINA

if (contenedorIncidencias !== null) {
  mostrarIncidencias();
}

actualizarEstadisticas();