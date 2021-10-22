/* eslint-disable no-console  */

import {app} from 'electron';
import installExtension, {REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS} from 'electron-devtools-installer';

import '@main/Menu';
import MainWindow from '@main/MainWindow';
import '@main/Store';
import '@main/IpcMain';

const isMac = process.platform === 'darwin';
const gotTheLock = app.requestSingleInstanceLock();

// if gotTheLock is false, another instance of application is already running
if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    // focus back to the previous instance, if someone tried to create new instance
    if (MainWindow.exists()) {
      if (MainWindow.isMinimized() || !MainWindow.isFocused()) {
        MainWindow.restore();
        MainWindow.focus();
      }
    }
  });
  app.whenReady().then(() => {
    installExtension([REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS])
      .then((name) => console.log(`Added Extension: ${name}`))
      .catch((error) => console.log('An error occurred: ', error));
  });
  app.on('ready', MainWindow.createWindow);
}

app.setName('TNB Wallet');

app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (!isMac) {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (MainWindow.getNumOfWindows() === 0) {
    MainWindow.createWindow();
  }
});
