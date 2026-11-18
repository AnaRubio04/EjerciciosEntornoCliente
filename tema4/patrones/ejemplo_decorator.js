class HamburguesaDecorator {

    constructor(producto){
        this.producto = producto;
    }
    get y set

    getDescripcion(){
        return this.producto.getDescripcion();
    }
}

class QuesoDecorator extends HamburguesaDecorator{
    getDescripcion(){
        return this.producto.getDescripcion() + "queso";
    }
}


let pedido = new HamburguesaDecorator();
pedido = new QuesoDecorator(pedido);