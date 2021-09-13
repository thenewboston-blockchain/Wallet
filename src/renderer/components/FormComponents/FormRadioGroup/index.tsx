/* eslint-disable react/jsx-props-no-spreading */

import React, {useMemo, useState} from 'react';
import clsx from 'clsx';
import noop from 'lodash/noop';
import {bemify} from '@thenewboston/utils';

import {RadioProps, Radio} from '@renderer/components/FormElements';
import {useFormContext} from '@renderer/hooks';
import {BaseFormComponentProps, InputOption, SFC} from '@renderer/types';
import {renderFormError, renderFormLabel} from '@renderer/utils/forms/formComponents';

interface BaseRadioGroupProps extends Omit<RadioProps, 'checked'> {
  options: InputOption[];
}

type ComponentProps = BaseFormComponentProps<BaseRadioGroupProps>;

const FormRadioGroup: SFC<ComponentProps> = ({
  className,
  hideErrorText = false,
  label,
  options,
  required,
  ...baseRadioProps
}) => {
  const {name} = baseRadioProps;
  const {errors, setFieldTouched, setFieldValue, touched, values} = useFormContext();
  const [focusedIndex, setFocusedIndex] = useState<number>(0);

  const error = !!errors[name] && !!touched[name];

  const selectedOption = useMemo(() => {
    const value = values[name];
    return options.find((option) => option.value === value) || null;
  }, [name, options, values]);

  const handleClick = (value: string) => async (): Promise<void> => {
    setFieldTouched(name, true, false);
    setFieldValue(name, value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    const firstClassName = className?.split(' ')[0] || 'FormRadioGroup';
    if (focusedIndex !== options.length - 1 && (e.key === 'ArrowRight' || e.key === 'ArrowDown')) {
      const nextOptionClassName = `${firstClassName}__option-${focusedIndex + 1}`;
      const nextOption = document.querySelector(`.${nextOptionClassName}`) as any;
      if (!nextOption) return;
      setFocusedIndex(focusedIndex + 1);
      nextOption.focus?.();
    } else if (focusedIndex !== 0 && (e.key === 'ArrowLeft' || e.key === 'ArrowUp')) {
      const prevOptionClassName = `${firstClassName}__option-${focusedIndex - 1}`;
      const prevOption = document.querySelector(`.${prevOptionClassName}`) as any;
      if (!prevOption) return;
      setFocusedIndex(focusedIndex - 1);
      prevOption.focus?.();
    }
  };

  return (
    <div className={clsx('FormRadioGroup FormFieldComponent', className)}>
      {renderFormLabel({className, label, name, required})}
      {options.map((option, index) => {
        const selected = selectedOption?.value === option.value;
        return (
          <div className="FormField__option" key={option.value}>
            <Radio
              checked={selected}
              className={clsx('FormField__option-input', `FormRadioGroup__option-${index}`, {
                ...bemify(className, '__option-input'),
                ...bemify(className, `__option-${index}`),
              })}
              disabled={option.disabled}
              error={error && selected}
              onClick={handleClick(option.value)}
              onKeyDown={handleKeyDown}
              value={option.value}
            />
            <span
              className={clsx('FormField__option-label', {
                'FormField__option-label--disabled': option.disabled,
                ...bemify(className, '__option-label'),
                ...bemify(className, '__option-label--disabled', option.disabled || false),
              })}
              onClick={option.disabled ? noop : handleClick(option.value)}
            >
              {option.label}
            </span>
          </div>
        );
      })}
      {renderFormError({className, hideErrorText, name})}
    </div>
  );
};

export default FormRadioGroup;
