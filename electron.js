

// Imports
const { app, BrowserWindow } = require('electron')

// Window object
let win;

// Create Window
function createWindow () {

  // Initilizes window
  win = new BrowserWindow({
    width: 1000,
    height: 1000 / 16 * 10,
    frame: false,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // Loads index
  win.loadFile('./publics/index.html');

  // Opens the DevTools
  win.webContents.openDevTools();

  // Closes window
  win.on('closed', () => {
    win = null;
  });

}

// Events
// On ready
app.on ('ready', createWindow);

// On all windows closed
app.on ('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit ();
  }
});

// On activate
app.on ('activate', () => {
  if (win === null) {
    createWindow ();
  }
});