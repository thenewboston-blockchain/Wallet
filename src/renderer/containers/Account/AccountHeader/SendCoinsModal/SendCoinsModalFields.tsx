import React, {useMemo} from 'react';
import {useSelector} from 'react-redux';

import {MATCH_ERROR} from '@renderer/constants/form-validation';
import {useFormContext} from '@renderer/hooks';
import {
  getActiveBankConfig,
  getPrimaryValidatorConfig,
  getManagedAccountBalances,
  getManagedAccounts,
  getManagedFriends,
} from '@renderer/selectors';
import {InputOption, SFC} from '@renderer/types';
import {getBankTxFee, getPrimaryValidatorTxFee} from '@renderer/utils/transactions';

import * as S from './Styles';

export interface FormValues {
  coins: string;
  memo?: string;
  recipientAccountNumber: string;
  senderAccountNumber: string;
}

interface ComponentProps {
  submitting: boolean;
}

const SendCoinsModalFields: SFC<ComponentProps> = ({className, submitting}) => {
  const {errors, values} = useFormContext<FormValues>();
  const activeBankConfig = useSelector(getActiveBankConfig)!;
  const managedAccountBalances = useSelector(getManagedAccountBalances);
  const managedAccounts = useSelector(getManagedAccounts);
  const managedFriends = useSelector(getManagedFriends);
  const primaryValidatorConfig = useSelector(getPrimaryValidatorConfig);

  const matchError = errors.recipientAccountNumber === MATCH_ERROR;

  const getFromOptions = useMemo<InputOption[]>(
    () =>
      Object.values(managedAccounts).map(({account_number, nickname}) => ({
        label: nickname,
        value: account_number,
      })),
    [managedAccounts],
  );

  const getToOptions = useMemo<InputOption[]>(() => {
    const accounts = [...Object.values(managedAccounts), ...Object.values(managedFriends)];
    return accounts.map(({account_number, nickname}) => ({
      label: nickname,
      value: account_number,
    }));
  }, [managedAccounts, managedFriends]);

  const renderCoinsAmount = (): string => {
    const value = values.coins;

    return `${(value || 0).toLocaleString()}.0000`;
  };

  const renderSenderAccountBalance = (): string => {
    const {senderAccountNumber} = values;
    if (!senderAccountNumber) return '-';
    const {balance} = managedAccountBalances[senderAccountNumber];
    return `${(balance || 0).toLocaleString()}.0000`;
  };

  const renderTotal = (): string => {
    const {coins, senderAccountNumber} = values;
    if (!primaryValidatorConfig || !coins) return '-';
    const bankTxFee = getBankTxFee(activeBankConfig, senderAccountNumber);
    const validatorTxFee = getPrimaryValidatorTxFee(primaryValidatorConfig, senderAccountNumber);
    return `${(parseInt(coins, 10) + bankTxFee + validatorTxFee).toLocaleString()}.0000`;
  };

  const renderValidatorFee = (): number | string => {
    if (!primaryValidatorConfig) return '-';
    return getPrimaryValidatorTxFee(primaryValidatorConfig, values?.senderAccountNumber) || '-';
  };

  return (
    <div className={className}>
      {matchError ? <S.ErrorSpan>{MATCH_ERROR}</S.ErrorSpan> : null}
      <S.FormSelectDetailed
        disabled={submitting}
        focused
        label="From"
        name="senderAccountNumber"
        options={getFromOptions}
        required
      />
      <S.FormSelectDetailed
        creatable
        disabled={submitting}
        hideErrorText={matchError}
        label="To"
        name="recipientAccountNumber"
        options={getToOptions}
        required
      />
      <S.TextField disabled={submitting} label="Memo" name="memo" placeholder="What is it for?" />
      <S.TextField disabled={submitting} label="Coins" name="coins" type="number" />
      <S.Table>
        <S.Row label="Account Balance" value={renderSenderAccountBalance()} />
        <S.Row label="Coins" value={renderCoinsAmount()} />
        <S.Row label="Bank Fee" value={getBankTxFee(activeBankConfig, values?.senderAccountNumber) || '-'} />
        <S.Row label="Validator Fee" value={renderValidatorFee()} />
        <S.Row isSummary label="Total" value={renderTotal()} />
      </S.Table>
    </div>
  );
};

export default SendCoinsModalFields;
