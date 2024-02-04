require("update-electron-app")({
  updateInterval: "5 minutes",
});
const { app, BrowserWindow } = require("electron");
const path = require("path");
const { ipcMain } = require("electron");

const services = require("./services");

let mainWindow;

const createWindow = async () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 750,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  mainWindow.loadFile("index.html");

};


app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.on("getTracking", async (event, params) => {
  await services.getTracking(params.data);
});
