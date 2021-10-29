import {current, PayloadAction} from '@reduxjs/toolkit';

import {formatAddressFromNode} from 'renderer/utils/address';
import {IpcChannel} from 'shared/ipc';
import {
  AccountBalance,
  AccountNumber,
  AddressData,
  Dict,
  DictWithDataAndError,
  DictWithError,
  DictWithPaginatedResultsAndError,
  LocalStore,
  ManagedNode,
  NodeIdentifier,
  PaginatedResults,
} from 'shared/types';

export interface Address {
  address: string;
}
export interface Error {
  error: any;
}
export type PayloadActionWithAddress = PayloadAction<Address>;
export type PayloadActionWithDataAddress<T = undefined> = PayloadAction<Address & {data?: T}>;
export type PaginatedPayloadActionWithAddress<T = undefined> = PayloadAction<PaginatedResults<T> & Address>;
export type PayloadActionErrorWithAddress = PayloadAction<Error & Address>;

export type SetResults<T> = (payload: PaginatedResults<T> & Address) => PayloadAction<PaginatedResults<T> & Address>;
export type SetError = (payload: Address & Error) => PayloadAction<Address & Error>;

export const getStateName = (actionType: string) => actionType.split('/')[1] as keyof LocalStore;

export function changeActiveNodeReducer<T extends ManagedNode>(sliceName: string) {
  return (state: Dict<T>, {payload}: PayloadAction<T>) => {
    Object.values(state).forEach((node) => {
      node.is_default = formatAddressFromNode(node) === formatAddressFromNode(payload);
    });
    window.electron.ipcRenderer.send(IpcChannel.setStoreValue, {key: getStateName(sliceName), state: current(state)});
  };
}

export const clearLocalAndStateReducer = () => (_: any, action: PayloadAction<undefined>) => {
  window.electron.ipcRenderer.send(IpcChannel.clearStoreValue, getStateName(action.type));
  return {};
};

export const setBalanceReducer =
  () =>
  (state: Dict<AccountBalance>, {payload}: PayloadAction<AccountBalance>) => {
    const {account_number: accountNumber} = payload;
    const account = state[accountNumber];
    state[accountNumber] = account ? {...account, ...payload} : payload;
  };

export function setLocalAndAccountReducer<T extends AccountNumber>(sliceName: string) {
  return (state: any, {payload}: PayloadAction<T>) => {
    const {account_number: accountNumber} = payload;
    const account = state[accountNumber];
    state[accountNumber] = account ? {...account, ...payload} : payload;
    window.electron.ipcRenderer.send(IpcChannel.setStoreValue, {key: getStateName(sliceName), state: current(state)});
  };
}

export function setLocalAndStateReducer<T>() {
  return (_: any, action: PayloadAction<T>) => {
    window.electron.ipcRenderer.send(IpcChannel.setStoreValue, {key: getStateName(action.type), state: action.payload});
    return action.payload;
  };
}

export function setStateReducer<T>() {
  return (_: any, action: PayloadAction<T>) => action.payload;
}

export function setNodeReducer<T extends NodeIdentifier>() {
  return (state: any, action: PayloadAction<T>) => {
    const {node_identifier: nodeIdentifier} = action.payload;
    state[nodeIdentifier] = action.payload;
  };
}

export function setDataReducer<T>() {
  return (state: DictWithDataAndError<any>, {payload: {address, data}}: PayloadActionWithDataAddress<T>) => {
    if (!state[address]) {
      state[address] = {
        data,
        error: null,
      };
      return;
    }
    state[address].error = null;
    state[address].data = data;
  };
}

export function setDataErrorReducer() {
  return (state: DictWithDataAndError<any>, {payload: {address, error}}: PayloadActionErrorWithAddress) => {
    if (!state[address]) {
      state[address] = {
        data: null,
        error,
      };
      return;
    }
    state[address].error = error;
    state[address].data = null;
  };
}

export function setLocalAndAddressReducer<T extends AddressData>(sliceName: string) {
  return (state: any, {payload}: PayloadAction<T>) => {
    const address = formatAddressFromNode(payload);
    const node = state[address];
    state[address] = node ? {...node, ...payload} : payload;
    window.electron.ipcRenderer.send(IpcChannel.setStoreValue, {key: getStateName(sliceName), state: current(state)});
  };
}

export function setPaginatedResultReducer<T>() {
  return (
    state: DictWithPaginatedResultsAndError<T>,
    {payload: {address, count, next, previous, results}}: PaginatedPayloadActionWithAddress<T>,
  ) => {
    if (!state[address]) {
      state[address] = {
        count,
        error: null,
        next,
        previous,
        results,
      };
      return;
    }
    state[address].error = null;
    state[address].count = count;
    state[address].next = next;
    state[address].previous = previous;
    state[address].results = results;
  };
}

export function setPaginatedResultErrorReducer() {
  return (state: DictWithPaginatedResultsAndError<any>, {payload: {address, error}}: PayloadActionErrorWithAddress) => {
    if (!state[address]) {
      state[address] = {
        count: 0,
        error,
        next: null,
        previous: null,
        results: [],
      };
      return;
    }
    state[address].count = 0;
    state[address].error = error;
    state[address].next = null;
    state[address].previous = null;
    state[address].results = [];
  };
}

export function unsetDataReducer() {
  return (state: DictWithError, {payload: {address}}: PayloadActionWithAddress) => {
    delete state[address];
  };
}

export const unsetBalanceReducer =
  () =>
  (state: Dict<AccountBalance>, {payload: {account_number: accountNumber}}: PayloadAction<AccountNumber>) => {
    delete state[accountNumber];
  };

export function unsetLocalAndAccountReducer(sliceName: string) {
  return (state: any, {payload: {account_number: accountNumber}}: PayloadAction<AccountNumber>) => {
    delete state[accountNumber];
    window.electron.ipcRenderer.send(IpcChannel.clearStoreValue, getStateName(sliceName));
  };
}

export function unsetLocalAndAddressReducer(sliceName: string) {
  return (state: any, {payload}: PayloadAction<AddressData>) => {
    const address = formatAddressFromNode(payload);
    delete state[address];
    window.electron.ipcRenderer.send(IpcChannel.clearStoreValue, getStateName(sliceName));
  };
}
