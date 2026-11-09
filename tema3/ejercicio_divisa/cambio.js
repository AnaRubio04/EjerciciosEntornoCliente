import { VALORES_USD, CLAVEHISTORICO } from "./constantes.js";

const importe = document.getElementById("importe");
const origen = document.getElementById("origen");
const destino = document.getElementById("destino");
const botonSwap = document.getElementById("swap");
const botonCambiar = document.getElementById("cambiar");
const lista = document.getElementById("lista");


botonCambiar.addEventListener("click", function(){
    cambiarDivisa();
});

botonSwap.addEventListener("click", function(){
    swapDivisas();
});


function cambiarDivisa(){
    let cantidad = Number(importe.value);
    let monedaOrigen = origen.value;
    let monedaDestino = destino.value;

    if(Number.isNaN(cantidad) || cantidad < 0){
        resultado.textContent = "Introduce un importe valido";

        return;
    }

    let cantidadConvertida = Number(convertir(cantidad, monedaOrigen, monedaDestino).toFixed(2));
    guardarConversion(cantidad, monedaOrigen, cantidadConvertida, monedaDestino);
    mostrarHistorico();
}

function convertir(cantidad, monedaOrigen, monedaDestino){
    if(monedaOrigen === monedaDestino){
        return cantidad;
    }

    let cantidadDolares = cantidad * VALORES_USD[monedaOrigen];
    let resultado = cantidadDolares / VALORES_USD[monedaDestino];

    return resultado;

}

function swapDivisas(){
    let temporal = origen.value;
    origen.value = destino.value;
    destino.value = temporal;
}

function leerHistorico(){
    let datos = sessionStorage.getItem(CLAVEHISTORICO);

    if(datos === null){
        return [];
    }

    return JSON.parse(datos);
}

function guardarConversion(cantidad, monedaOrigen, cantidadConvertida, monedaDestino){
    let historico = leerHistorico();

    let linea = {
        fecha: new Date().toLocaleString(),
        cantidadOrigen: cantidad,
        monedaOrigen: monedaOrigen,
        cantidadConvertida: cantidadConvertida,
        monedaDestino: monedaDestino
    };

    historico.push(linea);

    sessionStorage.setItem(CLAVEHISTORICO, JSON.stringify(historico));
}

function mostrarHistorico(){
    let historico = leerHistorico();

    lista.innerHTML = "";
    for(let operacion of historico){
        let fila = document.createElement("p");

        fila.textContent = operacion.fecha + " Importe " + operacion.cantidadOrigen + " " + operacion.monedaOrigen + " - " + operacion.cantidadConvertida + " " + operacion.monedaDestino;
        lista.appendChild(fila);
    }
}
