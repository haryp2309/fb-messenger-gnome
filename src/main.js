const { app, BrowserWindow, ipcMain, globalShortcut } = require("electron");
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

  globalShortcut.register("CommandOrControl+k", () => {
    console.log("TOGGLE SHADOW WORKAROUND");
    win.webContents.send("toggleShadow");
  });

  if (process.env.TOGGLE_SHADOW_WORKAROUND === "1") {
    setTimeout(() => {
      win.webContents.send("toggleShadow");
    }, 1000);
  }
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
