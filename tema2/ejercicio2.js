/*2. Los cajeros automáticos permiten códigos PIN de 4 o 6 dígitos y los
códigos PIN no pueden contener más que exactamente 4 dígitos o
exactamente 6 dígitos. Si a la función se le pasa una cadena de PIN
válida, devuelve true, de lo contrario devuelve false.*/

function pinCorrecto(pin) {
  if ((pin.length === 4 || pin.length === 6) && !isNaN(pin)) {
    return true;
  }
  return false;
}
console.log(pinCorrecto("1234")); // true
console.log(pinCorrecto("123456")); // true
console.log(pinCorrecto("123")); // false
console.log(pinCorrecto("12345")); // false
console.log(pinCorrecto("aaaa")); //false
