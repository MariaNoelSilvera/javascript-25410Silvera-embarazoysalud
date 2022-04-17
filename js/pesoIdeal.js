//Constructor de clase
class IndiceMasaCorporal {
    constructor(peso, altura) {
        this.peso = peso
        this.altura = altura
    }

    calcularResultado(indice) {
        let resultado = ""

        if (indice < 18.5) {
            resultado = "12,5-18 kg"
        }
        else if (indice >= 18.5 && indice <= 24.9) {
            resultado = "11,5-16 Kg"
        }
        else if (indice >= 25 && indice <= 29.9) {
            resultado = "7-11,5 Kg"
        }
        else {
            resultado = "5-9 Kg"
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
    if (localStorage.getItem("ArrayDePesos") !== null) {
        listadoDeIMC = JSON.parse(localStorage.getItem("ArrayDePesos"))
    }
}

function crearAccionCalcular() {
    const calcularBtn = document.querySelector("#calcularBtn")
    calcularBtn.addEventListener("click", () => {
        calcularIMC()
    })
}

function calcularIMC() {
    let pesoAntes = document.querySelector("#pesoAntes").value
    let pesoActual = document.querySelector("#pesoActual").value
    let altura = (document.querySelector("#altura").value)
    let fecha = document.querySelector("#fecha").value
    let semana = document.querySelector("#semana").value
    let alturaMts = altura / 100
    let fechaActual = new Date()
    let fechaFormateada = fecha.split("-")
    let fechaIMC = new Date(fechaFormateada[0], fechaFormateada[1] - 1, fechaFormateada[2])
    let fechaActualMils = fechaActual.getTime()
    let fechaIMCMils = fechaIMC.getTime()
    let nodoError = document.getElementById("mensaje-error")
    let calculadora = new IndiceMasaCorporal(pesoAntes, alturaMts)
    let ultimoIndice = listadoDeIMC[listadoDeIMC.length - 1]
    const id = ultimoIndice !== undefined ? ultimoIndice.id + 1 : 0
    let indice = (pesoAntes / (alturaMts * alturaMts)).toFixed(1)
    let resultado = (calculadora.calcularResultado(indice))
    let pesoGanado = pesoActual - pesoAntes
    let nuevoIMC = {
        id: id,
        pesoAntes: pesoAntes,
        pesoActual: pesoActual,
        indice: indice,
        resultado: resultado,
        pesoGanado: pesoGanado,
        semana: semana,
        fecha: `${fechaFormateada[2]}/${fechaFormateada[1]}/${fechaFormateada[0]}`
    }

    if (pesoAntes.trim() === "" || pesoActual.trim() === "" || altura.trim() === "" || fecha.trim() === "" || semana.trim() === "") {
        nodoError.innerHTML = ""
        mostrarError("empty")
    }
    else {
        if (fechaIMCMils > fechaActualMils) {
            nodoError.innerHTML = ""
            mostrarError("fecha")
        }
        else {
            if (semana < 1 || semana > 42) {
                nodoError.innerHTML = ""
                mostrarError("semanas")
            }
            else {
                nodoError.innerHTML = ""
                listadoDeIMC.push(nuevoIMC)
                mostrarResultadoPeso(pesoGanado, resultado)
                cargarTablaIndices()
                persistirDatos()
                mostrarBotonRecalcular()
            }
        }
    }
}
function borrarResultado() {
    const nodoResultado = document.getElementById("resultado-peso")
    nodoResultado.innerHTML = ""
}

function mostrarBotonRecalcular() {
    const nodoBoton = document.getElementById("btnRecalcularPeso")
    nodoBoton.innerHTML = ""
    const recalcularBtn = document.createElement("recalcularBtn")
    recalcularBtn.setAttribute("id", "recalcularBtn")
    recalcularBtn.innerHTML =
        `<button type="reset" class="btn btn-info btn-lg">
        Volver a calcular
    </button>`

    const bbody = document.createElement("bbody")
    recalcularBtn.appendChild(bbody)
    nodoBoton.appendChild(recalcularBtn)
    recalcularBtn.onclick = () => borrarResultado()
}

function mostrarError(tipo) {
    const nodoError = document.getElementById("mensaje-error")
    const errorMessage = document.createElement("errorMessage")
    errorMessage.setAttribute("id", "errorMessage")
    if (tipo === "empty") {
        errorMessage.innerHTML = `<span id="error">Error! Debes completar todos los campos</span>`
    } else if (tipo === "fecha") {
        errorMessage.innerHTML = `<span id="error-fecha">Error! La fecha no puede ser mayor a hoy</span>`
    } else if (tipo === "semanas") {
        errorMessage.innerHTML = `<span id="error-semanas">Error! Las semanas deben ser mayor a 1 y menor a 42</span>`
    }
    const ebody = document.createElement("ebody")
    errorMessage.appendChild(ebody)
    nodoError.appendChild(errorMessage)
}

function cargarTablaIndices() {
    const nodoIndices = document.getElementById("divListaIndices")
    nodoIndices.innerHTML = ""
    const table = document.createElement("table")
    table.setAttribute("id", "listaIndices")
    table.setAttribute("class", "table table-bordered")
    table.innerHTML =
        `<tr>
              <th>Peso Anterior</th>
              <th>Peso Actual</th>
              <th>Semanas</th>
              <th>Indice de masa corporal</th>
              <th>Peso ganado</th>
              <th>Aumento ideal</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>`
    const tbody = document.createElement("tbody")
    for (const indice of listadoDeIMC) {
        const tr = document.createElement("tr")
        tr.innerHTML = `<td>${indice.pesoAntes} kg</td>
                        <td>${indice.pesoActual} kg</td>
                        <td>${indice.semana}</td>
                      <td>${indice.indice}</td>
                      <td>${indice.pesoGanado} kg</td>
                      <td>${indice.resultado}</td>
                      <td>${indice.fecha}</td>
                      <td>
                        <button id="btnBorrar${indice.id}" class="btn btn-danger" >
                            Borrar
                        </button>
                    </td>`;
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
    let listadoDeIndices = JSON.parse(localStorage.getItem("ArrayDePesos"))
    let indiceAEliminar = listadoDeIndices.findIndex(element => element.id === id)
    listadoDeIndices.splice(indiceAEliminar, 1)
    listadoDeIMC.splice(indiceAEliminar, 1)
    localStorage.setItem("ArrayDePesos", JSON.stringify(listadoDeIndices))
    let lineaIMC = document.getElementById(`fila${id}`)
    lineaIMC.remove()
}

function mostrarResultadoPeso(pesoGanado, resultado) {
    const nodoResultado = document.getElementById("resultado-peso")
    nodoResultado.innerHTML = ""
    const resultadoPeso = document.createElement("resultado-peso")
    resultadoPeso.setAttribute("id", "resultado-peso")
    resultadoPeso.innerHTML =
        `<div id="resultadoPesoIdealTitle"> RESULTADO: </div>
        <div id="resultadoPesoIdeal"> Has ganado: ${pesoGanado} kgs.</div>
        <div id="resultadoPesoIdealDesc"> El aumento ideal de peso está entre ${resultado}, de acuerdo a tu Indice de Masa Corporal.</div>
        <table class="table table-striped" id="valoresNormales">
        <tbody>
            <tr>
                <th>Índice de masa corporal</th>
                <th>Aumento ideal</th>
            </tr>
        </tbody>
        <tbody>
            <tr>
                <td>
                    < 18.5</td>
                <td>12,5-18 kg</td>
            </tr>
            <tr>
                <td>Entre 18.5 y 24.9</td>
                <td>11,5-16 Kg</td>
            </tr>
            <tr>
                <td>Entre 25 y 29.9</td>
                <td>7-11,5 Kg</td>
            </tr>
            <tr>
                <td>Mayor a 30</td>
                <td>5-9 Kg</td>
            </tr>
        </tbody>
    </table>`
    const rbody = document.createElement("rbody")
    resultadoPeso.appendChild(rbody)
    nodoResultado.appendChild(resultadoPeso)
}

function persistirDatos() {
    localStorage.setItem("ArrayDePesos", JSON.stringify(listadoDeIMC))
}











