const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("versions", {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
});

contextBridge.exposeInMainWorld("tracking", {
  getTracking: (params) => ipcRenderer.send("getTracking", { data: params }),
  crawlData: (params) => ipcRenderer.send("crawlData", { data: params }),
});
