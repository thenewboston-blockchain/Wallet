import {useCallback} from 'react';
import {ipcRenderer} from 'electron';
import {GenericVoidFunction} from '@renderer/types';
import {getFailChannel, getSuccessChannel, IpcChannel} from '@shared/ipc';
import {useIpcEffect} from './utils';

function useWriteIpc<P>({
  channel,
  failCallback,
  payload,
  successCallback,
}: {
  channel: IpcChannel;
  failCallback: GenericVoidFunction;
  payload: P;
  successCallback: GenericVoidFunction;
}) {
  useIpcEffect(getSuccessChannel(channel), successCallback);
  useIpcEffect(getFailChannel(channel), failCallback);

  return useCallback(() => ipcRenderer.send(channel, payload), [channel, payload]);
}

export default useWriteIpc;
