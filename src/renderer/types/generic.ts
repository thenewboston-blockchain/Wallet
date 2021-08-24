import {FC} from 'react';

type GenericFunctionConstructor<T> = (...args: any[]) => T;

export type GenericFunction = GenericFunctionConstructor<any>;

export type GenericVoidFunction = GenericFunctionConstructor<void | Promise<void>>;

export type SFC<P = {}> = FC<{className?: string} & P>;
