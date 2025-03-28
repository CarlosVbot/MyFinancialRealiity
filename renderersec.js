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

/*async function agregarIngreso() {
    var descripcion = document.getElementById('descripcion').value;
    var cantidad = parseFloat(document.getElementById('cantidad').value);
    var frecuencia = document.getElementById('frecuencia').value;
    if (descripcion === '' || isNaN(cantidad)) {

        document.getElementById('descripcion').placeholder = 'Este campo es obligatorio';
        document.getElementById('cantidad').placeholder = 'Este campo es obligatorio';
        document.getElementById('frecuencia').value = 'diario';
        return true;
    }else{
        let salarioDiario;
        switch (frecuencia) {
            case 'diario':
                salarioDiario = cantidad;
                break;
            case 'semanal':
                salarioDiario = cantidad / 7;
                break;
            case 'mensual':
                salarioDiario = cantidad / 30;
                break;
            case 'anual':
                salarioDiario = cantidad / 365;
                break;
            default:
                salarioDiario = 0;
        }
        var nuevaFila = document.createElement('tr');
        var celdaDescripcion = document.createElement('td');
        var celdaCantidad = document.createElement('td');
        var celdaFrecuencia = document.createElement('td');
        if(frecuencia !== 'unico'){
            var celdaSalarioDiario = document.createElement('td');
        }

        celdaDescripcion.textContent = descripcion;
        celdaCantidad.textContent = '$' + cantidad.toFixed(2);
        celdaFrecuencia.textContent = frecuencia.charAt(0).toUpperCase() + frecuencia.slice(1);
        if(frecuencia !== 'unico') {
            celdaSalarioDiario.textContent = '$' + salarioDiario.toFixed(2);
        }
        nuevaFila.appendChild(celdaDescripcion);
        nuevaFila.appendChild(celdaCantidad);
        nuevaFila.appendChild(celdaFrecuencia);
        if(frecuencia !== 'unico') {
            nuevaFila.appendChild(celdaSalarioDiario);
        }
        document.getElementById('lista-ingresos').appendChild(nuevaFila);
        document.getElementById('descripcion').value = '';
        document.getElementById('cantidad').value = '';
        document.getElementById('frecuencia').value = 'diario';

    }

}*/

