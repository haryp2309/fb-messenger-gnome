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
  const footerHeight = 12;

  const win = new BaseWindow({
    width: defaultWidth,
    height: defaultHeight,
    minHeight: 300,
    minWidth: 300,
    frame: false,
    transparent: true,
  });

  const titlebarView = new WebContentsView({
    webPreferences: {
      preload: path.join(__dirname, "titlebar/preload.js"),
      transparent: true,
    },
  });
  win.contentView.addChildView(titlebarView);
  titlebarView.webContents.loadFile(
    path.join(_relativeDirname, "titlebar/index.html"),
  );

  const contentView = new WebContentsView();
  win.contentView.addChildView(contentView);
  contentView.webContents.loadURL("https://messenger.com/");

  const footerView = new WebContentsView({
    webPreferences: {
      transparent: true,
    },
  });
  win.contentView.addChildView(footerView);
  footerView.webContents.loadFile(
    path.join(_relativeDirname, "footer/index.html"),
  );

  const updateBounds = (width, height) => {
    titlebarView.setBounds({ x: 0, y: 0, width, height: titlebarHeight });
    contentView.setBounds({
      x: 0,
      y: titlebarHeight,
      width,
      height: height - titlebarHeight - footerHeight,
    });
    footerView.setBounds({
      x: 0,
      y: height - footerHeight,
      width: width,
      height: footerHeight,
    });
  };

  updateBounds(defaultWidth, defaultHeight);

  win.on("resize", () => {
    const [width, height] = win.getSize();

    updateBounds(width, height);
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
