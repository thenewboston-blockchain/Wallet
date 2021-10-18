/* eslint-disable react/jsx-props-no-spreading */

import React, {ReactNode} from 'react';
import {SFC} from '@shared/types';
import * as S from './Styles';

export interface RadioProps {
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

const Radio: SFC<RadioProps> = ({className, error = false, label, ...props}) => {
  const component = <S.Radio $error={error} className={label ? undefined : className} {...props} />;

  if (label) {
    return <S.FormControlLabel className={className} control={component} label={label} />;
  }

  return component;
};

export {S as RadioStyles};
export default Radio;
