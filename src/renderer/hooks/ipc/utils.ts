import {useEffect} from 'react';
import {ipcRenderer} from 'electron';
import {GenericVoidFunction} from '@shared/types';

export const useIpcEffect = (channel: string, callback: GenericVoidFunction) => {
  useEffect(() => {
    ipcRenderer.on(channel, callback);

    return () => {
      ipcRenderer.removeListener(channel, callback);
    };
  }, [channel, callback]);
};
