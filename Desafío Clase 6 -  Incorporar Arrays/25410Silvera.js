class IndiceMasaCorporal {
    constructor(peso, altura) {
        this.peso = peso
        this.altura = altura
    }

    calcularIndice(peso, altura) {
        let indice = (peso / (altura * altura)).toFixed(1)
        return indice
    }

    mostrarIndice(indice) {
        let resultado = ""

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
}

var opciones = [
    "1. CALCULAR INDICE\n",
    "2. LISTAR INDICES\n",
    "3. BORRAR ULTIMO INDICE\n",
    "4. TERMINAR\n"
];

var listadoDeIMC = []

let opcionSeleccionada = 0;
let listado = "";
opciones.forEach((opcion) => { listado += opcion })

while (opcionSeleccionada !== 4) {
    opcionSeleccionada = parseInt(prompt("Seleccione una opci\u00F3n:\n" + listado));

    switch (opcionSeleccionada) {

        case 1:
            {
                agregarIndice();
                break;
            }
        case 2:
            {
                listarIndices();
                break;
            }
        case 3:
            {
                borrarUltimoIndice();
                break;
            }
        default:
            {
                alert("OPCION INVÁLIDA");
                break;
            }
    }
}

function agregarIndice() {

    var peso = prompt("Ingresa tu peso en kilogramos");
    while ((peso) < 0 || isNaN(peso)) {
        alert("El peso es inv\u00E1lido");
        peso = prompt("Ingresa tu peso en kilogramos");
    }
    var altura = prompt("Ingresa tu altura en metros");
    while ((altura) < 0 || isNaN(altura)) {
        alert("La altura es inv\u00E1lida");
        altura = prompt("Ingresa tu altura en metros");
    }

    const calculadora = new IndiceMasaCorporal(peso, altura)

    listadoDeIMC.push(calculadora.calcularIndice(peso, altura));
    alert(calculadora.mostrarIndice(calculadora.calcularIndice(peso, altura)))
}

function listarIndices() {
    if (listadoDeIMC.length === 0) {
        alert("El listado est\u00E1 vac\u00EDo")
    }
    else {
        alert(listadoDeIMC)
        console.log(listadoDeIMC)
    }
}

function borrarUltimoIndice() {
    if (listadoDeIMC.length === 0) {
        alert("El listado est\u00E1 vac\u00EDo")
    }
    else {
        listadoDeIMC.pop()
        console.log(listadoDeIMC)
    }
}
















