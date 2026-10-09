/*Escribe una función que tome un parámetro positivo num y devuelva
su persistencia multiplicativa, que es el número de veces que debes
multiplicar los dígitos de num hasta llegar a un solo dígito.*/

function persistenciaMultiplicatiuva(numero){
    let contador=0;
    while(numero>=10){
      let textoNumero = numero.toString();
        let multiplicacion = 1;     
        for (let i = 0; i < textoNumero.length; i++) {
            multiplicacion = multiplicacion * Number(textoNumero[i]);
        }
        numero = multiplicacion;
        contador ++;
    }

    return contador;
}
console.log(persistenciaMultiplicatiuva(21));
console.log(persistenciaMultiplicatiuva(9));


/*Mientras el numero tenga mas de un digito
convertirlo a texto
multiplicar todos sus digitos
guardarlo como nuevo numero
sumar 1 al contador
repetir*/

