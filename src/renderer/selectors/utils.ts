import {RootState} from 'shared/types';

export const getNthArg =
  (n: number) =>
  (_: RootState, ...args: any[]) =>
    args[n - 1];
