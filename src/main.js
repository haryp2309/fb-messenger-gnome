const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("node:path");

const _relativeDirname = "src";

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    frame: false,
    transparent: true,
    webPreferences: {
      webviewTag: true,
      transparent: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile(path.join(_relativeDirname, "index.html"));

  win.on("maximize", (e) => {
    win.webContents.send("maximize");
  });

  win.on("unmaximize", (e) => {
    win.webContents.send("unmaximize");
  });
};

app.whenReady().then(() => {
  createWindow();
});

ipcMain.on("close-app", () => {
  app.quit();
});

ipcMain.on("debug-log", (event, ...args) => {
  console.log("DEBUG_LOG:", ...args);
});
