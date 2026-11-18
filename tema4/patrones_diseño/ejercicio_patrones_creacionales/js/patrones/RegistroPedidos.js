
export class RegistroPedidos {
    static instancia;

    constructor(){
        if(RegistroPedidos.instancia){
            return RegistroPedidos.instancia;
        }

        this.pedidos = [];
        RegistroPedidos.instancia = this;
    }

    agregar(pedido){
        this.pedidos.push(pedido);
    }

    obtenerTodos(){
        return [ ...this.pedidos];
    }

    vaciar(){
        this.pedidos = [];
    }
}


export const registro = new RegistroPedidos();