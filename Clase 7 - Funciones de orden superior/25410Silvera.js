class IndiceMasaCorporal {
    constructor(peso, altura) {
        this.peso = peso
        this.altura = altura
    }

    calcularIndice(peso, altura) {
        let indice = (peso / (altura * altura)).toFixed(1)
        return indice
    }

    calcularResultado(indice) {
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
        return resultado
    }

    mostrarResultado(indice, resultado) {
        return `Tu IMC es ${indice}, lo que indica que tu peso est\u00E1 en la categor\u00EDa de ${resultado} para adultos de tu misma estatura.`
    }
}

var opciones = [
    "1. CALCULAR INDICE\n",
    "2. LISTAR INDICES\n",
    "3. BORRAR INDICE\n",
    "4. BUSCAR INDICE\n",
    "5. TERMINAR\n"
];

var listadoDeIMC = []

mostrarMenu()

function mostrarMenu() {
    let opcionSeleccionada = 0;
    let listado = "";
    opciones.forEach((opcion) => { listado += opcion })

    while (opcionSeleccionada !== 5) {
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
                    borrarIndice();
                    break;
                }
            case 4:
                {
                    buscarIndice();
                    break;
                }
            case 5:
                {
                    break;
                }
            default:
                {
                    alert("OPCION INVÁLIDA");
                    break;
                }
        }
    }
}

function agregarIndice() {

    const peso = prompt("Ingresa tu peso en kilogramos");
    while ((peso) < 0 || isNaN(peso)) {
        alert("El peso es inv\u00E1lido");
        peso = prompt("Ingresa tu peso en kilogramos");
    }
    const altura = prompt("Ingresa tu altura en metros");
    while ((altura) < 0 || isNaN(altura)) {
        alert("La altura es inv\u00E1lida");
        altura = prompt("Ingresa tu altura en metros");
    }

    const calculadora = new IndiceMasaCorporal(peso, altura)
    const id = listadoDeIMC.length + 1
    const indice = (calculadora.calcularIndice(peso, altura))
    const resultado = (calculadora.calcularResultado(indice))
    const nuevoIMC = {
        "Identificador": id,
        "Indice de masa corporal": indice,
        "Resultado": resultado
    }
    alert(calculadora.mostrarResultado(indice, resultado))
    listadoDeIMC.push(nuevoIMC)
}

function listarIndices() {
    if (listadoDeIMC.length === 0) {
        alert("El listado est\u00E1 vac\u00EDo")
    }
    else {
        console.log(listadoDeIMC)
        alert(JSON.stringify(listadoDeIMC, null, 4));
    }
}

function borrarIndice() {
    if (listadoDeIMC.length === 0) {
        alert("El listado est\u00E1 vac\u00EDo")
    }
    else {
        const id = parseInt(prompt("Ingrese el identificador"));
        const existe = listadoDeIMC.some((element) => element.Identificador === id)
        if (existe) {
            console.log("IMC EXISTE")
            const index =
                listadoDeIMC.indexOf((element) => element.Identificador === id)
            listadoDeIMC.splice(index, 1)
        }
        else {
            alert("NO EXISTE IMC")
        }
    }
}

function buscarIndice() {
    if (listadoDeIMC.length === 0) {
        alert("El listado est\u00E1 vac\u00EDo")
    }
    else {
        const filtro = prompt("Ingrese el identificador");
        const existe = listadoDeIMC.some((element) => element.Identificador === filtro)
        if (existe) {
            const coincidencias = listadoDeIMC.filter((elemento) => elemento.Identificador == filtro)
            console.log(coincidencias)
            alert(JSON.stringify(coincidencias, null, 4));
        }
        else {
            alert("Identificador no encontrado")
        }
    }
}
















