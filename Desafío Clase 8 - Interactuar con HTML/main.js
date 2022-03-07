function init() {
    cargarTareas();
    validarCampoTarea();

}

function cargarTareas() {
    const nodoTareas = document.getElementById("divListaTareas");

    const table = document.createElement("table");
    table.setAttribute("id", "listaTareas");
    table.setAttribute("class", "table table-hover table-bordered");

    table.innerHTML = `<thead>
            <tr>
              <th>ID</th>
              <th>Descripción</th>
              <th>Fecha Límite</th>
              <th>Acciones</th>
            </tr>
          </thead>`;

    const tbody = document.createElement("tbody");

    data.forEach((tarea) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td>${tarea.id}</td>
                      <td>${tarea.descripcion}</td>
                      <td>${tarea.fechaLimite}</td>
                      <td>
                        <button class="btn btn-danger" >
                            Borrar
                        </button>
                        <button class="btn btn-success" >
                            Marcar como terminada
                        </button>
                    </td>`;
        tbody.appendChild(tr);
    })

    table.appendChild(tbody);
    nodoTareas.appendChild(table);


}

function validarCampoTarea() {
    const input = document.querySelector("#formGroupExampleInput");

    alert(input.value);
}