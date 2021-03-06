//Constructor de clase
class IndiceMasaCorporal {
    constructor(peso, altura) {
        this.peso = peso
        this.altura = altura
    }

    calcularResultado(indice) {
        let resultado = ""

        if (indice < 18.5) {
            resultado = "Bajo peso"
        }
        else if (indice >= 18.5 && indice <= 24.9) {
            resultado = "Peso normal"
        }
        else if (indice >= 25 && indice <= 29.9) {
            resultado = "Sobrepeso"
        }
        else if (indice >= 30 && indice <= 34.9) {
            resultado = "Obesidad grado I"
        }
        else if (indice >= 35 && indice <= 39.9) {
            resultado = "Obesidad grado II"
        }
        else if (indice >= 40 && indice <= 49.9) {
            resultado = "Obesidad grado III"
        }
        return resultado
    }
}
//Constantes y variables
let listadoDeIMC = []

//Funciones
function init() {
    precargarDatos()
    crearAccionCalcular()

}

function precargarDatos() {
    if (localStorage.getItem("ArrayDeIndices") !== null) {
        listadoDeIMC = JSON.parse(localStorage.getItem("ArrayDeIndices"))
        cargarTablaIndices()
    }
}

function crearAccionCalcular() {
    const calcularBtn = document.querySelector("#calcularBtn")
    calcularBtn.addEventListener("click", () => {
        calcularIMC()
    })
}

function calcularIMC() {
    let peso = document.querySelector("#peso").value
    let altura = (document.querySelector("#altura").value)
    let fecha = document.querySelector("#fecha").value
    let alturaMts = altura / 100
    let fechaActual = new Date()
    let fechaFormateada = fecha.split("-")
    let fechaIMC = new Date(fechaFormateada[0], fechaFormateada[1] - 1, fechaFormateada[2])
    let fechaActualMils = fechaActual.getTime()
    let fechaIMCMils = fechaIMC.getTime()
    let nodoError = document.getElementById("mensaje-error")
    let calculadora = new IndiceMasaCorporal(peso, alturaMts)
    let ultimoIndice = listadoDeIMC[listadoDeIMC.length - 1]
    const id = ultimoIndice !== undefined ? ultimoIndice.id + 1 : 0
    let indice = (peso / (alturaMts * alturaMts)).toFixed(1)
    let resultado = (calculadora.calcularResultado(indice))
    let nuevoIMC = {
        id: id,
        indice: indice,
        resultado: resultado,
        fecha: `${fechaFormateada[2]}/${fechaFormateada[1]}/${fechaFormateada[0]}`
    }

    if (peso.trim() === "" || altura.trim() === "" || fecha.trim() === "") {
        nodoError.innerHTML = ""
        mostrarError("empty")
    }
    else {
        if (fechaIMCMils > fechaActualMils) {
            nodoError.innerHTML = ""
            mostrarError("fecha")
        }
        else {
            nodoError.innerHTML = ""
            listadoDeIMC.push(nuevoIMC)
            mostrarResultadoDesc(indice, resultado)
            sweetAlertPesoNormal(resultado)
            persistirDatos()
            cargarTablaIndices()
            mostrarBotonRecalcular()
        }
    }
}

function mostrarResultadoDesc(indice, resultado) {
    const nodoResultado = document.getElementById("resultado-imc")
    nodoResultado.innerHTML = ""
    const resultadoIMC = document.createElement("resultado-imc")
    resultadoIMC.setAttribute("id", "resultado-imc")
    resultadoIMC.innerHTML =
        `<div id="resultadoIMCTitle"> RESULTADO: </div>
        <div id="resultadoIMC"> Tu IMC es ${indice}.</div>
        <div id="resultadoIMCDesc"> Esto indica que tu peso est\u00E1 en la categor\u00EDa de ${resultado} para adultos de tu misma estatura.</div>`
    nodoResultado.appendChild(resultadoIMC)
}

function borrarResultado() {
    const nodoResultado = document.getElementById("resultado-imc")
    nodoResultado.innerHTML = ""
}

function mostrarError(tipo) {
    const nodoError = document.getElementById("mensaje-error")
    const errorMessage = document.createElement("errorMessage")
    errorMessage.setAttribute("id", "errorMessage")
    tipo === "empty" ? errorMessage.innerHTML =
        `<span id="error">Error! Debes completar todos los campos</span>` : errorMessage.innerHTML =
    `<span id="error-fecha">Error! La fecha no puede ser mayor a hoy</span>`
    nodoError.appendChild(errorMessage)
}

function mostrarBotonRecalcular() {
    const nodoBoton = document.getElementById("btnRecalcularIMC")
    nodoBoton.innerHTML = ""
    const recalcularBtn = document.createElement("recalcularBtn")
    recalcularBtn.setAttribute("id", "recalcularBtn")
    recalcularBtn.innerHTML =
        `<button type="reset" class="btn btn-info btn-lg">
        Volver a calcular
    </button>`
    nodoBoton.appendChild(recalcularBtn)
    recalcularBtn.onclick = () => borrarResultado()
}

function cargarTablaIndices() {
    const nodoIndices = document.getElementById("divListaIndices")
    nodoIndices.innerHTML = ""
    const table = document.createElement("table")
    table.setAttribute("class", "table table-bordered")
    table.setAttribute("id", "listaIndices")
    table.innerHTML =
        `<thead id="tableHeader">
        <tr>
            <th>Fecha</th>
            <th>Indice de Masa Corporal</th>
            <th>Resultado</th>
            <th>Acciones</th>
        </tr>
        </thead>`
    const tbody = document.createElement("tbody")
    for (const indice of listadoDeIMC) {
        const tr = document.createElement("tr")
        tr.innerHTML = `<td>${indice.fecha}</td>
                        <td>${indice.indice}</td>
                        <td>${indice.resultado}</td>
                        <td>
                        <button id="btnBorrar${indice.id}" class="btn btn-danger" >
                            Borrar
                        </button></td>`;
        tr.setAttribute("id", `fila${indice.id}`)
        tbody.appendChild(tr)
    }
    table.appendChild(tbody)
    nodoIndices.appendChild(table)
    for (const indice of listadoDeIMC) {
        let boton = document.getElementById(`btnBorrar${indice.id}`)
        boton.onclick = () => borrarIndice(indice.id)
    }
}

function borrarIndice(id) {
    let listadoDeIndices = JSON.parse(localStorage.getItem("ArrayDeIndices"))
    let indiceAEliminar = listadoDeIndices.findIndex(element => element.id === id)
    listadoDeIndices.splice(indiceAEliminar, 1)
    listadoDeIMC.splice(indiceAEliminar, 1)
    localStorage.setItem("ArrayDeIndices", JSON.stringify(listadoDeIndices))
    let lineaIMC = document.getElementById(`fila${id}`)
    lineaIMC.remove()
}

function persistirDatos() {
    localStorage.setItem("ArrayDeIndices", JSON.stringify(listadoDeIMC))
}

function sweetAlertPesoNormal(resultado) {
    if (resultado === "Peso normal") {
        Swal.fire({
            title: `??Sigue as??!`,
            text: `Tu peso est?? en la categor??a de ${resultado} para adultos de tu misma estatura.`,
            icon: "success",
            confirmButtonText: 'CERRAR'
        })
    }
    else {
        Swal.fire({
            title: `??Ten cuidado!`,
            text: `Tu peso est?? en la categor??a de ${resultado} para adultos de tu misma estatura. Consulta a tu m??dico.`,
            icon: "warning",
            confirmButtonText: 'CERRAR'
        })
    }
}









