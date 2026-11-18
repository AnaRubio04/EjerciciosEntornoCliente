let gestor1 = new GestorTareas();
let gestor2 = new GestorTareas();


console.log(gestor1 == gestor2);

class GestorTareas {
    static instancia; //guardar una instancia de gestortareas
    constructor(){
        if(GestorTareas.instancia){
            return GestorTareas.instancia;
        }
        this.tareas = [];
        GestorTareas.instancia = this;
    }
}


gestor1.agregarTarea("Tarea del gestor1");
gestor2.obtenerTareas(); //va a imprimir la tarea del gestor 1