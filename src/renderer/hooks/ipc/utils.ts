import {useEffect} from 'react';
import {ipcRenderer} from 'electron';
import noop from 'lodash/noop';
import {GenericVoidFunction} from '@shared/types';

export const useIpcEffect = (channel: string, callback: GenericVoidFunction = noop) => {
  useEffect(() => {
    ipcRenderer.on(channel, callback);

    return () => {
      ipcRenderer.removeListener(channel, callback);
    };
  }, [channel, callback]);
};
