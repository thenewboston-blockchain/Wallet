import React, {FocusEvent, ReactNode, useMemo, useState} from 'react';

import {HelperTextType, TextField} from '@renderer/components/FormElements';
import {useFormContext2} from '@renderer/hooks/useFormContext';
import {SFC} from '@renderer/types';
import * as S from './Styles';

export const initialValues = {
  username: '',
};

export type FormValues = typeof initialValues;

const RegisterWalletModalFields: SFC = ({className}) => {
  const [inputIsFocused, setInputIsFocused] = useState<boolean>(false);
  const [isValidatingField, setIsValidatingField] = useState<boolean>(false);
  const [usernameIsValid, setUsernameIsValid] = useState<boolean>(false);
  const {isValid, setFieldError} = useFormContext2();

  const handleInputBlur = async (e: FocusEvent<HTMLInputElement>): Promise<void> => {
    if (!isValid) return;

    const text = e.currentTarget.value.toLowerCase();
    setIsValidatingField(true);

    setTimeout(() => {
      if (['hello', 'monkey'].includes(text)) {
        setUsernameIsValid(false);
        setFieldError?.('username', 'Not available');
      } else {
        setUsernameIsValid(true);
        setFieldError?.('username', '');
      }

      setIsValidatingField(false);
      setInputIsFocused(false);
    }, 1000);
  };

  const handleInputChange = (): void => {
    setInputIsFocused(true);
    setUsernameIsValid(false);
  };

  const helperText = useMemo<ReactNode>(() => {
    if (inputIsFocused) return null;

    if (usernameIsValid && !isValidatingField) {
      return 'Available';
    }

    return null;
  }, [inputIsFocused, isValidatingField, usernameIsValid]);

  const helperTextType = useMemo<HelperTextType | undefined>(() => {
    if (inputIsFocused) return undefined;

    if (usernameIsValid && !isValidatingField) {
      return HelperTextType.success;
    }

    return undefined;
  }, [inputIsFocused, isValidatingField, usernameIsValid]);

  return (
    <S.Container className={className}>
      <TextField
        helperText={helperText}
        helperTextType={helperTextType}
        label="Enter username"
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        name="username"
      />
      <S.ErrorArea>{isValidatingField ? <S.Loader /> : null}</S.ErrorArea>
    </S.Container>
  );
};

export default RegisterWalletModalFields;
