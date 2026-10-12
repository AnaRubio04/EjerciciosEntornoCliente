/*Escribe una función que tenga como parámetro un array de números 
enteros. Tu trabajo es tomar esa array y encontrar un índice N en el 
que la suma de los enteros a la izquierda de N sea igual a la suma de 
los enteros a la derecha de N. Si no hay ningún índice que haga que 
esto  ocurra,  devuelve  -1.  Si  se  le  da  un  array  con  múltiples 
respuestas, devuelve el menor índice correcto. 
Digamos que te dan el array {1,2,3,4,3,2,1}: 
Tu función devolverá el índice 3, porque en la 3ª posición del array, la suma 
del lado izquierdo del índice ({1,2,3}) y la suma del lado derecho del índice 
({3,2,1}) son ambas iguales a 6.
*/
/*
parametro: array de enteros
encontrar indice, suma de enteros izq N === suma enteros der N
si no devuelve -1
multiples respuesta devuelve menor indice correcto
*/

function indiceEquilibrio (array){
    for(let i = 0; i < array.length; i++){ //coger todo el array
        let sumaIzq = 0;
        let sumaDer = 0;
        for(let j=0; j < i; j++){ //suma todo lo que esta antes de i
            sumaIzq = sumaIzq + array[j];
            // console.log(sumaIzq)
        }
        for(let j=i+1; j < array.length; j++){ //suma todo lo que esta despues de i
            sumaDer = sumaDer + array[j];
            // console.log(sumaDer);
        }
        if(sumaIzq === sumaDer){
            return i;
        }
    }

    return -1;
}

console.log(indiceEquilibrio([1,2,3,4,3,2,1]))
