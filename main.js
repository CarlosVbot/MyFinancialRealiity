const { app, BrowserWindow, ipcMain } = require('electron');
const path = require("path");
const fs = require("fs");

const windows = {};

const windowConfig = {
    width: 1800,
    height: 1600,
    fullscreen: true,
    webPreferences: {
        preload: path.join(__dirname, 'preload.js')
    }
};

function createMainWindow() {
    windows.main = new BrowserWindow({
        ...windowConfig,
        webPreferences: {
            ...windowConfig.webPreferences,
            nodeIntegration: true
        }
    });

    windows.main.loadFile('./HtmlFiles/index.html');

    windows.main.on('closed', () => {
        windows.main = null;
    });
}

function createSecondWindow() {
    windows.second = new BrowserWindow({
        ...windowConfig,
        webPreferences: {
            ...windowConfig.webPreferences,
            contextIsolation: true,
            enableRemoteModule: false,
            nodeIntegration: false
        }
    });

    windows.second.loadFile('./HtmlFiles/ingresos.html');
    windows.second.webContents.openDevTools();
    windows.second.on('closed', () => {
        windows.second = null;
    });
}

app.whenReady().then(createMainWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
});

ipcMain.on('closeApp', () => app.quit());

ipcMain.on('open-second-window', () => {
    createSecondWindow();
    if (windows.main) {
        windows.main.close();
    }
});

ipcMain.on('ventana-main', () => {
    createMainWindow();
    if (windows.second) {
        windows.second.close();
    }
});

ipcMain.handle('comprobar-datos', async (event) => {
    const filePath = path.join(__dirname, './data/Data.json');

    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, fileData) => {
            if (err) {
                console.error('Error leyendo el archivo:', err);
                reject(err);
                return;
            }
            let jsonData = {};
            try {
                jsonData = JSON.parse(fileData);
            } catch (e) {
                console.log("Error parseando JSON:", e);
                reject(e);
                return;
            }
            resolve(jsonData.nombre ? jsonData.nombre : false);
        });
    });
});

ipcMain.on('guardar-en-json', (event, nuevosDatos) => {
    const filePath = path.join(__dirname, './data/Data.json');
    fs.readFile(filePath, 'utf8', (err, fileData) => {
        if (err) {
            console.error('Error leyendo el archivo:', err);
            return;
        }
        let jsonData = {};
        try {
            jsonData = JSON.parse(fileData);
        } catch (e) {
            console.log("Error parseando JSON:", e);
        }
        Object.assign(jsonData, nuevosDatos)
        fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                console.error('Error escribiendo en el archivo:', err);
                return;
            }
            console.log('Datos guardados con éxito.');
        });
    });
});

ipcMain.handle('comprobar-ingresos', async (event) => {
    const filePath = path.join(__dirname, './data/Data.json');

    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, fileData) => {
            if (err) {
                console.error('Error leyendo el archivo:', err);
                reject(err);
                return;
            }
            let jsonData = {};
            try {
                jsonData = JSON.parse(fileData);
                var Objingresos =[]
                for( key in jsonData){
                    if(typeof jsonData[key] === 'object'){
                        if(jsonData[key].tipo === 'ingreso' ){
                            Objingresos.push({
                                "descripcion": jsonData[key].descripcion,
                                "cantidad": jsonData[key].cantidad,
                                "frecuencia": jsonData[key].frecuencia,
                                "tipo": "ingreso"
                            })
                        }
                    }
                  }

            } catch (e) {
                console.log("Error parseando JSON:", e);
                reject(e);
                return;
            }
            resolve(Objingresos);
        });
    });
});
