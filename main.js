console.log('main process working');

const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const url = require("url");

let win;

function createWindow() {

    //Creates window
    win = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true, // fixes "require not found" in devtools console
            enableRemoteModule: true // allows for remotes to be created (ie new windows)
        }
    });

    //HTML UI loaded into window
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true
    }));

    //Auto-opens devtools
    win.webContents.openDevTools();

    //Allows for closing of the application(s) for garbage collection
    win.on('closed', () =>{
        win = null;
    });
}

app.on('ready', createWindow);

/* only if on mac */
/*
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});
app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
});
*/