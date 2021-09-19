import React, {SyntheticEvent, useMemo} from 'react';
import ReactSwitch from 'react-switch';

import {colors} from '@renderer/styles';
import {SFC} from '@renderer/types';

import * as S from './Styles';

export interface SwitchProps {
  checked: boolean;
  disabled?: boolean;
  id?: string;
  label?: string;
  name?: string;
  onChange(checked: boolean, e: MouseEvent | SyntheticEvent<MouseEvent | KeyboardEvent, Event>): void;
}

const Switch: SFC<SwitchProps> = ({checked, className, disabled = false, id, label, name, onChange}) => {
  const switchComponent = useMemo(
    () => (
      <ReactSwitch
        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
        checked={checked}
        checkedIcon={false}
        className={label ? undefined : className}
        disabled={disabled}
        handleDiameter={15}
        height={10}
        id={id}
        name={name}
        onChange={onChange}
        onColor={colors.palette.blue['100']}
        onHandleColor={colors.primary}
        uncheckedIcon={false}
        width={24}
      />
    ),
    [checked, className, disabled, id, label, name, onChange],
  );

  if (label) {
    return (
      <S.Label className={className} $disabled={disabled} htmlFor={id}>
        {switchComponent}
        <S.Text>{label}</S.Text>
      </S.Label>
    );
  }

  return switchComponent;
};

export {S as SwitchStyles};
export default Switch;
