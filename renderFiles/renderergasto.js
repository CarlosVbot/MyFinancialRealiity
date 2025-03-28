async function guardarGasto()  {
    for(let i = 0; i < gastos.length; i++){
        gastos[i].tipo = 'gasto';
    }
    await window.api.guardarDatos(gastos);
    window.electron.ventanaMain();
}

function regresar(){
    window.electron.ventanaMain();
}


async function cargarGastos() {
    let gastosGuardados =  await window.electron.cargarGastos();
    const tbody = document.getElementById('lista-gastos');
    tbody.innerHTML = '';
    if (gastosGuardados) {
        for(var i= 0; i<gastosGuardados.length ; i++){
            console.log(gastosGuardados[i])
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${gastosGuardados[i].descripcion}</td>
                <td>${gastosGuardados[i].cantidad}</td>
                <td>${gastosGuardados[i].frecuencia}</td>

                <td>
                    <button onclick="editarGasto(${i})">Editar</button>
                    <button onclick="eliminarGasto(${i})">Eliminar</button>
                </td>
            `;
            tbody.appendChild(row);
        }
    }
    gastos = gastosGuardados
    console.log(gastos)
}

window.onload = cargarGastos;


