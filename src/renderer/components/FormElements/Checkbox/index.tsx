/* eslint-disable react/jsx-props-no-spreading */

import React, {ReactNode} from 'react';
import {SFC} from '@renderer/types';
import * as S from './Styles';

export interface CheckboxProps {
  checked: boolean;
  disabled?: boolean;
  id?: string;
  error?: boolean;
  label?: ReactNode;
  name?: string;
  onClick?(e?: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
  onKeyDown?(e?: React.KeyboardEvent<HTMLButtonElement>): void;
  required?: boolean;
  value: string;
}

const Checkbox: SFC<CheckboxProps> = ({className, error = false, label, ...props}) => {
  const component = <S.Checkbox $error={error} className={label ? undefined : className} {...props} />;

  if (label) {
    return <S.FormControlLabel className={className} control={component} label={label} />;
  }

  return component;
};

export default Checkbox;
