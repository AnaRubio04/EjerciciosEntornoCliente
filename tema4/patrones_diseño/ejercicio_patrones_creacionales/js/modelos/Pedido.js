import { PedidoBuilder } from "../patrones/PedidoBuilder";

export class Pedido {
    constructor(solicitante, producto, cantidad, prioridad, observaciones, entregaAula, garantia){
        this.solicitante = solicitante;
        this.producto = producto;
        this.cantidad = cantidad;
        this.prioridad = prioridad;
        this.observaciones = observaciones;
        this.entregaAula = entregaAula;
        this.garantia = garantia;
    }
}


new Pedido ("Ana", 3, "alta", "pronto", false);

let pedido = new PedidoBuilder("Ana", producto).conCantidad(2).conPrioridad("alta").conGarantia(true).build();