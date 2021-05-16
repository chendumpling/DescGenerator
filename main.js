console.log('main process working');

const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const url = require("url");
const Menu = electron.Menu;
const MenuItem = electron.MenuItem;

let win;

function createWindow() {

    //Creates window
    win = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true, // fixes "require not found" in devtools console
            enableRemoteModule: true // allows for remotes to be created (ie new windows)
        },
        width: 1400, 
        height: 650,
        resizable: false
    });

    //HTML UI loaded into window
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true
    }));

    //Auto-opens devtools (uncomment this to open devtools)
    //win.webContents.openDevTools();

    //Allows for closing of the application for garbage collection
    win.on('closed', () =>{
        win = null;
    });
}

app.on('ready', function(){
    
    //Toolbar menu
    createWindow();
    const template = [
        {
            label: 'Tools',
            submenu: [
                { 
                    label: 'Undo',
                    role: 'undo' 
                },
                { 
                    label: 'Redo',
                    role: 'redo' 
                },
            ]
        },
        {
            label: 'Reset',
            submenu: [
                {
                    label: 'Reset form',
                    click: function(){
                        win.reload();
                    }
                }
            ]
        },
        {
            label: 'About',
            click: function(){
                const { dialog } = require('electron');
                dialog.showMessageBox({
                    title: `About`,
                    detail: "Built for use by Avian Guitars\nProgrammed by ZiHao Wang"
                });
            }
        }
    ];
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    //Right-click menu
    const ctxMenu = new Menu();
    ctxMenu.append(new MenuItem(
        { 
            label: 'Undo',
            role: 'undo' 
        }));
    ctxMenu.append(new MenuItem(
        { 
            label: 'Redo',
            role: 'redo' 
        }));
    win.webContents.on('context-menu', function(event, params){
        //Params are where the right mouse button was clicked
        ctxMenu.popup(win, params.x, params.y)
    });
});

/* uncomment this if you're running the program on a mac
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