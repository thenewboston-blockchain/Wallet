import {FormikErrors, FormikTouched, useFormikContext} from 'formik';
import * as React from 'react';

interface Values {
  [field: string]: any;
}

interface UseFormContextOutput<V> {
  dirty: boolean;
  errors: FormikErrors<Values>;
  handleReset: (e?: React.SyntheticEvent<any>) => void;
  handleSubmit: (e?: React.SyntheticEvent<any>) => void;
  isValid: boolean;
  setFieldError(field: string, errorMsg: string): void;
  setFieldTouched(field: string, isTouched?: boolean, shouldValidate?: boolean): void;
  setFieldValue(field: string, value: any, shouldValidate?: boolean): void;
  touched: FormikTouched<Values>;
  validateForm(values?: any): Promise<FormikErrors<Values>>;
  values: V;
}

function useFormContext<V = Values>(): UseFormContextOutput<V> {
  const {
    dirty,
    errors,
    handleReset,
    handleSubmit,
    isValid,
    setFieldError,
    setFieldTouched,
    setFieldValue,
    touched,
    validateForm,
    values,
  } = useFormikContext<V>();

  return {
    dirty,
    errors,
    handleReset,
    handleSubmit,
    isValid,
    setFieldError,
    setFieldTouched,
    setFieldValue,
    touched,
    validateForm,
    values,
  };
}

// TODO: CONSOLIDATE THESE
export function useFormContext2<V = Values>(): Partial<UseFormContextOutput<V>> {
  const formikContext = useFormikContext<V>();

  const dirty = formikContext?.dirty || undefined;
  const errors = formikContext?.errors || undefined;
  const handleReset = formikContext?.handleReset || undefined;
  const handleSubmit = formikContext?.handleSubmit || undefined;
  const isValid = formikContext?.isValid || undefined;
  const setFieldError = formikContext?.setFieldError || undefined;
  const setFieldTouched = formikContext?.setFieldTouched || undefined;
  const setFieldValue = formikContext?.setFieldValue || undefined;
  const touched = formikContext?.touched || undefined;
  const validateForm = formikContext?.validateForm || undefined;
  const values = formikContext?.values || undefined;

  return {
    dirty,
    errors,
    handleReset,
    handleSubmit,
    isValid,
    setFieldError,
    setFieldTouched,
    setFieldValue,
    touched,
    validateForm,
    values,
  };
}

export default useFormContext;
