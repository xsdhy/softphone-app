const {app, BrowserWindow, Notification,ipcMain} = require('electron')
const path = require('node:path')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 550,
        height: 800,
        icon:path.join(__dirname, 'icons/logo.png'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })
    ipcMain.on('Notification', (event, title, content) => {
        let notification = new Notification({
            title: title,
            body: content,
        });
        notification.show()
        return notification
    })
    win.loadFile('index.html')
}
app.on('window-all-closed', () => {
    app.quit()
})
app.whenReady().then(() => {
    createWindow()
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})