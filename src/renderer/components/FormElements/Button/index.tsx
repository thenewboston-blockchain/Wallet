import React, {FC, useEffect, useMemo, useRef} from 'react';
import clsx from 'clsx';
import {bemify} from '@thenewboston/utils';

import {useFormContext2} from '@renderer/hooks/useFormContext';
import {Loader} from '@renderer/components/FormElements';
import './Button.scss';

export enum ButtonColor {
  primary = 'primary',
  // secondary = 'secondary',
  // tertiary = 'tertiary',
}

export enum ButtonType {
  button = 'button',
  reset = 'reset',
  submit = 'submit',
}

export enum ButtonVariant {
  contained = 'contained',
  link = 'link',
}

export interface BaseButtonProps {
  className?: string;
  color?: ButtonColor;
  disabled?: boolean;
  focused?: boolean;
  fullWidth?: boolean;
  ignoreDirty?: boolean;
  onClick?(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
  submitting?: boolean;
  type?: ButtonType;
  variant?: ButtonVariant;
}

const Button: FC<BaseButtonProps> = ({
  children,
  className,
  color = ButtonColor.primary,
  disabled = false,
  focused = false,
  fullWidth = true,
  ignoreDirty = false,
  onClick,
  submitting = false,
  type = ButtonType.button,
  variant = ButtonVariant.contained,
}) => {
  const {dirty, handleReset, handleSubmit, isValid} = useFormContext2();
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (focused) {
      buttonRef.current?.focus();
    }
  }, [focused, buttonRef]);

  const buttonIsDisabled = useMemo(() => {
    switch (type) {
      case ButtonType.submit:
        return disabled || (!ignoreDirty && !dirty) || !isValid || submitting;
      case ButtonType.reset:
        return disabled || (!ignoreDirty && !dirty) || submitting;
      default:
        return disabled || submitting;
    }
  }, [disabled, dirty, ignoreDirty, isValid, submitting, type]);

  console.log({dirty, isValid, buttonIsDisabled});

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e?.preventDefault();
    if (buttonIsDisabled) return;

    if (type === ButtonType.submit) handleSubmit?.();

    if (type === ButtonType.reset) handleReset?.();

    if (type === ButtonType.button) onClick?.(e);
  };

  return (
    <button
      className={clsx('Button', `Button--${variant}`, `Button--${color}`, className, {
        'Button--disabled': buttonIsDisabled,
        'Button--full-width': fullWidth,
        ...bemify(className, `--${variant}`),
        ...bemify(className, `--${color}`),
        ...bemify(className, '--disabled', buttonIsDisabled),
        ...bemify(className, '--full-width', fullWidth),
      })}
      disabled={buttonIsDisabled}
      onClick={handleClick}
      ref={buttonRef}
      type={type}
    >
      {type === ButtonType.submit && submitting ? <Loader /> : children}
    </button>
  );
};

export default Button;
