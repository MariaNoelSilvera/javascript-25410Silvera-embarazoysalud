//Constructor de clase
class ValorGlicemia {
    constructor(valor) {
        this.valor = valor
    }

    calcularGlicemia(valor) {
        let resultado = ""

        if (valor >= 70 && valor <= 93) {
            resultado = "Normal en ayunas"
        }
        else if (valor > 93 && valor <= 140) {
            resultado = "Normal post comida"
        }
        else if (valor < 70) {
            resultado = "Hipoglucemia"
        }
        else if (valor > 140) {
            resultado = "Hiperglucemia"
        }
        return resultado
    }

    mostrarResultado(nombre, valor, resultado) {
        return `${nombre}, tu valor es ${valor}, lo que indica que tu nivel de glucosa en sangre es ${resultado}.`
    }
}
//Constantes y variables
let listadoDeValores = []

//Funciones
function init() {
    precargarDatos()
    crearAccionRegistrar()

}

function precargarDatos() {
    if (localStorage.getItem("ArrayDeValores") !== null) {
        listadoDeValores = JSON.parse(localStorage.getItem("ArrayDeValores"))
    }
}

function crearAccionRegistrar() {
    const btnAgregarRegistro = document.querySelector("#btnAgregarRegistro")
    calcularBtn.addEventListener("click", () => {
        registrarValor()
    })
}

function registrarValor() {
    let nombre = document.querySelector("#nombre").value
    let fecha = document.querySelector("#fecha").value
    let glicemiaDesayunoAntes = document.querySelector("#glicemiaDesayunoAntes").value
    let glicemiaDesayunoDespues = document.querySelector("#glicemiaDesayunoDespues").value
    let glicemiaAlmuerzoAntes = document.querySelector("#glicemiaAlmuerzoAntes").value
    let glicemiaAlmuerzoDespues = document.querySelector("#glicemiaAlmuerzoDespues").value
    let glicemiaMeriendaAntes = document.querySelector("#glicemiaMeriendaAntes").value
    let glicemiaMeriendaDespues = document.querySelector("#glicemiaMeriendaDespues").value
    let glicemiaCenaAntes = document.querySelector("#glicemiaCenaAntes").value
    let glicemiaCenaDespues = document.querySelector("#glicemiaCenaDespues").value

    let fechaActual = new Date()
    let fechaFormateada = fecha.split("-")
    let fechaIMC = new Date(fechaFormateada[0], fechaFormateada[1] - 1, fechaFormateada[2])
    let fechaActualMils = fechaActual.getTime()
    let fechaIMCMils = fechaIMC.getTime()
    let nodoError = document.getElementById("mensaje-error")
    let calculadora = new ValorGlicemia()
    let resultado = (calculadora.calcularResultado(indice))
    let resultadoDesc = (calculadora.mostrarResultado(nombre, resultado))
    let nuevoValor = {
        nombre: nombre,
        valor: valor,
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
            listadoDeValores.push(nuevoValor)
            mostrarResultado(resultadoDesc)
          //  sweetAlertPesoNormal(resultado, nombre)
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
    table.setAttribute("id", "listaRegistros")
    table.innerHTML =
        `<tr>
              <th>Nombre</th>
              <th>Valor</th>
              <th>Resultado</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>`
    const tbody = document.createElement("tbody")
    for (const registro of listadoDeIMC) {
        const tr = document.createElement("tr")
        tr.innerHTML = `<td>${registro.nombre}</td>
                      <td>${registro.valor}</td>
                      <td>${registro.resultado}</td>
                      <td>${registro.fecha}</td>
                      <td>
                        <button id="btnBorrar${registro.id}" class="btn btn-danger" >
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









