import {LocalStore} from 'shared/types';

export enum IpcChannel {
  downloadSigningKey = 'download-signing-key',
  exportStoreData = 'export-store-data',
  importStoreData = 'import-store-data',
  loadStoreData = 'load-store-data',
  setStoreValue = 'set-store-value',
  clearStoreValue = 'clear-store-value',
  restartApp = 'restart-app',
}

export const getSuccessChannel = (channel: IpcChannel) => `${channel}-success`;

export const getFailChannel = (channel: IpcChannel) => `${channel}-fail`;

export interface DownloadSigningKeyPayload {
  accountNumber: string;
  signingKey: string;
}

export type SetStoreValuePayload<K extends keyof LocalStore> = {
  key: K;
  state: LocalStore[K];
};

export type ClearStoreValuePayload = keyof LocalStore;
