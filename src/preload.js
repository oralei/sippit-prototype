// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  closeApp: () => ipcRenderer.send("close-app"),
  minimizeApp: () => ipcRenderer.send("minimize-app"),
  foldInfo: () => ipcRenderer.send('fold-info'),
  unfoldInfo: () => ipcRenderer.send('unfold-info'),
  showNotification: () => ipcRenderer.send('send-notif'),
});