import React, {FC, useEffect, useMemo, useRef} from 'react';
import clsx from 'clsx';

import {useFormContext2} from '@renderer/hooks/useFormContext';
import {Loader} from '@renderer/components/FormElements';

import * as S from './Styles';
import {ButtonColor, ButtonType, ButtonVariant} from './types';

export {ButtonColor, ButtonType, ButtonVariant};

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

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e?.preventDefault();
    if (buttonIsDisabled) return;

    if (type === ButtonType.submit) handleSubmit?.();

    if (type === ButtonType.reset) handleReset?.();

    if (type === ButtonType.button) onClick?.(e);
  };

  return (
    <S.Button
      className={clsx('Button', className)}
      color={color}
      disabled={buttonIsDisabled}
      fullWidth={fullWidth}
      onClick={handleClick}
      ref={buttonRef}
      type={type}
      variant={variant}
    >
      {type === ButtonType.submit && submitting ? <Loader /> : children}
    </S.Button>
  );
};

export default Button;
