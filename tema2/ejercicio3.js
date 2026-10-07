/*3. Haz una función que como parámetro reciba un array de números y
obtenga el número que menos repeticiones haya tenido. En caso de
empate devuelve el número más pequeño.*/

function numeroMenosRepetido(array) {
  let numeroMenosRepetido = array[0]; //guardo un resultado inicial
  let menorRepeticiones = array.length; //Elementos que hay

  for (let i = 0; i < array.length; i++) {
    //recorro cada posicion
    let vecesMenosRepetido = 0; //guardo las veces que aparece el que estoy mirando
    for (let j = 0; j < array.length; j++) {
      //recorro todo el array para buscar cuantas veces aparece el numero
      if (array[i] === array[j]) {
        //si son iguales incremento las veces qiue aparece
        vecesMenosRepetido++;
      }
    }
    if (vecesMenosRepetido < menorRepeticiones) {
      menorRepeticiones = vecesMenosRepetido;
      // Si aparece menos veces que el número que tenía guardado
      // O si aparece las mismas veces pero es un número más pequeño
      vecesMenosRepetido < menorRepeticiones ||
      (vecesMenosRepetido === menorRepeticiones &&
        array[i] < numeroMenosRepetido)
    ) {
      menorRepeticiones = vecesMenosRepetido; // Actualizo el numero de menor numero de repeticiones
      numeroMenosRepetido = array[i];
    }
  }
  return numeroMenosRepetido;
}
console.log(numeroMenosRepetido([1, 1, 2, 2, 3, 3, 5, 4]));
