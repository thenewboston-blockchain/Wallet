import {BrowserWindow} from 'electron';

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;

class MainWindow {
  private static instance: BrowserWindow;

  public static createWindow(): void {
    MainWindow.instance = new BrowserWindow({
      height: 1080,
      webPreferences: {
        contextIsolation: false,
        nodeIntegration: true,
      },
      width: 1920,
    });

    MainWindow.instance.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  }

  public static exists(): boolean {
    return !!MainWindow.instance;
  }

  public static isMinimized(): boolean {
    if (!MainWindow.exists()) return false;

    return MainWindow.instance.isMinimized();
  }

  public static isFocused(): boolean {
    if (!MainWindow.exists()) return false;

    return MainWindow.instance.isFocused();
  }

  public static restore(): void {
    if (!MainWindow.exists()) return;

    MainWindow.instance.restore();
  }

  public static focus(): void {
    if (!MainWindow.exists()) return;

    MainWindow.instance.focus();
  }

  public static getNumOfWindows(): number {
    return BrowserWindow.getAllWindows().length;
  }

  public static reloadIgnoringCache(): void {
    if (!MainWindow.exists()) return;

    MainWindow.instance.webContents.reloadIgnoringCache();
  }
}

export default MainWindow;
