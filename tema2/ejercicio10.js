/**Escriba una función que tome un número decimal como entrada,
 * y devuelva el número de bits que son iguales a uno en la
 * representación binaria de ese número.
 * Comprueba que la entrada no sea negativa */

function contarUnos(numero) {
  if (numero < 0) {
    return "El número no puede ser negativo";
  }

  let contador = 0;

  while (numero > 0) {
    if (numero % 2 == 1) {
      contador++;
    }

    numero = (numero - (numero % 2)) / 2;
  }

  return contador;
}


console.log(contarUnos(7)); // 3
console.log(contarUnos(8)); // 1
console.log(contarUnos(-5)); // El número no puede ser negativo
