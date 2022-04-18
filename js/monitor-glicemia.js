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
        cargarTablaResultadosGlicemia()
        mostrarBotonImprimir()
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
    let fechaFormateada = fecha.split("-")
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
        nodoError.innerHTML = ""
        listadoDeValores.push(nuevoValor)
        cargarTablaResultadosGlicemia()
        persistirDatos()
        mostrarBotonLimpiar()
    }
}

function mostrarError(tipo) {
    const nodoError = document.getElementById("mensaje-error")
    const errorMessage = document.createElement("errorMessage")
    errorMessage.setAttribute("id", "errorMessage")
    tipo === "empty" ? errorMessage.innerHTML =
        `<span id="error">Error! Debes ingresar una fecha.</span>` : errorMessage.innerHTML =
    `<span id="error-fecha">Error! La fecha no puede ser mayor a hoy</span>`
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
    nodoBoton.appendChild(recalcularBtn)
}

function mostrarBotonImprimir() {
    const nodoBotonImprimir = document.getElementById("btnImprimir")
    nodoBotonImprimir.innerHTML = ""
    const imprimirBtn = document.createElement("imprimirBtn")
    imprimirBtn.setAttribute("id", "imprimirBtn")
    imprimirBtn.innerHTML =
        `<button type="button" class="btn btn-info btn-lg"
        onclick="javascript:window.print()">Imprimir</button>`
    nodoBotonImprimir.appendChild(imprimirBtn)
}

function cargarTablaResultadosGlicemia() {
    const nodoResultados = document.getElementById("divRegistrosGlicemia")
    nodoResultados.innerHTML = ""
    const table = document.createElement("table")
    table.setAttribute("class", "table table-responsive table-bordered")
    table.setAttribute("id", "listaRegistros")
    table.innerHTML =
        `<thead id="tableHeader">
            <tr>
                <th colspan=1>Fecha </th>
                <th colspan=2>Desayuno (mg/dl)</th>
                <th colspan=2>Almuerzo (mg/dl)</th>
                <th colspan=2>Merienda (mg/dl)</th>
                <th colspan=2>Cena (mg/dl)</th>
                <th colspan=1>Acciones</th>
             </tr>
          </thead>`
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
        boton.onclick = () => borrarRegistro(registro.id)
    }
}

function borrarRegistro(id) {
    let listadoDeRegistros = JSON.parse(localStorage.getItem("ArrayDeValores"))
    let registroAEliminar = listadoDeRegistros.findIndex(element => element.id === id)
    listadoDeRegistros.splice(registroAEliminar, 1)
    listadoDeValores.splice(registroAEliminar, 1)
    localStorage.setItem("ArrayDeValores", JSON.stringify(listadoDeRegistros))
    let lineaRegistro = document.getElementById(`fila${id}`)
    lineaRegistro.remove()
}

function persistirDatos() {
    localStorage.setItem("ArrayDeValores", JSON.stringify(listadoDeValores))
}









