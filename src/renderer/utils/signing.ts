import orderBy from 'lodash/orderBy';

import {Tx} from 'shared/types';

export const generateBlock = (
  balanceLock: string,
  publicKeyHex: string,
  signingKey: Uint8Array,
  transactions: Tx[],
) => {
  const message = {
    balance_key: balanceLock,
    txs: orderBy(transactions, ['recipient']),
  };
  const strMessage: string = JSON.stringify(message);
  const block = {
    account_number: publicKeyHex,
    message,
    signature: window.electron.signing.generateSignature(strMessage, signingKey),
  };
  return JSON.stringify(block);
};

export const generateSignedMessage = (message: any, publicKeyHex: string, signingKey: Uint8Array) => {
  const strMessage = JSON.stringify(message);
  const signedMessage = {
    message,
    node_identifier: publicKeyHex,
    signature: window.electron.signing.generateSignature(strMessage, signingKey),
  };
  return JSON.stringify(signedMessage);
};
