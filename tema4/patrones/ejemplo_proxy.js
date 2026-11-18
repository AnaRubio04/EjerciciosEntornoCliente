class Cuenta {
    verSaldo(){
        return 1500;
    }
}

let proxy = new CuentaProxy(new Cuenta(), {
    nombre: "nuria",
    rol: "usuario"
});

console.log(proxy.verSaldo());


class CuentaProxy{
    constructor(cuenta, usuario){
        this.Cuenta = cuenta;
        this.usuario = usuario;
    }

    verSaldo(){
        if(this.usuario.rol !== "admin"){
            throw new Error()
        }

        return this.Cuenta.verSaldo();
    }
}



