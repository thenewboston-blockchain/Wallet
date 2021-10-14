import {useCallback} from 'react';
import {ipcRenderer} from 'electron';
import {GenericVoidFunction} from '@renderer/types';
import {getFailChannel, getSuccessChannel, IpcChannel} from '@shared/ipc';
import {useIpcEffect} from './utils';

function useReadIpc({
  channel,
  failCallback,
  successCallback,
}: {
  channel: IpcChannel;
  failCallback: GenericVoidFunction;
  successCallback: GenericVoidFunction;
}) {
  useIpcEffect(getSuccessChannel(channel), successCallback);
  useIpcEffect(getFailChannel(channel), failCallback);

  return useCallback(() => ipcRenderer.send(channel), [channel]);
}

export default useReadIpc;
