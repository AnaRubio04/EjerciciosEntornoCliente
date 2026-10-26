document.addEventListener("submit", function (event) {
    event.preventDefault();//esto cancela el submit
    const nombre=document.getElementById("idNombre").value;
    const apellido=document.getElementById("idApellido").value;
    const edad=document.getElementById("idEdad").value;
    const localizacion=document.getElementById("idLocalizacion").value;
    const correo=document.getElementById("idCorreo").value;

    const persona={
        nombre: nombre,
        apellido: apellido,
        edad: edad,
        localizacion: localizacion,
        correo: correo

    };
    //session lo guarda en la sesion pero en cuento cierre la pestaña se va 
    // si le das a F5 dura
    sessionStorage.setItem("usuarioAnterior", JSON.stringify(persona));

});
