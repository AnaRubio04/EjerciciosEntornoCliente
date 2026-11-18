export class Monitor {
    constructor(nombre, precio, pulgadas){
        this.nombre = nombre;
        this.precio = Number(precio);
        this.categoria = "monitor";
        this.pulgadas = Number(pulgadas);
    }

    getDescripcion(){
        return `${this.nombre} - ${this.pulgadas}" `;
    }

}