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

    mostrarResultado(indice, resultado) {
        return `Tu IMC es ${indice}, lo que indica que tu peso est\u00E1 en la categor\u00EDa de ${resultado} para adultos de tu misma estatura.`
    }
}

var listadoDeIMC = []

function init() {
    programarBotones()
    precargarDatos()
}

function cargarTablaIndices() {
    const nodoIndices = document.getElementById("divListaIndices")
    nodoIndices.innerHTML = ""
    const table = document.createElement("table")
    table.setAttribute("id", "listaIndices")

    table.innerHTML =
        `<tr>
              <th>Identificador</th>
              <th>Indice de Masa Corporal</th>
              <th>Resultado</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>`

    const tbody = document.createElement("tbody")

    listadoDeIMC.forEach((indice) => {
        const tr = document.createElement("tr")
        tr.innerHTML = `<td>${indice.id}</td>
                      <td>${indice.indice}</td>
                      <td>${indice.resultado}</td>
                      <td>${indice.fecha}</td>
                      <td>
                        <button id="borrarIndiceBtn${indice.id}" class="btn btn-danger" >
                            Borrar
                        </button>
                    </td>`;
        $(`#eliminar${indice.id}`).on("click", () => {
            eliminarDelCarrito(alfajor.id);
        });
        tbody.appendChild(tr)
    })

    table.appendChild(tbody)
    nodoIndices.appendChild(table)
    crearAccionBorrar()
}

function crearAccionBorrar() {
    const borrarBtn = document.querySelector("#borrarIndiceBtn3")
    borrarBtn.addEventListener("click", () => {
        alert("borrar")
    })
}

function programarBotones() {
    crearAccionCalcular()
}

function crearAccionCalcular() {
    const calcularBtn = document.querySelector("#calcularBtn")
    calcularBtn.addEventListener("click", () => {
        calcularIMC()
    })
}

function calcularIMC() {
    const peso = document.querySelector("#peso").value
    const altura = document.querySelector("#altura").value
    const fecha = document.querySelector("#fecha").value
    const alturaMts = altura / 100

    if (peso.trim() === "" || altura.trim() === "" || fecha.trim() === "") {
        console.log("error")
    }
    else {
        const today = new Date()
        const fechaFormateada = fecha.split("-")
        const fechaIMC = new Date(fechaFormateada[0], fechaFormateada[1] - 1, fechaFormateada[2])
        const todayMils = today.getTime()
        const fechaIMCMils = fechaIMC.getTime()
        const nodoErrorFecha = document.getElementById("error-fecha")
        const nodoResultado = document.getElementById("resultado-imc")
        if (fechaIMCMils > todayMils) {
            nodoErrorFecha.innerHTML = ""
            const errorMessage = document.createElement("errorMessage")
            errorMessage.setAttribute("id", "errorMessage")
            errorMessage.innerHTML =
                `<span id="error-fecha">(La fecha no puede ser mayor a hoy)</span>`
            const ebody = document.createElement("ebody")
            errorMessage.appendChild(ebody)
            nodoErrorFecha.appendChild(errorMessage)
        }
        else {
            nodoErrorFecha.innerHTML = ""
            const calculadora = new IndiceMasaCorporal(peso, alturaMts)
            const id = listadoDeIMC.length + 1
            const indice = (peso / (alturaMts * alturaMts)).toFixed(1)
            const resultado = (calculadora.calcularResultado(indice))
            const resultadoDesc = (calculadora.mostrarResultado(indice, resultado))
            const nuevoIMC = {
                id: id,
                indice: indice,
                resultado: resultado,
                fecha: `${fechaFormateada[2]}/${fechaFormateada[1]}/${fechaFormateada[0]}`
            }

            listadoDeIMC.push(nuevoIMC)
            nodoResultado.innerHTML = ""
            const resultadoIMC = document.createElement("resultado-imc")
            resultadoIMC.setAttribute("id", "resultado-imc")
            resultadoIMC.innerHTML =
                `<p> ${resultadoDesc} </p>`
            const rbody = document.createElement("rbody")
            resultadoIMC.appendChild(rbody)
            nodoResultado.appendChild(resultadoIMC)
            cargarTablaIndices()
            persistirDatos()
        }
    }
}

function persistirDatos() {
    localStorage.setItem("IMC", JSON.stringify(listadoDeIMC, null, 4))
}

function precargarDatos() {
    if (localStorage.getItem("IMC") !== null) {
        listadoDeIMC = JSON.parse(localStorage.getItem("IMC"))
    }
}














