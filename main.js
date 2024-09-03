const { app, BaseWindow, WebContentsView, ipcMain } = require('electron')
const path = require('node:path')

function createWindow() {
    const defaultWidth = 1000
    const defaultHeight = 800
    const titlebarHeight = 46

    const win = new BaseWindow({ width: defaultWidth, height: defaultHeight, frame: false })

    const view1 = new WebContentsView({
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })
    win.contentView.addChildView(view1)
    view1.webContents.loadFile('index.html')
    view1.setBounds({ x: 0, y: 0, width: defaultWidth, height: titlebarHeight })

    const view2 = new WebContentsView()
    win.contentView.addChildView(view2)
    view2.webContents.loadURL('https://messenger.com/')
    view2.setBounds({ x: 0, y: titlebarHeight, width: defaultWidth, height: defaultHeight - titlebarHeight })

    win.on("resize", () => {
        const [width, height] = win.getSize()

        view1.setBounds({ x: 0, y: 0, width, height: titlebarHeight })
        view2.setBounds({ x: 0, y: titlebarHeight, width, height: height - titlebarHeight })
    })

}

app.whenReady().then(() => {
    createWindow()
})

ipcMain.on('close-app', () => {
    app.quit()
})



