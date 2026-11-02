function guardarLibros(listaLibros){
sessionStorage.setItem("libroGuardado", JSON.stringify(listaLibros));
}
function mostrarLibros(){
 const  libro =sessionStorage.getItem(libro,"");
}

document.addEventListener("submit", function (event) {
    event.preventDefault();//esto cancela el submit
    const nombre=document.getElementById("idNombre").value;
    const nombreAutor=document.getElementById("idAutor").value;
    const numPag=document.getElementById("idNumPag").value;
    const prestado=document.getElementById("prestado").checked;
   

    const libro={
        nombre: nombre,
        autor: nombreAutor,
        numeroPaginas: numPag,
        prestado: prestado

    };
    //session lo guarda en la sesion pero en cuento cierre la pestaña se va 
    // si le das a F5 dura
    guardarLibros(libro)

});