/*
12. Ejercicio colorear triángulo
Un triángulo de color se crea a partir de una fila de colores, cada uno de los
cuales es rojo, verde o azul. Las filas sucesivas, cada una con un color
menos que la anterior, se generan considerando los dos colores que se
tocan en la fila anterior.
Si estos colores son idénticos, se utiliza el mismo color en la nueva fila. Si
son diferentes, se utiliza el color que falta en la nueva fila. Así se continúa
hasta que se genera la última fila, con un solo color.
Se le dará la primera fila del triángulo como parámetro y la función debe
devolver el color final que aparecería en la fila inferior como una cadena. En
el caso del ejemplo anterior, se le dará "RRGBRGBB", y deberá devolver "G".
*/

/*
R -> Rojo
G -> Verde
B -> Azul


Regla: 
    - si los dos colores son iguales se mantiene el color
    - si son diferentes se pone el color que falta
*/

//el parametro son cuantas filas quieres que tenga:
function triangulo(fila){
    while(fila.length > 1){
        let nuevaFila = "";
        for(let i=0; i < fila.length-1; i++)
        {
            let color1 = fila[i];
            let color2 = fila[i+1];

            if(color1 === color2){
                nuevaFila = nuevaFila + color1;
            }else if((color1 === "R" && color2 === "G") || (color1 === "G" && color2 === "R")){
                nuevaFila = nuevaFila + "B";
            }else if((color1 === "R" && color2 === "B") || (color1 === "B" && color2 === "R")){
                nuevaFila = nuevaFila + "G";
            }else if((color1 === "B" && color2 === "G") || (color1 === "G" && color2 === "B")){
                nuevaFila = nuevaFila + "R";
            }
        }
        fila = nuevaFila;
    }
    return fila;
}


function trianguloEntero(fila){

    let nivel = 0;
    console.log(" ".repeat(nivel) + fila.split("").join(" "));
    
    while(fila.length > 1){
        let nuevaFila = "";
        for(let i=0; i < fila.length-1; i++)
        {
            let color1 = fila[i];
            let color2 = fila[i+1];

            if(color1 === color2){
                nuevaFila = nuevaFila + color1;
            }else if((color1 === "R" && color2 === "G") || (color1 === "G" && color2 === "R")){
                nuevaFila = nuevaFila + "B";
            }else if((color1 === "R" && color2 === "B") || (color1 === "B" && color2 === "R")){
                nuevaFila = nuevaFila + "G";
            }else if((color1 === "B" && color2 === "G") || (color1 === "G" && color2 === "B")){
                nuevaFila = nuevaFila + "R";
            }
        }
        fila = nuevaFila;
        nivel++;
        console.log(" ".repeat(nivel) + fila.split("").join(" "));
    }
    return fila;
}

console.log(triangulo("RRGBRGBB"));
console.log(trianguloEntero("RRGBRGBB"));