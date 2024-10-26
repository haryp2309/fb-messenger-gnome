const { contextBridge, ipcRenderer } = require("electron/renderer");

contextBridge.exposeInMainWorld("electronAPI", {
  closeApp: () => ipcRenderer.send("close-app"),
  debugLog: (...args) => ipcRenderer.send("debug-log", ...args),
  setOnMaximizeChanged: (listener) => {
    ipcRenderer.on("maximize", () => listener(true));
    ipcRenderer.on("unmaximize", () => listener(false));
  },
  setOnShowShadowChannged: (listener) => {
    ipcRenderer.on("toggleShadow", () => listener());
  },
});
