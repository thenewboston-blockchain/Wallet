/* eslint-disable react/jsx-props-no-spreading */

import React, {useEffect, useRef} from 'react';
import {SFC} from '@renderer/types';

import * as S from './Styles';

export enum CheckableInputType {
  checkbox = 'checkbox',
  radio = 'radio',
}

export interface CheckableInputProps {
  checked: boolean;
  className?: string;
  disabled?: boolean;
  error?: boolean;
  focused?: boolean;
  name?: string;
  onClick?(e?: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
  onKeyDown?(e?: React.KeyboardEvent<HTMLDivElement>): void;
  size?: number;
  totalSize?: number;
  unfocusable?: boolean;
  value: string;
}

const CheckableInput: SFC<CheckableInputProps & {type: CheckableInputType}> = ({
  checked,
  className,
  disabled = false,
  error = false,
  focused = false,
  name,
  onClick,
  onKeyDown,
  size,
  totalSize = size,
  unfocusable = false,
  type,
  value,
}) => {
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (focused) {
      iconRef.current?.focus();
    }
  }, [focused, iconRef]);

  const handleClick = onClick
    ? (e?: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        // blur if clicked. Don't blur if you pressed Enter on it.
        if (e?.detail === 1) {
          iconRef.current?.blur();
        }
        onClick(e);
      }
    : undefined;

  const iconProps = {
    $error: error,
    className,
    disabled,
    onClick: handleClick,
    onKeyDown,
    ref: iconRef,
    size,
    totalSize,
    unfocusable,
  };

  const checkedIcon =
    type === CheckableInputType.radio ? <S.CheckedRadio {...iconProps} /> : <S.CheckedCheckbox {...iconProps} />;
  const uncheckedIcon =
    type === CheckableInputType.radio ? <S.BlankRadio {...iconProps} /> : <S.BlankCheckbox {...iconProps} />;

  return (
    <>
      {checked ? checkedIcon : uncheckedIcon}
      <S.HiddenInput
        checked={checked}
        disabled={disabled}
        id={name || value}
        name={name || value}
        readOnly
        type={type}
        value={value}
      />
    </>
  );
};

export default CheckableInput;
