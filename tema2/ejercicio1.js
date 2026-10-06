/*Haz una función que calcule y devuelva
el número de vocales en la cadena dada.
Consideraremos a,e,i,o,u como vocales.
La cadena de entrada sólo consta de letras 
minúsculas y/o espacios.*/
const vocales = ["a", "e", "i", "o", "u"];

function contarVocales(cadena) {
  let contador = 0;

  for (let letra of cadena) {
    if (vocales.includes(letra)) {
      contador++;
    }
  }

  return contador;
}

console.log(contarVocales("holaaaaa"));
