const { app, BrowserWindow, Notification, ipcMain } = require('electron');
const path = require('node:path');

// hot reload - REMOVE WHEN DOING npm run make
require('electron-reload')(__dirname, {
  electron: require(`${__dirname}/../node_modules/electron`)
});

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

let win;
const createWindow = () => {
  // Create the browser window.
  win = new BrowserWindow({
    width: 300,
    height: 550,
    minWidth: 300,
    minHeight: 550,
    maxWidth: 900,
    maxHeight: 550,
    frame: false,  // disables the default OS window frame
    resizable: true,
    maximizable: false,
    fullscreenable: false,
    transparent: true,   // allows the background to be transparent
    hasShadow: false,    // optional: disables shadow around the window
    icon: '/images/icon.png',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    },
  });

  // and load the index.html of the app.
  win.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
  //mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

ipcMain.on("close-app", () => {
  win.close();
});

ipcMain.on('minimize-app', () => {
  win.minimize();
});

ipcMain.on('fold-info', () => {
  win.setSize(300, 550, true);
})

ipcMain.on('unfold-info', () => {
  win.setSize(900, 550, true);
})

const NOTIFICATION_TITLE = 'sippit';
const NOTIFICATION_BODY = 'Time to sip!';

function showNotification () {
  new Notification({ title: NOTIFICATION_TITLE, body: NOTIFICATION_BODY, icon: 'src/images/notification.png' }).show();
}

ipcMain.on('send-notif', () => {
  showNotification();
})