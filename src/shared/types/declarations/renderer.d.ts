import {SignKeyPair} from 'tweetnacl';
import {GenericFunction} from '../generic';

interface IpcRendererApi {
  on(channel: string, callback: GenericFunction): void;
  removeListener(channel: string, callback: GenericFunction): void;
  send(channel: string, payload?: any): void;
}

interface KeyPairDetails {
  publicKey: Uint8Array;
  publicKeyHex: string;
  signingKey: Uint8Array;
  signingKeyHex: string;
}

interface SigningApi {
  generateSignature(message: string, signingKey: Uint8Array): string;
  getKeyPairDetails(keyPair: SignKeyPair): KeyPairDetails;
  getKeyPairFromSigningKeyHex(signingKeyHex: string): KeyPairDetails;
}

interface ElectronApi {
  ipcRenderer: IpcRendererApi;
  signing: SigningApi;
}

declare global {
  interface Window {
    electron: ElectronApi;
  }
}
