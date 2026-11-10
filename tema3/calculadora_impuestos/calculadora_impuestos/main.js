
import {PRECIO_PLA, PRECIO_PETG, PRECIO_ABS, CALIDAD_BASICA, CALIDAD_NORMAL, CALIDAD_ALTA, DESCUENTO_MEDIO, DESCUENTO_GRANDE, URGENTE, HISTORICO} from "./constantes.js";

const formulario = document.getElementById("formulario");
const peso = document.getElementById("peso");
const material = document.getElementById("material");
const calidad = document.getElementById("calidad");
const unidades = document.getElementById("unidades");
const urgente = document.getElementById("urgente");
const resultado = document.getElementById("resultado");
const lista = document.getElementById("lista");


formulario.addEventListener("submit", function(evento){
    evento.preventDefault();
    calcularPresupuesto();
})

function calcularPresupuesto(){
    //recoger los datos del formulario
    let pesoPieza = Number(peso.value);
    let tipoMaterial = material.value;
    let tipoCalidad = calidad.value;
    let numeroUnidades = Number(unidades.value)
    let esUrgente = urgente.checked;

    if(pesoPieza <= 0 || numeroUnidades <= 0){
        resultado.textContent = "Introduce valores positivos o mayores que cero";
        return;
    }

    let precioUnidad = calcularPrecioMaterial(pesoPieza, tipoMaterial);
    precioUnidad = aplicaClidad(precioUnidad, tipoCalidad);
    let precioTotal = precioUnidad * numeroUnidades;

    precioTotal = aplicaDescuento(precioTotal, numeroUnidades);
    precioTotal = aplicaUrgente(precioTotal, esUrgente);
    precioTotal = Number(precioTotal.toFixed(2));

    resultado.textContent = "Precio final: " + precioTotal + " €";

    guardarHistorico(pesoPieza, tipoMaterial, tipoCalidad, numeroUnidades, esUrgente, precioTotal);
    mostrarHistorico();

}

function calcularPrecioMaterial(pesoPieza, tipoMaterial){
    
    let precioGramo;
    
    if(tipoMaterial == "PLA"){
        precioGramo = PRECIO_PLA;
    }else if(tipoMaterial == "PETG"){
        precioGramo = PRECIO_PETG;
    }else if(tipoMaterial == "ABS"){
        precioGramo = PRECIO_ABS;
    }

    return pesoPieza * precioGramo;
}

function aplicaClidad(precio, tipoCalidad){
    
    let multiplicador;
    
    if(tipoCalidad == "basica"){
        multiplicador = CALIDAD_BASICA;
    }else if(tipoCalidad == "normal"){
        multiplicador = CALIDAD_NORMAL;
    }else if(tipoCalidad == "alta"){
        multiplicador = CALIDAD_ALTA;
    }

    return precio * multiplicador;
}

function aplicaDescuento(precio, numeroUnidades){

    if(numeroUnidades < 5){
        return precio;
    }
    if(numeroUnidades < 10){
        return precio * (1 - DESCUENTO_MEDIO);
    }
    return precio * (1-DESCUENTO_GRANDE);
}

function aplicaUrgente(precio, esUrgente){
    if(esUrgente){
        return precio * (1 + URGENTE);
    }

    return precio;
}

function recogerHistorico(){
    let datos = sessionStorage.getItem(HISTORICO);

     if(datos == null){
        return [];
     }

    return JSON.parse(datos);
}

function guardarHistorico(pesoPieza, tipoMaterial, tipoCalidad, numeroUnidades, esUrgente, precioTotal){
    let historico = recogerHistorico();

    let operacion = {
        fecha: new Date().toLocaleString(),
        peso: pesoPieza,
        material: tipoMaterial,
        calidad: tipoCalidad,
        unidades: numeroUnidades,
        urgente: esUrgente,
        precio: precioTotal
    };

    historico.push(operacion);

    sessionStorage.setItem(HISTORICO, JSON.stringify(historico));

}

function mostrarHistorico(){
    let historico = recogerHistorico();

    lista.innerHTML = "";
    if(historico.length === 0){
        lista.textContent = "No hay historial";
        return;
    }

    for(let operacion of historico){
        let linea = document.createElement("p");
        let textoUrgente;
        if(operacion.urgente){
            textoUrgente = "Urgente";
        }else{
            textoUrgente = "Normal";
        }

        linea.textContent = operacion.fecha + 
                            " " +
                            operacion.peso +
                            " g " +
                            operacion.material +
                            " " +
                            operacion.calidad +
                            " " +
                            operacion.unidades +
                            " unidades " +
                            textoUrgente + 
                            " " +
                            operacion.precio +
                            " €";
        
        lista.appendChild(linea);                    
    }

}



