import React, {FC, useEffect, useRef} from 'react';
import clsx from 'clsx';

import * as S from './Styles';
import {ButtonColor, ButtonSize, ButtonType, ButtonVariant} from './types';

export {ButtonColor, ButtonSize, ButtonType, ButtonVariant};

export interface ButtonProps {
  className?: string;
  color?: ButtonColor;
  disabled?: boolean;
  focused?: boolean;
  fullWidth?: boolean;
  onClick?(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
  size?: ButtonSize;
  type?: ButtonType;
  variant?: ButtonVariant;
}

const Button: FC<ButtonProps> = ({
  children,
  className,
  color = ButtonColor.primary,
  disabled = false,
  focused = false,
  fullWidth = true,
  onClick,
  size = ButtonSize.regular,
  type = ButtonType.button,
  variant = ButtonVariant.contained,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (focused) {
      buttonRef.current?.focus();
    }
  }, [focused, buttonRef]);

  return (
    <S.Button
      className={clsx('Button', className)}
      $color={color}
      $fullWidth={fullWidth}
      disabled={disabled}
      onClick={onClick}
      ref={buttonRef}
      type={type}
      $size={size}
      $variant={variant}
    >
      {children}
    </S.Button>
  );
};

export default Button;
