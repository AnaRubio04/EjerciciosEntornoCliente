
servicio.getPrice(origen, destino, peso);

export class Adapter {
    constructor(expressApi){
        this.expressApi = expressApi;
    }

    getPrice(origen, destino, peso){
        let respuesta = this.expressApi.calShip({
            from: origen,
            to: destino,
            kg: peso
        });
        respuesta.provider = "djkfhsd";
        
    }
}



api.calShip({
    from: origen,
    to: destino,
    kg: peso,
    provider: "express",
    delivery: 48
});



