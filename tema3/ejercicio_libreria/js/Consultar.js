import { Biblioteca } from "./Biblioteca.js";

class Consultar {
    constructor(){

        this.biblioteca = new Biblioteca();
        this.listaLibros = document.getElementById("listaLibros");

        this.mostrarLibros();
    }

    mostrarLibros(){
        let libros = this.biblioteca.obtenerLibros();

        if(libros.length === 0){
            this.listaLibros.textContent = "No hay libros para mostrar";
            return;
        }

        for(let libro of libros){
            this.crearCaja(libro);
        }
    }

    crearCaja(libro){
        let caja = document.createElement("article");
        caja.classList.add("libro");

        let titulo = document.createElement("h3");
        titulo.textContent = libro.titulo;

        let autor = document.createElement("p");
        autor.textContent = libro.autor;

        let paginas = document.createElement("p");
        paginas.textContent = libro.paginas;

        let prestado = document.createElement("p");
        if(libro.prestado){
            prestado.textContent = "Prestado: Si";
        }else{
            prestado.textContent = "Prestado: No";
        }

        caja.appendChild(titulo);
        caja.appendChild(autor);
        caja.appendChild(paginas);
        caja.appendChild(prestado);

        this.listaLibros.appendChild(caja);


        //alternativa fea
        // let caja = document.createElement("article");
        // caja.classList.add("libro");

        // let textoPrestado;
        // if(libro.prestado){
        //     textoPrestado = "Prestado: Si";
        // }else{
        //     textoPrestado = "Prestado: No";
        // }

        // caja.innerHTML = `
        //     <h3>${libro.titulo}</h3>
        //     <p>Autor:${libro.autor}</p>    
        //     <p>Páginas:${libro.paginas}</p>    
        //     <p>Prestad:${textoPrestado}</p>    
        // `;

        // this.listaLibros.appendChild(caja);
    }
}

new Consultar();