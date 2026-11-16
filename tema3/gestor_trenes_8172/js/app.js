"use strict";

import {
    CLAVE_TRENES,
    TIPOS_TREN,
    ESTACIONES,
    MATRIZ_DISTANCIAS,
    EVENTOS
} from "./constantes.js";

const formularioTren = document.getElementById("formularioTren");
const nombre = document.getElementById("nombre");
const tipo = document.getElementById("tipo");
const velocidad = document.getElementById("velocidad");
const mensajeRegistro = document.getElementById("mensajeRegistro");

const origen = document.getElementById("origen");
const destino = document.getElementById("destino");
const trenSeleccionado = document.getElementById("trenSeleccionado");
const botonSimular = document.getElementById("simular");
const resultadoViaje = document.getElementById("resultadoViaje");

const busqueda = document.getElementById("busqueda");
const botonBuscar = document.getElementById("buscar");
const botonMostrarTodos = document.getElementById("mostrarTodos");
const listaTrenes = document.getElementById("listaTrenes");
const botonBorrarTodos = document.getElementById("borrarTodos");

let trenes = obtenerTrenes();

cargarTipos();
cargarEstaciones();
actualizarPantalla();

formularioTren.addEventListener("submit", function (evento) {
    evento.preventDefault();
    añadirTren();
});

botonSimular.addEventListener("click", function () {
    simularViaje();
});

botonBuscar.addEventListener("click", function () {
    buscarTrenes();
});

botonMostrarTodos.addEventListener("click", function () {
    busqueda.value = "";
    mostrarTrenes(trenes);
});

botonBorrarTodos.addEventListener("click", function () {
    borrarTodosLosTrenes();
});

function añadirTren() {

    let nombreTren = nombre.value.trim();
    let tipoTren = tipo.value;
    let velocidadTren = Number(velocidad.value);

    if (nombreTren === "") {
        mensajeRegistro.textContent = "El nombre es obligatorio";
        return;
    }

    if (velocidadTren < 10 || velocidadTren > 300) {
        mensajeRegistro.textContent =
            "La velocidad debe estar entre 10 y 300 km/h";
        return;
    }

    let tren = {
        nombre: nombreTren,
        tipo: tipoTren,
        velocidad: velocidadTren,
        fechaAlta: new Date().toLocaleDateString("es-ES")
    };

    trenes.push(tren);

    guardarTrenes();

    actualizarPantalla();

    mensajeRegistro.textContent = "Tren añadido correctamente";

    formularioTren.reset();
}

function obtenerTrenes() {

    let datos = localStorage.getItem(CLAVE_TRENES);

    if (datos === null) {
        return [];
    }

    return JSON.parse(datos);
}

function guardarTrenes() {

    localStorage.setItem(
        CLAVE_TRENES,
        JSON.stringify(trenes)
    );
}

function cargarTipos() {

    tipo.innerHTML = "";

    for (let tipoTren of TIPOS_TREN) {

        let opcion = document.createElement("option");

        opcion.value = tipoTren;
        opcion.textContent = tipoTren;

        tipo.appendChild(opcion);
    }
}

function cargarEstaciones() {

    origen.innerHTML = "";
    destino.innerHTML = "";

    for (let estacion of ESTACIONES) {

        let opcionOrigen = document.createElement("option");

        opcionOrigen.value = estacion;
        opcionOrigen.textContent = estacion;

        origen.appendChild(opcionOrigen);

        let opcionDestino = document.createElement("option");

        opcionDestino.value = estacion;
        opcionDestino.textContent = estacion;

        destino.appendChild(opcionDestino);
    }

    origen.value = "Knapford";
    destino.value = "Sodor Central";
}

function cargarSelectTrenes() {

    trenSeleccionado.innerHTML = "";

    if (trenes.length === 0) {

        let opcion = document.createElement("option");

        opcion.value = "";
        opcion.textContent = "No hay trenes registrados";

        trenSeleccionado.appendChild(opcion);

        return;
    }

    for (let i = 0; i < trenes.length; i++) {

        let opcion = document.createElement("option");

        opcion.value = i;
        opcion.textContent = trenes[i].nombre;

        trenSeleccionado.appendChild(opcion);
    }
}

