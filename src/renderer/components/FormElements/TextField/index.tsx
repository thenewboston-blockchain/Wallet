/* eslint-disable react/jsx-props-no-spreading */

import React, {ChangeEvent, FocusEvent, forwardRef, ReactNode} from 'react';
import {Field, FieldInputProps} from 'formik';
import {useFormContext} from '@renderer/hooks';
import {ClassName} from '@shared/types';

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
  onFocus?(e: FocusEvent<HTMLInputElement>): void;
  placeholder?: string;
  required?: boolean;
  type?: 'text' | 'number';
  value?: string;
}

const TextField = forwardRef<HTMLDivElement, TextFieldProps & ClassName>(
  (
    {
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
      onFocus,
      placeholder = 'Enter',
      required,
      type = 'text',
      value,
    },
    ref,
  ) => {
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
      onFocus,
      value,
    };

    return (
      <S.Container className={className} ref={ref}>
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
                onFocus={(e: FocusEvent<HTMLInputElement>) => {
                  onFocus?.(e);
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
  },
);

export {S as TextFieldStyles};
export default TextField;
