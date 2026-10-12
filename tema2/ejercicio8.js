/**Implementa  una  función  de  diferencia,  que  devuelva  un  array  que 
tenga  todos  los  valores  de  la  lista  pasada  como  primer parámetro 
que  no  están  presentes  en  la  lista  b  manteniendo  su  orden.  Si un 
valor está presente en b, todas sus apariciones deben ser eliminadas 
de la otra:  
arrayDiff([1,2],[1]) == [2] */

function arrayDiff(arrayA, arrayB) {
  let resultado = [];
  for (let i = 0; i < arrayA.length; i++) {
    if (!arrayB.includes(arrayA[i])) {
      resultado.push(arrayA[i]);
    }
  }

  return resultado;
}

console.log(arrayDiff([1, 2], [1]));
console.log(arrayDiff([1, 2, 2, 2, 3], [2]));
console.log(arrayDiff([1, 2, 3], [4, 5]));
