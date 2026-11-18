
let tareaBase = {
    titulo: "",
    prioridad: "normal",
    completada: false
};

let tarea1 = { ...tareaBase};
tarea1.titulo = "Primera tarea";

let tarea2 = { ...tareaBase};
tarea2.titulo ="segunda tarea";
tarea2.completada = true;

// prototype usando clases
class Tarea(){
    constructor(){

    }


    clonar(){
        return new Tarea (
            this.titulo, 
            this.prioridad,
            this.completada
        );
    }
}

let tareaBase = new Tarea("estudiar", "alta", false);

let copia = tareaBase.clonar();

let tarea1 = tarea2;