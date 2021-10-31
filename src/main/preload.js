/* eslint-disable @typescript-eslint/no-var-requires */
const {Buffer} = require('buffer');
const {contextBridge, ipcRenderer} = require('electron');
const {sign} = require('tweetnacl');

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

function generateSignature(message, signingKey) {
  const encoder = new TextEncoder();
  const encodedData = encoder.encode(message);
  const signatureArray = sign(encodedData, signingKey);
  const signature = Buffer.from(signatureArray).toString('hex');
  return signature.substring(0, 128);
}

function getKeyPairDetails(keyPair) {
  const {publicKey, secretKey: signingKey} = keyPair;
  const publicKeyHex = Buffer.from(publicKey).toString('hex');
  const signingKeyHex = Buffer.from(signingKey).toString('hex');
  return {
    publicKey,
    publicKeyHex,
    signingKey,
    signingKeyHex: signingKeyHex.replace(publicKeyHex, ''),
  };
}

function getKeyPairFromSigningKeyHex(signingKeyHex) {
  const keyPair = sign.keyPair.fromSeed(Buffer.from(signingKeyHex, 'hex'));
  return getKeyPairDetails(keyPair);
}

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
  signing: {
    generateSignature,
    getKeyPairDetails,
    getKeyPairFromSigningKeyHex,
  },
});
