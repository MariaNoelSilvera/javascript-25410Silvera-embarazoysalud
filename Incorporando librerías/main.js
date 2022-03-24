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

    mostrarResultado(nombre, indice, resultado) {
        return `${nombre}, tu IMC es ${indice}, lo que indica que tu peso est\u00E1 en la categor\u00EDa de ${resultado} para adultos de tu misma estatura.`
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
    let nombre = document.querySelector("#nombre").value
    let alturaMts = altura / 100
    let fechaActual = new Date()
    let fechaFormateada = fecha.split("-")
    let fechaIMC = new Date(fechaFormateada[0], fechaFormateada[1] - 1, fechaFormateada[2])
    let fechaActualMils = fechaActual.getTime()
    let fechaIMCMils = fechaIMC.getTime()
    let nodoError = document.getElementById("mensaje-error")
    let calculadora = new IndiceMasaCorporal(peso, alturaMts)
    let ultimoIndice = listadoDeIMC[listadoDeIMC.length - 1]
    //operador ternario
    const id = ultimoIndice !== undefined ? ultimoIndice.id + 1 : 0
    let indice = (peso / (alturaMts * alturaMts)).toFixed(1)
    let resultado = (calculadora.calcularResultado(indice))
    let resultadoDesc = (calculadora.mostrarResultado(nombre, indice, resultado))
    let nuevoIMC = {
        id: id,
        nombre: nombre,
        indice: indice,
        resultado: resultado,
        fecha: `${fechaFormateada[2]}/${fechaFormateada[1]}/${fechaFormateada[0]}`
    }

    if (peso.trim() === "" || altura.trim() === "" || fecha.trim() === "" || nombre.trim() === "") {
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
            mostrarResultado(resultadoDesc)
            sweetAlertPesoNormal(resultado, nombre)
            cargarTablaIndices()
            persistirDatos()
        }
    }
}

function mostrarResultado(resultadoDesc) {
    const nodoResultado = document.getElementById("resultado-imc")
    nodoResultado.innerHTML = ""
    const resultadoIMC = document.createElement("resultado-imc")
    resultadoIMC.setAttribute("id", "resultado-imc")
    resultadoIMC.innerHTML =
        `<H5> RESULTADO: </H5>
            <p> ${resultadoDesc} </p>`
    const rbody = document.createElement("rbody")
    resultadoIMC.appendChild(rbody)
    nodoResultado.appendChild(resultadoIMC)

}

function mostrarError(tipo) {
    const nodoError = document.getElementById("mensaje-error")
    const errorMessage = document.createElement("errorMessage")
    errorMessage.setAttribute("id", "errorMessage")
    //operador ternario
    tipo === "empty" ? errorMessage.innerHTML =
        `<span id="error">Error! Debes completar todos los campos</span>` : errorMessage.innerHTML =
    `<span id="error-fecha">Error! La fecha no puede ser mayor a hoy</span>`

    const ebody = document.createElement("ebody")
    errorMessage.appendChild(ebody)
    nodoError.appendChild(errorMessage)
}

function cargarTablaIndices() {
    const nodoIndices = document.getElementById("divListaIndices")
    nodoIndices.innerHTML = ""
    const table = document.createElement("table")
    table.setAttribute("id", "listaIndices")
    table.innerHTML =
        `<tr>
              <th>Identificador</th>
              <th>Nombre</th>
              <th>Indice de Masa Corporal</th>
              <th>Resultado</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>`
    const tbody = document.createElement("tbody")
    for (const indice of listadoDeIMC) {
        const tr = document.createElement("tr")
        tr.innerHTML = `<td>${indice.id}</td>
                        <td>${indice.nombre}</td>
                      <td>${indice.indice}</td>
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
    for (const indice of listadoDeIMC) {
        let boton = document.getElementById(`btnBorrar${indice.id}`)
        boton.addEventListener("click", () => {
            Toastify({
                text: "Registro eliminado ",
                duration: 3000,
                gravity: 'top',
                position: 'right',
                style: {
                    background: 'red'
                }
            }).showToast();
        })
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

function sweetAlertPesoNormal(resultado, nombre) {

    if (resultado === "Peso normal") {
        Swal.fire({
            title: `¡Sigue así, ${nombre}!`,
            text: `Tu peso está en la categoría de ${resultado} para adultos de tu misma estatura.`,
            icon: "success",
            confirmButtonText: 'CERRAR'
        })
    }
    else {
        Swal.fire({
            title: `¡Ten cuidado, ${nombre}!`,
            text: `Tu peso está en la categoría de ${resultado} para adultos de tu misma estatura. Consulta a tu médico.`,
            icon: "warning",
            confirmButtonText: 'CERRAR'
        })
    }
}

function agregarAccionConToastify() {

    const nodo = document.querySelector("#btn");
    nodo.addEventListener("click", () => {
        Toastify({
            text: "ESTO ES UN SALUDO",
            duration: 3000,
            gravity: 'top',
            position: 'right'

        }).showToast();
    })




}








