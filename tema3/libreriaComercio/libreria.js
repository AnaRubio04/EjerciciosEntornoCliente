document.addEventListener("submit", function (event) {
    event.preventDefault();//esto cancela el submit
    const nombre=document.getElementById("idNombre").value;
    const nombreAutor=document.getElementById("idAutor").value;
    const numPag=document.getElementById("idNumPag").value;
    const prestado=document.getElementById("prestado").value;
   

    const libro={
        nombre: nombre,
        autor: nombreAutor,
        numeroPaginas: numPag,
        prestado: prestado

    };
    //session lo guarda en la sesion pero en cuento cierre la pestaña se va 
    // si le das a F5 dura
    sessionStorage.setItem("libroGuardado", JSON.stringify(libro));

});