import { Pedido } from "../modelos/Pedido.js";

export class PedidoBuilder{
    constructor(solicitante, producto){
        this.solicitante = solicitante;
        this.producto = producto;
        this.cantidad = 1;
        this.prioridad = "normal";
        this.observaciones = "";
        this.entregaAula = false;
        this.garantia = false;
    }

    conCantidad(cantidad){
        this.cantidad = Number(cantidad);
        return this;
    }
    conPrioridad(prioridad){
        this.prioridad = prioridad;
        return this;
    }
    conObservaciones(observaciones){
        this.observaciones =observaciones;
        return this;
    }
    conEntregaAula(entregaAula){
        this.entregaAula =entregaAula;
        return this;
    }
    conGarantia(garantia){
        this.garantia = garantia;
        return this;
    }

    build(){
        if(this.solicitante.trim() === ""){
            throw new Error("El solicitante es obligatorio");
        }

        if(!this.producto){
            throw new Error("El producto es obligatorio");
        }

        if(this.cantidad <= 0){
            throw new Error("La cantidad tiene que ser mayor a 0");
        }

        return new Pedido(
            this.solicitante,
            this.producto,
            this.cantidad,
            this.prioridad,
            this.observaciones,
            this.entregaAula,
            this.garantia
        );
    }


}