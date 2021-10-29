import {GenericFunction} from '../generic';

interface IpcRendererApi {
  on(channel: string, callback: GenericFunction): void;
  removeListener(channel: string, callback: GenericFunction): void;
  send(channel: string, payload?: any): void;
}

interface ElectronApi {
  ipcRenderer: IpcRendererApi;
}

declare global {
  interface Window {
    electron: ElectronApi;
  }
}
