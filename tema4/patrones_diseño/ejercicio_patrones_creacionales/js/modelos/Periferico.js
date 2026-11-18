export class Periferico {
    constructor(nombre, precio, conexion){
        this.nombre = nombre;
        this.precio = Number(precio);
        this.categoria = "periferico";
        this.conexion = Number(conexion);
    }

    getDescripcion(){
        return `${this.nombre} - ${this.conexion}`;
    }

}