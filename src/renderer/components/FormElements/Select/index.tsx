/* eslint-disable react/jsx-props-no-spreading */

import React, {ChangeEvent, FocusEvent, forwardRef, ReactNode, useCallback, useState} from 'react';
import {Field, FieldInputProps} from 'formik';
import {v4 as uuid} from 'uuid';
import {useFormContext} from '@renderer/hooks';
import {ClassName, SelectOption, SelectOptionMeta} from '@renderer/types';
import {truncateLongText} from '@renderer/utils/accounts';

import HelperText, {HelperTextType} from '../HelperText';
import * as S from './Styles';

export interface SelectProps {
  disabled?: boolean;
  emptyState?: ReactNode;
  focused?: boolean;
  helperText?: ReactNode;
  helperTextType?: HelperTextType;
  hideErrorText?: boolean;
  label: string;
  name?: string;
  onBlur?(e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>): void;
  onChange?(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void;
  onFocus?(e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>): void;
  options: SelectOption[];
  optionsMeta?: SelectOptionMeta;
  placeholder?: string;
  required?: boolean;
  value?: any;
}

const Select = forwardRef<HTMLDivElement, SelectProps & ClassName>(
  (
    {
      className,
      disabled = false,
      emptyState,
      focused = false,
      helperText,
      helperTextType,
      label,
      name,
      onBlur,
      onChange,
      onFocus,
      options,
      optionsMeta,
      placeholder,
      required = false,
      value = '',
    },
    ref,
  ) => {
    const {errors, touched} = useFormContext();
    const [id] = useState<string>(uuid());
    const error = name ? !!errors[name] && !!touched[name] : false;

    const renderOption = useCallback(
      (optionValue: string): ReactNode => {
        if (!optionsMeta || !optionsMeta[optionValue]) return optionValue;

        const {accountNumber, nickname, amount} = optionsMeta[optionValue];

        const leftSection = (
          <S.DetailedOptionAccountSection>
            <S.DetailedOptionLabel $defaultValue={!nickname}>{nickname || 'Account'}</S.DetailedOptionLabel>
            <S.DetailedOptionValue>{truncateLongText(accountNumber || optionValue)}</S.DetailedOptionValue>
          </S.DetailedOptionAccountSection>
        );

        const rightSection =
          amount !== undefined ? (
            <S.DetailedOptionBalanceSection>
              <S.DetailedOptionLabel>Balance</S.DetailedOptionLabel>
              <S.DetailedOptionValue>{`${amount.toLocaleString()}.0000`}</S.DetailedOptionValue>
            </S.DetailedOptionBalanceSection>
          ) : null;

        return (
          <S.DetailedOption>
            {leftSection}
            {rightSection}
          </S.DetailedOption>
        );
      },
      [optionsMeta],
    );

    const baseProps = {
      autoFocus: focused,
      disabled,
      label: required ? `${label} *` : label,
      labelId: id,
      placeholder,
      renderValue: renderOption as (e: any) => ReactNode,
      required,
    };

    const nonFormikProps = {
      onBlur,
      onChange: onChange as any,
      onFocus,
      value,
    };

    const renderOptions = useCallback((): ReactNode => {
      if (!options.length) {
        return <S.OptionEmptyState>{emptyState || 'No available options.'}</S.OptionEmptyState>;
      }

      return options.map((option) => (
        <S.MenuItem autoFocus={option.focused} disabled={option.disabled} key={option.value} value={option.value}>
          {renderOption(option.value)}
        </S.MenuItem>
      ));
    }, [emptyState, options, renderOption]);

    return (
      <S.Container className={className} ref={ref}>
        <S.Label id={id} error={error} disabled={disabled} required={required}>
          {label}
        </S.Label>
        {name ? (
          <Field name={name}>
            {({field}: {field: FieldInputProps<string>}) => (
              <S.Select
                {...baseProps}
                {...field}
                error={error}
                onBlur={(e) => {
                  field.onBlur(e);
                  onBlur?.(e);
                }}
                onChange={(e) => {
                  field.onChange(e);
                  onChange?.(e as any);
                }}
                onFocus={(e) => {
                  onFocus?.(e);
                }}
              >
                {renderOptions()}
              </S.Select>
            )}
          </Field>
        ) : (
          <S.Select {...baseProps} {...nonFormikProps}>
            {renderOptions()}
          </S.Select>
        )}
        <HelperText name={name} type={helperTextType}>
          {helperText}
        </HelperText>
      </S.Container>
    );
  },
);

export {S as SelectStyles};
export default Select;
