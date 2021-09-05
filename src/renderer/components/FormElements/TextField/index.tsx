/* eslint-disable react/jsx-props-no-spreading */

import React, {ChangeEvent, FC, FocusEvent} from 'react';
import {ErrorMessage, Field} from 'formik';
import {useFormContext} from '@renderer/hooks';

import * as S from './Styles';

export interface BaseTextFieldProps {
  className?: string;
  disabled?: boolean;
  focused?: boolean;
  label: string;
  name?: string;
  onBlur?(e: FocusEvent<HTMLInputElement>): void;
  onChange?(e: ChangeEvent<HTMLInputElement>): void;
  placeholder?: string;
  required?: boolean;
  type?: 'text' | 'number';
  value?: string;
}

const TextField: FC<BaseTextFieldProps> = ({
  className,
  disabled = false,
  focused = false,
  label,
  name,
  onBlur,
  onChange,
  placeholder = 'Enter',
  required,
  type = 'text',
  value,
}) => {
  const {errors, touched} = useFormContext();
  const error = name ? !!errors[name] && !!touched[name] : false;

  const helperText = name ? <ErrorMessage name={name} /> : undefined;

  const baseProps = {
    autoFocus: focused,
    className,
    disabled,
    helperText,
    label,
    placeholder,
    required,
    type,
  };

  const nonFormikProps = {
    onBlur,
    onChange,
    value,
  };

  if (name) {
    return <Field {...baseProps} as={S.TextField} error={error} name={name} />;
  }
  return <S.TextField {...baseProps} {...nonFormikProps} />;
};

export default TextField;
