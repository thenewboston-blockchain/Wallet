import React, {FC, useEffect, useRef} from 'react';
import clsx from 'clsx';
import {bemify} from '@thenewboston/utils';

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
  onClick?(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
  type?: ButtonType;
  variant?: ButtonVariant;
}

const Button: FC<BaseButtonProps> = ({
  children,
  color = ButtonColor.primary,
  className,
  disabled = false,
  focused = false,
  onClick,
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
    <button
      className={clsx('Button', `Button--${variant}`, `Button--${color}`, className, {
        'Button--disabled': disabled,
        ...bemify(className, `--${variant}`),
        ...bemify(className, `--${color}`),
        ...bemify(className, '--disabled', disabled),
      })}
      disabled={disabled}
      onClick={onClick}
      ref={buttonRef}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
