/*
tarea normal
tarea urgente
tarea programada
*/
//sin aplicar factory
if(tipo == "normal"){
    tarea = new TareaNormal();
}
if(tipo == "urgente"){
    tarea = new TareaUrgente();
}


// aplicando factory
class TareaNormal {
    constructor(){
        ...
    }
}
class TareaUrgente {
    constructor(){
        ...
    }
}

class TareaFactory {
    static crear(tipo, titulo){
        if(tipo == "normal"){
            return new TareaNormal(titulo)
        }
        if(tipo == "urgente"){
            return new TareaUrgente(titulo)
        }
    }
}


let tarea = TareaFactory.crear("urgente", "Estudiar");