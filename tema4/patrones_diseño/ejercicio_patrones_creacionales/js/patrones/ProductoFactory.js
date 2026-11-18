import { Portatil } from "../modelos/Portatil.js";
import { Monitor } from "../modelos/Monitor.js";
import { Periferico } from "../modelos/Periferico.js";

export class ProductoFactory {
    static crearProducto(tipo, nombre, precio, extra){
        if (tipo === "portatil"){
            return new Portatil(nombre, precio, extra);
        }
        
        if (tipo === "monitor"){
            return new Monitor(nombre, precio, extra);
        }

        if (tipo === "periferico"){
            return new Periferico(nombre, precio, extra);
        }
    }
}