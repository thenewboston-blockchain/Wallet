import React, {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {getManagedAccounts} from '@renderer/selectors';
import {InputOption, SFC} from '@renderer/types';

import * as S from './Styles';

export const initialValues = {
  accountNumber: '',
  form: '',
};

export type FormValues = typeof initialValues;

interface ComponentProps {
  submitting: boolean;
}

const NodeCenterBoostNodeModalFields: SFC<ComponentProps> = ({className, submitting}) => {
  const managedAccounts = useSelector(getManagedAccounts);

  const accountNumberOptions = useMemo<InputOption[]>(
    () =>
      Object.values(managedAccounts).map(({account_number, nickname}) => ({label: nickname, value: account_number})),
    [managedAccounts],
  );

  return (
    <S.Container className={className}>
      <S.FormSelectDetailed
        options={accountNumberOptions}
        name="accountNumber"
        disabled={submitting}
        label="Wallet"
        required
      />
      <S.AvailableBoostsContainer>
        <S.AvailableBoostsLabel>Available Boosts</S.AvailableBoostsLabel>
        <S.AvailableBoosts>100,000</S.AvailableBoosts>
      </S.AvailableBoostsContainer>
    </S.Container>
  );
};

export default NodeCenterBoostNodeModalFields;
