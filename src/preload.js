const { contextBridge, ipcRenderer } = require("electron/renderer");

contextBridge.exposeInMainWorld("electronAPI", {
  closeApp: () => ipcRenderer.send("close-app"),
  debugLog: (...args) => ipcRenderer.send("debug-log", ...args),
  onMaximizeChanged: (listener) => {
    ipcRenderer.on("maximize", () => listener(true));
    ipcRenderer.on("unmaximize", () => listener(false));
  },
});
