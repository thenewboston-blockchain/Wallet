import React, {FocusEvent, ReactNode, useEffect, useMemo, useRef, useState} from 'react';

import {HelperTextType, TextField} from '@renderer/components/FormElements';
import {useAccountBalance, useFormContext2} from '@renderer/hooks';
import {SFC} from '@renderer/types';
import {ALPHANUMERIC} from '@renderer/utils/regex';

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
  const {dirty, errors, isValid, setFieldError, setFieldValue, validateForm, values} = useFormContext2<FormValues>();
  const textFieldRef = useRef<HTMLDivElement>(null);
  const {username} = values!;

  const insufficientFundsError = errors?.sufficientFunds;

  useEffect(() => {
    if (!accountBalance || accountBalance < TOTAL_FEES) {
      setFieldValue?.('sufficientFunds', false);
    } else {
      setFieldValue?.('sufficientFunds', true);
    }
  }, [accountBalance, setFieldValue]);

  const usernameIsCorrectLength = username.length >= 4 && username.length <= 16;
  const usernameIsAlphanumeric = !!username.length && !!username.match(ALPHANUMERIC);

  const handleInputBlur = async (e: FocusEvent<HTMLInputElement>): Promise<void> => {
    setInputIsFocused(false);

    if (!isValid || !dirty) return;

    const text = e.currentTarget.value.toLowerCase();
    setIsValidatingField(true);

    setTimeout(() => {
      if (['hello', 'monkey'].includes(text)) {
        setUsernameIsValid(false);
        setFieldError?.('username', 'Not available');
      } else {
        setUsernameIsValid(true);
        validateForm?.();
      }

      setIsValidatingField(false);
    }, 1000);
  };

  const handleInputFocus = (): void => {
    setInputIsFocused(true);
  };

  const handleInputChange = (): void => {
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
        name="username"
        onBlur={handleInputBlur}
        onFocus={handleInputFocus}
        onChange={handleInputChange}
        ref={textFieldRef}
      />
      <S.ErrorArea>{isValidatingField ? <S.Loader /> : null}</S.ErrorArea>
      <S.Popover
        anchorEl={textFieldRef.current}
        closePopover={handleInputBlur}
        open={inputIsFocused && !!textFieldRef.current}
      >
        <S.PopoverRow>
          <S.CheckIcon $isValid={usernameIsCorrectLength} />4 - 16 characters
        </S.PopoverRow>
        <S.PopoverRow>
          <S.CheckIcon $isValid={usernameIsAlphanumeric} />
          Alphanumeric only
        </S.PopoverRow>
      </S.Popover>
    </S.Container>
  );
};

export default RegisterWalletModalFields;
