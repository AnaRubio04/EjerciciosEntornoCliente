// IMPORTAMOS LAS CONSTANTES DEL ARCHIVO constantes.js
// VALORES_USD contiene los valores de las monedas respecto al dólar.
// CLAVEHISTORICO es el nombre de la clave donde guardaremos el histórico.
import { VALORES_USD, CLAVEHISTORICO } from "./constantes.js";
/* Seleccionar elementos del HTML*/
const importe = document.getElementById("importe");
const origen = document.getElementById("origen");
const destino = document.getElementById("destino");
const botonSwap = document.getElementById("swap");
const botonCambiar = document.getElementById("cambiar");
const lista = document.getElementById("lista");
const botonBorrar = document.getElementById("borrarHistorico");
const botonBuscar=document.getElementById("botonBuscar");
const buscar=document.getElementById("buscar");

/**Esta parte indica que cuando el usuario haga clic en el botón de convertir, se ejecutará la función cambiarDivisa() */
botonCambiar.addEventListener("click", function () {
  cambiarDivisa();
});

botonSwap.addEventListener("click", function () {
  swapDivisas();
});
botonBorrar.addEventListener("click", function(){
    borrarHistorico();
});

botonBuscar.addEventListener("click", function(){
    filtrarHistorico();
   
})

/**Recoger los datos del usuario */
function cambiarDivisa() {
  let cantidad = Number(importe.value);
  let monedaOrigen = origen.value;
  let monedaDestino = destino.value;
  /**Comprobar que la cantidad es válida */
  if (Number.isNaN(cantidad) || cantidad < 0) {
    resultado.textContent = "Introduce un importe valido";

    return;
  }

  let cantidadConvertida = Number(
    convertir(cantidad, monedaOrigen, monedaDestino).toFixed(2),
  );
  guardarConversion(cantidad, monedaOrigen, cantidadConvertida, monedaDestino);
  mostrarHistorico();
}

// FUNCIÓN PARA REALIZAR LA CONVERSIÓN
// Recibe tres parámetros: cantidad, moneda de origen y moneda de destino.
function convertir(cantidad, monedaOrigen, monedaDestino) {
  // Si las monedas son iguales, devolvemos la cantidad original.
  if (monedaOrigen === monedaDestino) {
    return cantidad;
  }
  // Primero convertimos la cantidad de origen a dólares.
  // Accedemos al valor de la moneda mediante su clave en el objeto.
  let cantidadDolares = cantidad * VALORES_USD[monedaOrigen];
  // Después convertimos los dólares a la moneda de destino.
  let resultado = cantidadDolares / VALORES_USD[monedaDestino];

  return resultado;
}
//para hacer el cambio de monedas
function swapDivisas() {
  let temporal = origen.value;
  origen.value = destino.value;
  destino.value = temporal;
}

function leerHistorico() {
  let datos = sessionStorage.getItem(CLAVEHISTORICO);

  if (datos === null) {
    return [];
  }

  return JSON.parse(datos);
}

function guardarConversion(cantidad,monedaOrigen,cantidadConvertida,monedaDestino) {
    // Recuperamos el histórico anterior para no perder las conversiones.
  let historico = leerHistorico();

   // Creamos un objeto con los datos de la conversión.
    // new Date() obtiene la fecha y hora actual.
    // toLocaleString() muestra la fecha en un formato legible.
  let linea = {
    fecha: new Date().toLocaleString(),
    cantidadOrigen: cantidad,
    monedaOrigen: monedaOrigen,
    cantidadConvertida: cantidadConvertida,
    monedaDestino: monedaDestino,
  };
// push() añade un nuevo elemento al final del array.
  historico.push(linea);
// JSON.stringify() convierte el array en texto JSON.
    // setItem() guarda los datos en sessionStorage.
  sessionStorage.setItem(CLAVEHISTORICO, JSON.stringify(historico));
}

function mostrarHistorico() {
    // Recuperamos todas las conversiones guardadas.
  let historico = leerHistorico();

 // Limpiamos el contenido anterior para no repetir las conversiones.
  lista.innerHTML = "";
  for (let operacion of historico) {
    let fila = document.createElement("p");

    fila.textContent =
      operacion.fecha +
      " Importe " +
      operacion.cantidadOrigen +
      " " +
      operacion.monedaOrigen +
      " - " +
      operacion.cantidadConvertida +
      " " +
      operacion.monedaDestino;
    lista.appendChild(fila);
  }
}
function borrarHistorico(){
    sessionStorage.removeItem(CLAVEHISTORICO);

    mostrarHistorico();
}
function filtrarHistorico(){

    // Recuperamos todos los registros guardados
    let historico = leerHistorico();

    // Recogemos lo que ha escrito el usuario
    let textoBuscar = buscar.value.toUpperCase();

    // Limpiamos la lista antes de mostrar los resultados
    lista.innerHTML = "";

    // Recorremos todos los registros
    for(let operacion of historico){

        // Comprobamos si la moneda está en el origen o en el destino
        if(operacion.monedaOrigen === textoBuscar ||
           operacion.monedaDestino === textoBuscar){

            let fila = document.createElement("p");

            fila.textContent = operacion.fecha + " - " +
                operacion.cantidadOrigen + " " +
                operacion.monedaOrigen + " → " +
                operacion.cantidadConvertida + " " +
                operacion.monedaDestino;

            lista.appendChild(fila);
        }
    }
}
/*function filtarHistorico(){
    let historico=mostrarHistorico();

    let textoBuscar=buscar.value.toLowerCase();

    lista=innerHTML="";

    for(let operacion of historico){
        if(operacion.monedaDestino.toLowerCase().includes(textoBuscar)||operacion.monedaOrigen.toLowerCase().includes(textoBuscar)){
            let fila=document.createElement("p");
             fila.textContent = operacion.cantidadOrigen + " " +
                               operacion.monedaOrigen + " - " +
                               operacion.cantidadConvertida + " " +
                               operacion.monedaDestino;
    lista.appendChild(fila);
  
        }
    }
}*/
function generarErrorAleatorio(){
    return Math.random() < 0.5;
}