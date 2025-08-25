// Main Electron Process File
// This file controls the lifecycle of the Electron application and creates browser windows
// It runs in the main process (Node.js environment with full system access)

const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    title: 'ElectronFirstLaunchEatsFIrstOnClickEvent',
    webPreferences: {
      nodeIntegration: false,  // Security: don't allow Node.js in renderer
      contextIsolation: true,   // Security: isolate preload script context
      preload: path.join(__dirname, 'preload-electron.js')  // Bridge between main and renderer
    }
  });

  // Load the index.html file
  mainWindow.loadFile('index.html');

  // DevTools can be opened manually with F12 or Ctrl+Shift+I
  // mainWindow.webContents.openDevTools();

  // Handle window closed
  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

// This method will be called when Electron has finished initialization
app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    // On macOS, re-create a window when the dock icon is clicked
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});