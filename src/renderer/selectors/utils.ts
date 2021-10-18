import {RootState} from '@shared/types';

export const getNthArg =
  (n: number) =>
  (state: RootState, ...args: any[]) =>
    args[n - 1];
