/*
11. El teorema de los cuatro cuadrados de Lagrange, también conocido
como conjetura de Bachet, afirma que todo número natural puede
representarse como la suma de cuatro cuadrados enteros.
Haz una función que devuelva un array con los cuatro números naturales
que cumplan el teorema dado un número natural pasado como argumento.
*/

/*
    numero -> 23
    encontrar cuatro numeros que cumplan: a^2 + b^2 + c^2+ d^2 = 23
    a^2 -> 1^2 = 1
    b^2 -> 2^2 = 4
    c^2 -> 3^2 = 9
    d^2 -> 3^2 = 9
*/

function cuatroCuadrados(numero){
    for(let a = 0; a <= Math.sqrt(numero); a++){
        for(let b = 0; b <= Math.sqrt(numero); b++){
            for(let c = 0; c <= Math.sqrt(numero); c++){
                for(let d = 0; d <= Math.sqrt(numero); d++){
                    if(a*a + b*b + c*c + d*d === numero){
                        return [a,b,c,d];
                    }
                }
            }
        }
    }
    return null;
}

console.log(cuatroCuadrados(23));
