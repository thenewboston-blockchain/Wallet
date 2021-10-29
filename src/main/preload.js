/* eslint-disable @typescript-eslint/no-var-requires */
const {contextBridge, ipcRenderer} = require('electron');

const baseValidChannels = [
  'download-signing-key',
  'export-store-data',
  'import-store-data',
  'load-store-data',
  'set-store-value',
  'clear-store-value',
  'restart-app',
];

const successValidChannels = baseValidChannels.map((channel) => `${channel}-success`);
const failValidChannels = baseValidChannels.map((channel) => `${channel}-fail`);

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    on(channel, func) {
      const validChannels = [...baseValidChannels, ...successValidChannels, ...failValidChannels];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.on(channel, (event, ...args) => func(...args));
      }
    },
    removeListener(channel, func) {
      const validChannels = [...baseValidChannels, ...successValidChannels, ...failValidChannels];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.removeListener(channel, (event, ...args) => func(...args));
      }
    },
    send(channel, payload) {
      const validChannels = [...baseValidChannels, ...successValidChannels, ...failValidChannels];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.send(channel, payload);
      }
    },
  },
});
