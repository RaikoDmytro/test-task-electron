const { app, BrowserWindow } = require("electron");

require('@electron/remote/main').initialize();

const isMac = process.platform === "darwin";

const loadMainWindow = () => {
    const mainWindow = new BrowserWindow({
        width : 1200,
        height: 800,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
        }
    });

    mainWindow.loadURL('http://localhost:3000');
};

app.on("ready", loadMainWindow);

app.on("window-all-closed", () => {
    if (!isMac) {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) loadMainWindow();
})