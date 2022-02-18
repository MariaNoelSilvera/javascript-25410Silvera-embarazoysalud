let peso = prompt("Ingresa tu peso en kilogramos");
while ((peso) < 0 || isNaN(peso)) {
    alert("El peso es inv\u00E1lido");
    peso = prompt("Ingresa tu peso en kilogramos");
}
let altura = prompt("Ingresa tu altura en metros");
while ((altura) < 0 || isNaN(altura)) {
    alert("La altura es inv\u00E1lida");
    altura = prompt("Ingresa tu altura en metros");
}

alert(calculoIMC(peso, altura));


function calculoIMC(peso, altura) {
    var indice = (peso / (altura * altura)).toFixed(1)
    var resultado = ""

    if (indice < 18.5) {
        resultado = "Bajo peso"
    }
    else if (indice >= 18.5 && indice < 24.9) {
        resultado = "Peso normal"
    }
    else if (indice >= 25 && indice < 29.9) {
        resultado = "Sobrepeso"
    }
    else {
        resultado = "Obesidad"
    }

    return `Tu IMC es ${indice}, lo que indica que tu peso est\u00E1 en la categor\u00EDa de ${resultado} para adultos de tu misma estatura.`
}









