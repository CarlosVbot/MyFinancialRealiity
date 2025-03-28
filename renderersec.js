async function guardarIngresos()  {
    for(let i = 0; i < ingresos.length; i++){
        ingresos[i].tipo = 'ingreso';
    }
    await window.api.guardarDatos(ingresos);
    window.electron.ventanaMain();
}

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

