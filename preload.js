const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    closeApp: () => {
        ipcRenderer.send('closeApp');
    },
    openSecondWindow: () => {
        ipcRenderer.send('open-second-window');
    },
    openGastosWindow: () => {
        ipcRenderer.send('open-gastos-window');
    },
    openmetricasWindow: () => {
        ipcRenderer.send('open-metricas-window');
    },
    guardarLineas: () => ipcRenderer.invoke('comprobar'),
    agregarIngreso: () => ipcRenderer.invoke('agregar-ingreso'),
    cargarIngresos: () => ipcRenderer.invoke('comprobar-ingresos'),
    cargarGastos: () => ipcRenderer.invoke('comprobar-gastos'),
    obtenerDatos: () => ipcRenderer.invoke('obtener-metricas-datos'),
    ventanaMain: () => ipcRenderer.send('ventana-main'),
});

contextBridge.exposeInMainWorld('api', {
    comprobarDatos: () => ipcRenderer.invoke('comprobar-datos'),
    guardarDatos: (data) => ipcRenderer.send('guardar-en-json', data),
    log: (message) => console.log(message)
});