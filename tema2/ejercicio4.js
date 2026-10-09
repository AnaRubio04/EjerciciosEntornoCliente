/* Dada un array de enteros, encuentra todo los números que aparecen
un número impar de veces.*/

function numsImparDeVeces(array) {
  let numerosRep = [];
  for (let i = 0; i < array.length; i++) {
    let contador = 0;
    for (let j = 0; j < array.length; j++) {
      if (array[i] === array[j]) {
        contador++;
      }
    }
    if (contador % 2 !== 0) {
      if (!numerosRep.includes(array[i])) {
        //comprobar si es impar las veces que sale el numero
        numerosRep.push(array[i]);
        
      }
    }
  }
  return numerosRep;
}
console.log(numsImparDeVeces([1, 2, 3, 4, 2]));
