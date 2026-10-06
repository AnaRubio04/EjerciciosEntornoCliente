/* Implementar la función que toma como argumento una array de
enteros o string, pueden ser híbrido, y devuelve una array de
elementos sin ningún elemento repetido y preservando el orden
original de los elementos.
 */
function sinRepetidos(array){
    let arraySinRepes=[];

    for (let i = 0; i < array.length; i++) {
       if(!arraySinRepes.includes(array[i])){
            arraySinRepes.push(array[i]);
       }
        
    }
    return arraySinRepes;

}
console.log(sinRepetidos([6,1,1,2,3,4,5,3]));