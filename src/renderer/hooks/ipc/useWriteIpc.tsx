import {useCallback} from 'react';
import {getFailChannel, getSuccessChannel, IpcChannel} from 'shared/ipc';
import {GenericVoidFunction} from 'shared/types';
import {useIpcEffect} from './utils';

function useWriteIpc<P = undefined>({
  channel,
  failCallback,
  payload,
  successCallback,
}: {
  channel: IpcChannel;
  failCallback: GenericVoidFunction;
  payload?: P;
  successCallback: GenericVoidFunction;
}) {
  useIpcEffect(getSuccessChannel(channel), successCallback);
  useIpcEffect(getFailChannel(channel), failCallback);

  return useCallback(() => window.electron.ipcRenderer.send(channel, payload), [channel, payload]);
}

export default useWriteIpc;
