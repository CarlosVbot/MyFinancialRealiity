document.getElementById('generate').addEventListener('click', () => {
    window.electron.openSecondWindow();
});
const closeButton = document.getElementById('close-btn');
closeButton.addEventListener('click', () => {
    window.electron.closeApp();
});

document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('taskForm');
    const taskList = document.getElementById('taskList');

    taskForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const description = document.getElementById('taskDescription').value;
        const date = document.getElementById('taskDate').value;
        const duration = document.getElementById('taskDuration').value;
        const priority = document.getElementById('taskPriority').value;
        const completed = document.getElementById('taskCompleted').checked;

        const taskItem = document.createElement('li');

        taskItem.innerHTML = `
            <strong>${description}</strong><br>
            <strong>Fecha:</strong> ${date}<br>
            <strong>Duración:</strong> ${duration} minutos<br>
            <strong>Prioridad:</strong> ${priority}<br>
            <strong>Completada:</strong> ${completed ? 'Sí' : 'No'}
        `;

        if (completed) {
            taskItem.classList.add('completed');
        }

        taskList.appendChild(taskItem);

        taskForm.reset();
    });
});

window.onload = async  function() {
    let existe = await  window.api.comprobarDatos();
    console.log('Datos encontrados:', existe );
    var type = existe  ? 'none' : 'block';
    console.log(type);

    document.getElementById('overlay').style.display = type;
    document.getElementById('popup').style.display = type;

}

document.getElementById('guardar').addEventListener('click', async () => {
    const nuevosDatos = {
        nombre: document.getElementById('userName').value,
    };

    window.api.guardarDatos(nuevosDatos);

    window.api.log('Datos enviados para guardar:', nuevosDatos);

    document.getElementById('overlay').style.display = 'none';
    document.getElementById('popup').style.display = 'none';
});
