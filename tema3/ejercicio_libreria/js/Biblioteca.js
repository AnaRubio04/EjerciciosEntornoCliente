
import { SESSION_STORAGE_LIBROS } from "./constantes.js";
import { Libro } from "./Libro.js";

export class Biblioteca {
    constructor(){
        this.libros = [];
        this.cargarLibros();
    }

    agregarLibro(libro){
        this.libros.push(libro);
        this.guardarLibros();
    }

    obtenerLibros(){
        return this.libros;
    }

    guardarLibros(){
        sessionStorage.setItem(SESSION_STORAGE_LIBROS, JSON.stringify(this.libros));
    }

    cargarLibros(){
        let datosSession = sessionStorage.getItem(SESSION_STORAGE_LIBROS);
        if(datosSession === null){
            this.libros = [];
            return;
        }

        let datosLibros = JSON.parse(datosSession);
        this.libros = [];

        for(let datoLibro of datosLibros){
            let libro = new Libro(
                datoLibro.titulo, 
                datoLibro.autor,
                datoLibro.paginas,
                datoLibro.prestado
            );

            this.libros.push(libro);
        }
    }
}