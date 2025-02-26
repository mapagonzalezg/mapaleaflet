
//foreach=recorrer un iterable y efecutar cada vez una función
let arreglo= [4,5,6,8,3,4,6]
arreglo.forEach((valor, indice)=>{
    console.log(valor);
}
)
//map mapea, igual pero devuelve un arreglo
function calcularCuadrado(valor){
    return valor**2;
};
let cuadrados= arreglo.map(calcularCuadrado)
//imprimir cuadrado
cuadrados.forEach((valor, indice)=>{
    console.log(valor);
}
)
//filter crear una función que numeros sean mayor a 50 
function mayor50(valor){
    return valor>50;
}
let mayores50=cuadrados.filter(mayor50);
console.log(mayores50);

//Slice
let parte=arreglo.slice(2,4)
console.log(arreglo)
console.info(parte)