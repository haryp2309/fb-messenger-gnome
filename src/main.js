const {
  app,
  BaseWindow,
  WebContentsView,
  ipcMain,
  globalShortcut,
} = require("electron");
const path = require("node:path");

const _relativeDirname = "src";

function createWindow() {
  const defaultWidth = 1000;
  const defaultHeight = 800;
  const titlebarHeight = 46;

  const win = new BaseWindow({
    width: defaultWidth,
    height: defaultHeight,
    minHeight: 300,
    minWidth: 300,
    frame: false,
  });

  const view1 = new WebContentsView({
    webPreferences: {
      preload: path.join(__dirname, "titlebar/preload.js"),
    },
  });
  win.contentView.addChildView(view1);
  view1.webContents.loadFile(
    path.join(_relativeDirname, "titlebar/index.html"),
  );
  view1.setBounds({ x: 0, y: 0, width: defaultWidth, height: titlebarHeight });

  const view2 = new WebContentsView();
  win.contentView.addChildView(view2);
  view2.webContents.loadURL("https://messenger.com/");
  view2.setBounds({
    x: 0,
    y: titlebarHeight,
    width: defaultWidth,
    height: defaultHeight - titlebarHeight,
  });

  win.on("resize", () => {
    const [width, height] = win.getSize();

    view1.setBounds({ x: 0, y: 0, width, height: titlebarHeight });
    view2.setBounds({
      x: 0,
      y: titlebarHeight,
      width,
      height: height - titlebarHeight,
    });
  });
}

app.whenReady().then(() => {
  createWindow();
});

ipcMain.on("close-app", () => {
  app.quit();
});

ipcMain.on("debug-log", (event, ...args) => {
  console.log("DEBUG_LOG:", ...args);
});
