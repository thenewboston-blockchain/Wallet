/* eslint-disable react/jsx-props-no-spreading */

import React, {SyntheticEvent} from 'react';
import {Field, FieldInputProps} from 'formik';
import {SFC} from '@renderer/types';
import * as S from './Styles';

export interface SwitchProps {
  checked?: boolean;
  disabled?: boolean;
  focused?: boolean;
  label?: string;
  name?: string;
  onChange?(e: SyntheticEvent): void;
  value?: string;
}

const Switch: SFC<SwitchProps> = ({
  checked,
  className,
  disabled = false,
  focused = false,
  label,
  name,
  onChange,
  value,
}) => {
  const baseProps = {
    className,
    control: <S.Switch autoFocus={focused} />,
    disabled,
    label,
  };

  const nonFormikProps = {
    checked,
    onChange,
  };

  return name ? (
    <Field name={name} value={value} type="checkbox">
      {({field}: {field: FieldInputProps<string>}) => (
        <S.FormControlLabel
          {...baseProps}
          {...field}
          checked={!!field.value}
          name={name}
          onChange={(e: SyntheticEvent) => {
            field.onChange(e);
            onChange?.(e);
          }}
        />
      )}
    </Field>
  ) : (
    <S.FormControlLabel {...baseProps} {...nonFormikProps} />
  );
};

export {S as SwitchStyles};
export default Switch;
