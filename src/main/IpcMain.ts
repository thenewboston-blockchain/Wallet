import {dialog, ipcMain, OpenDialogOptions, SaveDialogOptions} from 'electron';
import fs from 'fs';

import {
  ClearStoreValuePayload,
  DownloadSigningKeyPayload,
  getFailChannel,
  getSuccessChannel,
  IpcChannel,
  SetStoreValuePayload,
} from '../shared/ipc';
import {LocalStore} from '../shared/types';
import MainWindow from './MainWindow';
import Store from './Store';

ipcMain.on(IpcChannel.loadStoreData, (event) => {
  try {
    const state = Store.getStore();
    event.reply(getSuccessChannel(IpcChannel.loadStoreData), state);
  } catch (error: any) {
    console.log(`Failed to load store`, error);
    event.reply(getFailChannel(IpcChannel.loadStoreData), error.toString());
  }
});

ipcMain.on(IpcChannel.setStoreValue, (event, {key, state}: SetStoreValuePayload<keyof LocalStore>) => {
  try {
    Store.set(key, state);
    event.reply(getSuccessChannel(IpcChannel.setStoreValue));
  } catch (error: any) {
    console.log(`Failed to set Store of key ${key}`, error);
    event.reply(getFailChannel(IpcChannel.setStoreValue), error.toString());
  }
});

ipcMain.on(IpcChannel.clearStoreValue, (event, key: ClearStoreValuePayload) => {
  try {
    Store.set(key, {});
    event.reply(getSuccessChannel(IpcChannel.clearStoreValue));
  } catch (error: any) {
    console.log(`Failed to clear Store of key ${key}`, error);
    event.reply(getFailChannel(IpcChannel.clearStoreValue), error.toString());
  }
});

ipcMain.on(IpcChannel.downloadSigningKey, async (event, {accountNumber, signingKey}: DownloadSigningKeyPayload) => {
  const options: SaveDialogOptions = {
    buttonLabel: 'Save',
    defaultPath: `${accountNumber}.txt`,
    filters: [
      {extensions: ['txt'], name: 'txt'},
      {extensions: ['*'], name: 'All Files'},
    ],
    title: 'Save Signing Key',
  };

  try {
    const {canceled, filePath} = await dialog.showSaveDialog(options);
    if (canceled || !filePath) return;
    fs.writeFileSync(filePath, signingKey);
    event.reply(getSuccessChannel(IpcChannel.downloadSigningKey));
  } catch (error: any) {
    console.log(`Failed to save file: ${IpcChannel.downloadSigningKey}`, error);
    event.reply(getFailChannel(IpcChannel.downloadSigningKey), error.toString());
  }
});

ipcMain.on(IpcChannel.exportStoreData, async (event) => {
  const options: SaveDialogOptions = {
    buttonLabel: 'Export',
    defaultPath: 'store-data.json',
    filters: [
      {extensions: ['json'], name: 'json'},
      {extensions: ['*'], name: 'All Files'},
    ],
    title: 'Export Store Data',
  };

  try {
    const {canceled, filePath} = await dialog.showSaveDialog(options);
    if (canceled || !filePath) return;
    const data = JSON.stringify(Store.getStore());
    fs.writeFileSync(filePath, data);
    event.reply(getSuccessChannel(IpcChannel.exportStoreData));
  } catch (error: any) {
    console.log(`Failed to save file: ${IpcChannel.exportStoreData}`, error);
    event.reply(getFailChannel(IpcChannel.exportStoreData), error.toString());
  }
});

ipcMain.on(IpcChannel.importStoreData, async (event) => {
  const options: OpenDialogOptions = {
    buttonLabel: 'Import',
    filters: [
      {extensions: ['json'], name: 'json'},
      {extensions: ['*'], name: 'All Files'},
    ],
    title: 'Import Store Data',
  };

  try {
    const {canceled, filePaths} = await dialog.showOpenDialog(options);
    if (canceled || !filePaths.length) return;
    const filePath = filePaths[0];

    fs.readFile(filePath, 'utf-8', (err, jsonData) => {
      if (err) {
        throw err;
      }

      const data = JSON.parse(jsonData);
      if (!data.managed_banks) {
        event.reply(getFailChannel(IpcChannel.importStoreData), 'Data is improperly formatted');
        return;
      }
      // eslint-disable-next-line no-underscore-dangle
      if (data.__internal__) {
        // eslint-disable-next-line no-underscore-dangle
        delete data.__internal__;
      }

      Store.clear();
      Store.setStore(data);

      event.reply(getSuccessChannel(IpcChannel.importStoreData), data);
    });
  } catch (error: any) {
    console.log(`Failed to read file: ${IpcChannel.importStoreData}`, error);
    event.reply(getFailChannel(IpcChannel.importStoreData), error.toString());
  }
});

ipcMain.on(IpcChannel.restartApp, (event) => {
  try {
    console.log('Trying to restart app');
    MainWindow.getWebContents()?.reloadIgnoringCache();
    setTimeout(() => {
      event.reply(getSuccessChannel(IpcChannel.restartApp));
    }, 1000);
  } catch (error: any) {
    console.log('Failed to restart app', error);
    setTimeout(() => {
      event.reply(getFailChannel(IpcChannel.restartApp), error.toString());
    }, 1000);
  }
});
