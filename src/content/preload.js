contextBridge.exposeInMainWorld("electronAPI", {
  onCtrlK: (callback) => ipcRenderer.on("ctrl-k", callback),
  debugLog: (...args) => ipcRenderer.send("debug-log", ...args),
});