function mostrarTrenes(lista) {

    listaTrenes.innerHTML = "";

    if (lista.length === 0) {

        listaTrenes.textContent = "No hay trenes";

        return;
    }

    for (let tren of lista) {

        let tarjeta = document.createElement("article");

        tarjeta.classList.add("tren");

        tarjeta.innerHTML = `
            <h3>${tren.nombre}</h3>
            <p><strong>Tipo:</strong> ${tren.tipo}</p>
            <p><strong>Velocidad:</strong> ${tren.velocidad} km/h</p>
            <p><strong>Fecha de alta:</strong> ${tren.fechaAlta}</p>
        `;

        listaTrenes.appendChild(tarjeta);
    }
}

function buscarTrenes() {

    let texto = busqueda.value.trim().toLowerCase();

    if (texto === "") {

        mostrarTrenes(trenes);

        return;
    }

    let encontrados = trenes.filter(function (tren) {

        let nombreTren = tren.nombre.toLowerCase();
        let tipoTren = tren.tipo.toLowerCase();

        return (
            nombreTren.includes(texto) ||
            tipoTren.includes(texto)
        );
    });

    mostrarTrenes(encontrados);
}

function simularViaje() {

    if (trenes.length === 0) {

        resultadoViaje.innerHTML =
            "<p>Primero debes registrar un tren</p>";

        return;
    }

    let estacionOrigen = origen.value;
    let estacionDestino = destino.value;

    if (estacionOrigen === estacionDestino) {

        resultadoViaje.innerHTML =
            "<p>Origen y destino deben ser diferentes</p>";

        return;
    }

    let indiceTren = Number(trenSeleccionado.value);

    let tren = trenes[indiceTren];

    let distancia = calcularDistancia(
        estacionOrigen,
        estacionDestino
    );

    let tiempoEstimado = Math.round(
        distancia / tren.velocidad * 60
    );

    let evento = generarEventoAleatorio();

    let tiempoTotal =
        tiempoEstimado + evento.retraso;

    let textoRetraso = "";

    if (evento.retraso > 0) {

        textoRetraso =
            " (+" + evento.retraso + " min)";
    }

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

function generarEventoAleatorio() {

    let posicion = Math.floor(
        Math.random() * EVENTOS.length
    );

    return EVENTOS[posicion];
}

function calcularDistancia(
    estacionOrigen,
    estacionDestino
) {

    let indiceOrigen =
        ESTACIONES.indexOf(estacionOrigen);

    let indiceDestino =
        ESTACIONES.indexOf(estacionDestino);

    let distancias =
        MATRIZ_DISTANCIAS.map(function (fila) {

            return fila.map(function (valor) {

                if (valor === null) {
                    return Infinity;
                }

                return valor;
            });
        });

    for (
        let intermedia = 0;
        intermedia < ESTACIONES.length;
        intermedia++
    ) {

        for (
            let inicio = 0;
            inicio < ESTACIONES.length;
            inicio++
        ) {

            for (
                let fin = 0;
                fin < ESTACIONES.length;
                fin++
            ) {

                let nuevaDistancia =
                    distancias[inicio][intermedia] +
                    distancias[intermedia][fin];

                if (
                    nuevaDistancia <
                    distancias[inicio][fin]
                ) {

                    distancias[inicio][fin] =
                        nuevaDistancia;
                }
            }
        }
    }

    return distancias[indiceOrigen][indiceDestino];
}

function borrarTodosLosTrenes() {

    trenes = [];

    localStorage.removeItem(CLAVE_TRENES);

    resultadoViaje.innerHTML = "";

    mensajeRegistro.textContent =
        "Todos los trenes han sido borrados";

    actualizarPantalla();
}

function actualizarPantalla() {

    mostrarTrenes(trenes);

    cargarSelectTrenes();
}
