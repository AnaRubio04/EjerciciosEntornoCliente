export class Portatil {
    constructor(nombre, precio, ram){
        this.nombre = nombre;
        this.precio = Number(precio);
        this.categoria = "portatil";
        this.ram = Number(ram);
    }

    getDescripcion(){
        return `${this.nombre} - ${this.ram} GB RAM`;
    }

}c