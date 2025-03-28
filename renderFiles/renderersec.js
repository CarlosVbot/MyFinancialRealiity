async function guardarIngresos()  {
    for(let i = 0; i < ingresos.length; i++){
        ingresos[i].tipo = 'ingreso';
    }
    await window.api.guardarDatos(ingresos);
    window.electron.ventanaMain();
}

function regresar(){
    window.electron.ventanaMain();
}


async function cargarIngresos() {
    let ingresosGuardados =  await window.electron.cargarIngresos();
    const tbody = document.getElementById('lista-ingresos');
    tbody.innerHTML = '';
    console.log('ingresosGuardados');
    console.log(ingresosGuardados);
    if (ingresosGuardados) {
        for(var i= 0; i<ingresosGuardados.length ; i++){
            console.log(ingresosGuardados[i])
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${ingresosGuardados[i].descripcion}</td>
                <td>${ingresosGuardados[i].cantidad}</td>
                <td>${ingresosGuardados[i].frecuencia}</td>

                <td>
                    <button onclick="editarIngreso(${i})">Editar</button>
                    <button onclick="eliminarIngreso(${i})">Eliminar</button>
                </td>
            `;
            tbody.appendChild(row);
        }
    }
    ingresos = ingresosGuardados
    console.log(ingresos)
}

window.onload = cargarIngresos;


