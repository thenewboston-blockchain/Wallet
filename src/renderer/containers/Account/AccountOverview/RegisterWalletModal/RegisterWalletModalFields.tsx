import React, {FocusEvent, ReactNode, useEffect, useMemo, useState} from 'react';

import {HelperTextType, TextField} from '@renderer/components/FormElements';
import {useAccountBalance, useFormContext2} from '@renderer/hooks';
import {SFC} from '@renderer/types';

import {NODE_FEE, PV_FEE, USERNAME_FEE} from './constants';
import * as S from './Styles';

const TOTAL_FEES = NODE_FEE + PV_FEE + USERNAME_FEE;

export const initialValues = {
  sufficientFunds: false,
  username: '',
};

export type FormValues = typeof initialValues;

const RegisterWalletModalFields: SFC = ({className}) => {
  const accountBalance = useAccountBalance();
  const [inputIsFocused, setInputIsFocused] = useState<boolean>(false);
  const [isValidatingField, setIsValidatingField] = useState<boolean>(false);
  const [usernameIsValid, setUsernameIsValid] = useState<boolean>(false);
  const {dirty, errors, isValid, setFieldError, setFieldValue} = useFormContext2<FormValues>();

  const insufficientFundsError = errors?.sufficientFunds;

  useEffect(() => {
    if (!accountBalance || accountBalance < TOTAL_FEES) {
      setFieldValue?.('sufficientFunds', false);
    } else {
      setFieldValue?.('sufficientFunds', true);
    }
  }, [accountBalance, setFieldValue]);

  const handleInputBlur = async (e: FocusEvent<HTMLInputElement>): Promise<void> => {
    if (!isValid || !dirty) return;

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
      {insufficientFundsError ? (
        <S.InsufficientFunds>
          <S.AlertIcon />
          {insufficientFundsError}
        </S.InsufficientFunds>
      ) : null}
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
