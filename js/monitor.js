//Constructor de clase
class ValorGlicemia {
    constructor(valor) {
        this.valor = valor
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
    btnAgregarRegistro.addEventListener("click", () => {
        registrarValor()
    })
}

function registrarValor() {
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
    let fechaRegistro = new Date(fechaFormateada[0], fechaFormateada[1] - 1, fechaFormateada[2])
    let fechaActualMils = fechaActual.getTime()
    let fechaRegistroMils = fechaRegistro.getTime()
    let ultimoIndice = listadoDeValores[listadoDeValores.length - 1]
    const id = ultimoIndice !== undefined ? ultimoIndice.id + 1 : 0
    let nodoError = document.getElementById("mensaje-error")
    let nuevoValor = {
        id: id,
        fecha: `${fechaFormateada[2]}/${fechaFormateada[1]}/${fechaFormateada[0]}`,
        desayunoAntes: glicemiaDesayunoAntes,
        desayunoDespues: glicemiaDesayunoDespues,
        almuerzoAntes: glicemiaAlmuerzoAntes,
        almuerzoDespues: glicemiaAlmuerzoDespues,
        meriendaAntes: glicemiaMeriendaAntes,
        meriendaDespues: glicemiaMeriendaDespues,
        cenaAntes: glicemiaCenaAntes,
        cenaDespues: glicemiaCenaDespues
    }

    if (fecha.trim() === "") {
        nodoError.innerHTML = ""
        mostrarError("empty")
    }
    else {
        if (fechaRegistroMils > fechaActualMils) {
            nodoError.innerHTML = ""
            mostrarError("fecha")
        }
        else {
            nodoError.innerHTML = ""
            listadoDeValores.push(nuevoValor)
            cargarTablaResultadosGlicemia()
            persistirDatos()
            mostrarBotonLimpiar()
        }
    }
}

function mostrarError(tipo) {
    const nodoError = document.getElementById("mensaje-error")
    const errorMessage = document.createElement("errorMessage")
    errorMessage.setAttribute("id", "errorMessage")
    tipo === "empty" ? errorMessage.innerHTML =
        `<span id="error">Error! Debes ingresar una fecha.</span>` : errorMessage.innerHTML =
    `<span id="error-fecha">Error! La fecha no puede ser mayor a hoy</span>`

    const ebody = document.createElement("ebody")
    errorMessage.appendChild(ebody)
    nodoError.appendChild(errorMessage)
}

function mostrarBotonLimpiar() {
    const nodoBoton = document.getElementById("btnLimpiarFormulario")
    nodoBoton.innerHTML = ""
    const recalcularBtn = document.createElement("limpiarBtn")
    recalcularBtn.setAttribute("id", "limpiarBtn")
    recalcularBtn.innerHTML =
        `<button type="reset" class="btn btn-info btn-lg">
        Limpiar formulario
    </button>`

    const bbody = document.createElement("bbody")
    recalcularBtn.appendChild(bbody)
    nodoBoton.appendChild(recalcularBtn)
}

function cargarTablaResultadosGlicemia() {
    const nodoResultados = document.getElementById("divRegistrosGlicemia")
    nodoResultados.innerHTML = ""
    const table = document.createElement("table")
    table.setAttribute("class", "table table-bordered")
    table.setAttribute("id", "listaRegistros")
    table.innerHTML =
        `
    <tr>
    <th colspan=1>Fecha</th>
              <th colspan=2>Desayuno</th>
                  <th colspan=2>Almuerzo</th>
                  <th colspan=2>Merienda</th>
                  <th colspan=2>Cena</th>
                  <th colspan=1>Acciones</th>
          </tr>
          
               `
    const tbody = document.createElement("tbody")
    for (const registro of listadoDeValores) {
        const tr = document.createElement("tr")
        tr.innerHTML = `<td>${registro.fecha}</td>
                      <td>${registro.desayunoAntes}</td>
                      <td>${registro.desayunoDespues}</td>
                      <td>${registro.almuerzoAntes}</td>
                      <td>${registro.almuerzoDespues}</td>
                      <td>${registro.meriendaAntes}</td>
                      <td>${registro.meriendaDespues}</td>
                      <td>${registro.cenaAntes}</td>
                      <td>${registro.cenaDespues}</td>
                      <td>
                        <button id="btnBorrar${registro.id}" class="btn btn-danger" >
                            Borrar
                        </button>
                    </td>`;
        tr.setAttribute("id", `fila${registro.id}`)
        tbody.appendChild(tr)
    }
    table.appendChild(tbody)
    nodoResultados.appendChild(table)
    for (const registro of listadoDeValores) {
        let boton = document.getElementById(`btnBorrar${registro.id}`)
        boton.onclick = () => borrarIndice(registro.id)
    }
}

function borrarIndice(id) {
    let listadoDeIndices = JSON.parse(localStorage.getItem("ArrayDeRegistros"))
    let indiceAEliminar = listadoDeIndices.findIndex(element => element.id === id)
    listadoDeIndices.splice(indiceAEliminar, 1)
    listadoDeValores.splice(indiceAEliminar, 1)
    localStorage.setItem("ArrayDeRegistros", JSON.stringify(listadoDeIndices))
    let lineaRegistro = document.getElementById(`fila${id}`)
    lineaRegistro.remove()
}

function persistirDatos() {
    localStorage.setItem("ArrayDeRegistros", JSON.stringify(listadoDeValores))
}









