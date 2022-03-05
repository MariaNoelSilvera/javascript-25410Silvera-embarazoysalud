const usuarios = [
    {
        nombre: "Santiago",
        apellido: "Avila",
        id: 1,
        profesion: "ing sistemas",
        activo: true
    },
    {
        nombre: "Juan",
        apellido: "Perez",
        id: 2,
        profesion: "contador",
        activo: false
    },
    {
        nombre: "Ana",
        apellido: "Rojas",
        id: 3,
        profesion: "abogada",
        activo: true
    },
    {
        nombre: "Petra",
        apellido: "Ruiz",
        id: 4,
        profesion: "",
        activo: false
    }
];

const opciones = [
    "1. LISTAR\n",
    "2. MODIFICAR\n",
    "3. AGREGAR\n",
    "4. BUSCAR\n",
    "5. BORRAR\n",
    "6. OBTENER NOMBRES COMPLETOS\n",
    "7. CALCULAR INACTIVOS\n",
    "8. ORDENAR\n",
    "9. TERMINAR\n"
];

/*
  0. Declarar una variable para almacenar la opcionn
  1. Mientras que opcion seleccionada !==9
    2. Mostrar las opciones
*/

let opcionSeleccionada = 0;
let listado = "";
opciones.forEach((opcion) => {
    listado += opcion;
}
);





while (opcionSeleccionada !== 9) {
    opcionSeleccionada = parseInt(prompt("Seleccione una opción:\n" + listado));

    switch (opcionSeleccionada) {

        case 1:
            {
                listarUsuarios();
                break;
            }
        case 2:
            {
                modificarUsuarios();
                break;
            }
        case 2:
            {
                modificarUsuarios();
                break;
            }
        case 3:
            {
                agregarUsuario();
                break;
            }
        case 4:
            {
                buscarUsuarios();
                break;
            }
        case 5:
            {
                borrarUsuario();
                break;
            }
        case 6:
            {
                obtenerNombresCompletos();
                break;
            }
        case 8:
            {
                ordenar();
                break;
            }
        default:
            {
                alert("OPCION INVÁLIDA");
                break;
            }

    }
}

function listarUsuarios() {
    alert(usuarios);
    usuarios.forEach((usuario) => console.log(usuario));

}

function modificarUsuarios() {
    const id = parseInt(prompt("Ingrese un id"));

    const usuarioBuscado = usuarios.find((usuario) => id === usuario.id);

    if (typeof usuarioBuscado !== 'undefined') {
        usuarioBuscado.nombre = prompt("Ingrese nuevo nombre");

    }
    else {
        alert("USUARIO NO EXISTE");
    }

}
function agregarUsuario() {
    //TODO COMPLETAR
}
function buscarUsuarios() {
    const filtro = prompt("Ingrese el criterio de búsqueda");

    const coincidencias = usuarios.filter((x) => {
        return x.apellido === filtro;
    })

    if (coincidencias) {
        console.log(coincidencias);
    }
    else {
        alert("NO HAY CONICIDENCIAS");
    }

}

function borrarUsuario() {
    const id = parseInt(prompt("Ingrese un id"));

    const existe = usuarios.some((usuario) => usuario.id === id);


    if (existe) {
        console.log("USUARIO EXISTE")
        const index =
            usuarios.indexOf((usuario) => usuario.id === id)
        usuarios.splice(index, 1)
    }
    else {
        alert("NO EXISTE USUARIO")
    }


}
function obtenerNombresCompletos() {

    const datosTransformados = usuarios.map((element) => {
        return {
            nombreCompleto: element.nombre + " " + element.apellido,
            id: element.id,
            activo: element.activo,
        }
    })
    console.log(usuarios);
    console.log(datosTransformados);
}

function ordenar() {

    usuarios.sort((a, b) => a.nombre > b.nombre)
    console.log(usuarios);

}


