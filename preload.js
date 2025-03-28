const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    closeApp: () => {
        ipcRenderer.send('closeApp');
    },
    openSecondWindow: () => {
        ipcRenderer.send('open-second-window');
    },
    guardarLineas: () => ipcRenderer.invoke('comprobar'),
    agregarIngreso: () => ipcRenderer.invoke('agregar-ingreso'),
    ventanaMain: () => ipcRenderer.send('ventana-main'),
});

contextBridge.exposeInMainWorld('api', {
    comprobarDatos: () => ipcRenderer.invoke('comprobar-datos'),
    guardarDatos: (data) => ipcRenderer.send('guardar-en-json', data),
    log: (message) => console.log(message)
});