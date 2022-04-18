function mostrarFecha(objFecha) {
    mes = objFecha.getMonth() + 1
    mes = (mes < 10) ? "0" + mes : mes
    dia = objFecha.getDate() + 1
    dia = (dia < 10) ? "0" + dia : dia
    año = objFecha.getYear()
    if (año < 2000) año += 1900
    return (dia + "/" + mes + "/" + año)
}

function calculadoraEmbarazo(form) {
    fum = new Date()
    ovulacion = new Date()
    fechaParto = new Date()
    hoy = new Date()

    fumIngresada = new Date(form.fum.value)
    fum.setTime(fumIngresada.getTime())
    document.getElementById("mensaje-error").innerHTML = ""

    ovulacion.setTime(fum.getTime() + (28 * 86400000) - (14 * 86400000))
    form.concepcion.value = mostrarFecha(ovulacion)

    fechaParto.setTime(ovulacion.getTime() + 266 * 86400000)
    form.fechaParto.value = mostrarFecha(fechaParto)

    var tiempoGestacion = 14 + 266 - ((fechaParto - hoy) / 86400000)
    semanas = parseInt(tiempoGestacion / 7)
    dias = Math.floor(tiempoGestacion % 7)
    tiempoGestacion = semanas + " semana" + (semanas > 1 ? "s" : "") + ", " + dias + " días"
    form.tiempoGestacion.value = tiempoGestacion
    mostrarBotonRecalcular()
    return false
}

function mostrarMensajeError(error) {
    const nodoError = document.getElementById("mensaje-error")
    const errorMessage = document.createElement("errorMessage")
    errorMessage.setAttribute("id", "errorMessage")
    nodoError.innerHTML = ""
    errorMessage.innerHTML = `<span id="error">Error! ${error}</span>`
    const ebody = document.createElement("ebody")
    errorMessage.appendChild(ebody)
    nodoError.appendChild(errorMessage)
}

function mostrarBotonRecalcular() {
    const nodoBoton = document.getElementById("btnRecalcularSemanas")
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
