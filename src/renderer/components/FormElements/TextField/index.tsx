import React, {ChangeEvent, FC, FocusEvent} from 'react';
import clsx from 'clsx';
import {ErrorMessage, Field} from 'formik';
import {TextField as MuiTextField} from '@material-ui/core';
import {bemify} from '@thenewboston/utils';
import {useFormContext} from '@renderer/hooks';

import './TextField.scss';

export interface BaseTextFieldProps {
  className?: string;
  disabled?: boolean;
  focused?: boolean;
  fullWidth?: boolean;
  label?: string;
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
  fullWidth = true,
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
    className: clsx('TextField', className, {
      'TextField--error': error,
      ...bemify(className, '--error', error),
    }),
    disabled,
    fullWidth,
    helperText,
    InputLabelProps: {className: clsx('TextField__label', {...bemify(className, '__label')})},
    label,
    placeholder,
    required,
    type,
  };

  const muiProps: {
    size: 'small' | 'medium';
    variant: 'outlined';
  } = {
    size: 'small',
    variant: 'outlined',
  };

  const nonFormikProps = {
    onBlur,
    onChange,
    value,
  };

  if (name) {
    return <Field {...baseProps} {...muiProps} as={MuiTextField} error={error} name={name} />;
  }
  return <MuiTextField {...baseProps} {...muiProps} {...nonFormikProps} />;
};

export default TextField;
