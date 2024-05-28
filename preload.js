const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
    createNotification: (title, content) =>{
        return ipcRenderer.send('Notification', title, content)
    }
})