import React, {forwardRef, ReactNode} from 'react';
import clsx from 'clsx';

import * as S from './Styles';
import {ButtonColor, ButtonSize, ButtonType, ButtonVariant} from './types';

export interface ButtonProps {
  children: ReactNode;
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

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
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
    },
    ref,
  ) => {
    return (
      <S.Button
        className={clsx('Button', className)}
        $color={color}
        $fullWidth={fullWidth}
        disabled={disabled}
        autoFocus={focused}
        onClick={onClick}
        ref={ref}
        type={type}
        $size={size}
        $variant={variant}
      >
        {children}
      </S.Button>
    );
  },
);

export {ButtonColor, ButtonSize, ButtonType, ButtonVariant, S as ButtonStyles};
export default Button;
