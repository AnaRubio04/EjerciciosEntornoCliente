/*3. Haz una función que como parámetro reciba un array de números y
obtenga el número que menos repeticiones haya tenido. En caso de
empate devuelve el número más pequeño.*/

function numeroMenosRepetido(array) {
  let numeroMenosRepetido = array[0]; //guardo un resultado inicial
  let menorRepeticiones = array.length; //

  for (let i = 0; i < array.length; i++) {
    let vecesMenosRepetido = 0;
    for (let j = 0; j < array.length; j++) {
      if (array[i] === array[j]) {
        vecesMenosRepetido++;
      }
    }
    if (vecesMenosRepetido < menorRepeticiones) {
      menorRepeticiones = vecesMenosRepetido;
      numeroMenosRepetido = array[i];
    }
  }
  return numeroMenosRepetido;
}
console.log(numeroMenosRepetido([1, 1, 2, 2, 3, 3, 4, 5]));
