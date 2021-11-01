import {ChangeEvent, ReactNode} from 'react';

import {useFormContext2} from 'renderer/hooks';
import {CheckableInputOption, SFC} from 'shared/types';
import * as S from './Styles';

export interface RadioGroupProps {
  disabled?: boolean;
  error?: boolean;
  label?: ReactNode;
  name?: string;
  onChange?(e: ChangeEvent<HTMLInputElement>, value: string): void;
  options: CheckableInputOption[];
  required?: boolean;
  value?: string;
}

const RadioGroup: SFC<RadioGroupProps> = ({
  className,
  disabled = false,
  error = false,
  label,
  name,
  options,
  onChange,
  required = false,
  value,
}) => {
  const {setFieldValue, values} = useFormContext2();

  const valueToUse = name ? values?.[name] || value : value;

  const handleChange = (e: ChangeEvent<HTMLInputElement>, newValue: string) => {
    if (name) {
      setFieldValue?.(name, newValue);
    }
    onChange?.(e, newValue);
  };

  return (
    <S.FormControl className={className} disabled={disabled} required={required}>
      {label ? <S.FormLabel>{label}</S.FormLabel> : null}
      <S.RadioGroup name={name} onChange={handleChange} value={valueToUse}>
        {options.map((option) => (
          <S.FormControlLabel
            disabled={option.disabled}
            key={option.value}
            control={<S.Radio $error={error} />}
            label={option.label}
            value={option.value}
          />
        ))}
      </S.RadioGroup>
    </S.FormControl>
  );
};

export {S as RadioGroupStyles};
export default RadioGroup;
