function fechaEsValida(fecha) {

    var fechaPat = /^(\d{1,2})(\/|-)(\d{1,2})\2(\d{4})$/
    var matchArray = fecha.match(fechaPat)

    if (matchArray == null) {
        error = "Formato de fecha inválido"
        mostrarMensajeError(error)
        //nodoError.innerHTML = ""

        return false;
    }
    mes = matchArray[1]
    dia = matchArray[3]
    año = matchArray[4]

    if (mes < 1 || mes > 12) {

        error = "El mes debe ser entre 1 y 12."
        mostrarMensajeError(error)
        return false;
    }
    if (dia < 1 || dia > 31) {
        error = "El día debe ser entre 1 y 31."
        mostrarMensajeError(error)
        return false;
    }
    if ((mes == 4 || mes == 6 || mes == 9 || mes == 11) && dia == 31) {
        error = `El mes ${mes} no tiene 31 días!.`
        mostrarMensajeError(error)
        return false;
    }
    if (mes == 2) {
        var isleap = (año % 4 == 0 && (año % 100 != 0 || año % 400 == 0));
        if (dia > 29 || (dia == 29 && !isleap)) {
            error = `Febrero ${año} no tiene ${dia} días.`
            mostrarMensajeError(error)
            return false;
        }
    }
    return true;
}

function mostrarFecha(objFecha) {
    mes = objFecha.getMonth() + 1
    mes = (mes < 10) ? "0" + mes : mes
    dia = objFecha.getDate()
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
    ciclo = 0
    lutea = 0

    if (fechaEsValida(form.fum.value)) {
        fumIngresada = new Date(form.fum.value)
        fum.setTime(fumIngresada.getTime())
    } else return false

    ciclo = (form.ciclo.value == "" ? 28 : form.ciclo.value)
    lutea = (form.lutea.value == "" ? 14 : form.lutea.value)
    ovulacion.setTime(fum.getTime() + (ciclo * 86400000) - (lutea * 86400000))
    form.concepcion.value = mostrarFecha(ovulacion)

    fechaParto.setTime(ovulacion.getTime() + 266 * 86400000)
    form.fechaParto.value = mostrarFecha(fechaParto)

    var tiempoGestacion = 14 + 266 - ((fechaParto - hoy) / 86400000)
    semanas = parseInt(tiempoGestacion / 7)
    dias = Math.floor(tiempoGestacion % 7)
    tiempoGestacion = semanas + " semana" + (semanas > 1 ? "s" : "") + ", " + dias + " días"
    form.tiempoGestacion.value = tiempoGestacion
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
