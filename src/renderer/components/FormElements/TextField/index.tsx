/* eslint-disable react/jsx-props-no-spreading */

import React, {ChangeEvent, FocusEvent, ReactNode} from 'react';
import {Field, FieldInputProps} from 'formik';
import {useFormContext} from '@renderer/hooks';
import {SFC} from '@renderer/types';

import HelperText, {HelperTextType} from '../HelperText';
import * as S from './Styles';

export interface TextFieldProps {
  disabled?: boolean;
  focused?: boolean;
  helperText?: ReactNode;
  helperTextType?: HelperTextType;
  label: string;
  multiline?: boolean;
  name?: string;
  onBlur?(e: FocusEvent<HTMLInputElement>): void;
  onChange?(e: ChangeEvent<HTMLInputElement>): void;
  placeholder?: string;
  required?: boolean;
  type?: 'text' | 'number';
  value?: string;
}

const TextField: SFC<TextFieldProps> = ({
  className,
  disabled = false,
  focused = false,
  helperText,
  helperTextType,
  label,
  multiline = false,
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

  const baseProps = {
    autoFocus: focused,
    disabled,
    label,
    multiline,
    placeholder,
    required,
    type,
  };

  const nonFormikProps = {
    onBlur,
    onChange,
    value,
  };

  return (
    <S.Container className={className}>
      {name ? (
        <Field name={name}>
          {({field}: {field: FieldInputProps<string>}) => (
            <S.TextField
              {...baseProps}
              {...field}
              error={error}
              onBlur={(e: FocusEvent<HTMLInputElement>) => {
                field.onBlur(e);
                onBlur?.(e);
              }}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                field.onChange(e);
                onChange?.(e);
              }}
            />
          )}
        </Field>
      ) : (
        <S.TextField {...baseProps} {...nonFormikProps} />
      )}
      <HelperText name={name} type={helperTextType}>
        {helperText}
      </HelperText>
    </S.Container>
  );
};

export default TextField;
