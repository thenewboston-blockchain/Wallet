/* eslint-disable @typescript-eslint/no-unused-vars */

import {NumberSchema, StringSchema} from 'yup';

declare module 'yup' {
  interface NumberSchema {
    callbackWithRef(ref: any, cb: (thisValue: number, refValue: any) => boolean, message: string): NumberSchema;
  }
  interface StringSchema {
    equalTo(ref: any, message?: string): StringSchema;
    notEqualTo(ref: any, message?: string): StringSchema;
  }
}
