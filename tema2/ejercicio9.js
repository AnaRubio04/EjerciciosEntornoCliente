/** Haz una función que pueda tomar cualquier número entero no
negativo como argumento y devolverlo con sus dígitos en orden
descendente. Esencialmente, reordenar los dígitos para crear el
mayor número posible.
*/

function devolverOrdenDescendente(numero) {
  let numerosOrdenAscendente = numero.toString().split("");
  numerosOrdenAscendente.sort();
 //numerosOrdenAscendente.reverse();

  let ordenados = 0;

  for (let i = numerosOrdenAscendente.length - 1; i >= 0; i--) {
    ordenados += numerosOrdenAscendente[i];
  }

  return parseInt(ordenados);
}
function compareFn(a, b) {
  b - a; //orden descendente
}
console.log(devolverOrdenDescendente(1432567891));
