
import {Libro} from "../js/Libro.js";
import {Biblioteca} from "../js/Biblioteca.js";

class Crear {
    constructor(){
        this.biblioteca = new Biblioteca();
        this.formulario = document.getElementById("formularioLibro");
        this.titulo = document.getElementById("titulo");
        this.autor = document.getElementById("autor");
        this.paginas = document.getElementById("paginas");
        this.prestado = document.getElementById("prestado");
        this.mensaje = document.getElementById("mensaje");

        this.iniciar();
    }

    iniciar(){
        this.formulario.addEventListener("submit", (evento) => {
            this.crearLibro(evento);
        });
    }

    crearLibro(evento){
        evento.preventDefault();

        let libro = new Libro(this.titulo.value, this.autor.value, Number(this.paginas.value), this.prestado.checked);
        this.biblioteca.agregarLibro(libro);
        this.mensaje.textContent = "Libro creado";

        this.formulario.reset();

    }


}

new Crear();
