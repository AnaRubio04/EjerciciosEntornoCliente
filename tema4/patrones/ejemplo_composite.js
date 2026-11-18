class Tarea {
    constructor(nombre, horasestimadas, completada = false){
        this.nombre = nombre;
        this.horasestimadas = horasestimadas;
        this.completada = completada;
    }

    getNombre(){
        return this.nombre;
    }
}

class GrupoTareas{
    constructor(nombre){
        this.nombre = nombre;
        this.children = [];
    }

    add(componente){
        this.children.push(componente);
    }
}


let proyecto = new GrupoTareas("Estudiar examen");

let estudio = new GrupoTareas("Estudio");
let ejercicios = new GrupoTareas("Ejercicios");

let tarea1 = new Tarea("Estudiar js", 8, true);
let tarea2 = new Tarea("Hacer 20 ejercicios", 50, true);

estudio.add(tarea1);
ejercicios.add(tarea2);

proyecto.add(estudio);
proyecto.add(ejercicios);


proyecto
-- estudio
---- tarea1
-- ejercicios
---- tarea2
