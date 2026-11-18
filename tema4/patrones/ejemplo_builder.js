/*
solicitante
producto
cantidad
prioridad
observaciones
entrega en x sitio
garantias
extras
*/

//sin builder

let pedido = {
    solicitante = "slkn",
    ...
}

//con builder

let pedido = new PedidoBuilder().conSolicitante("nuria").conCantidad(4).build();

class PedidoBuilder(){
    constructor(){
        this.pedido = {
            solicitante: "",
            producto: "",
            ..
        }
    }

    conSolicitante(nombre){
        this.pedido.solicitante = nombre;
        return this;
    }

    ...


    build(){
        return this.pedido;
    }
}

