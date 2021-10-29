import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {getManagedAccounts} from 'renderer/selectors';
import {SelectOption, SelectOptionMeta, SFC} from 'shared/types';

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

  const accountNumberOptions = useMemo<SelectOption[]>(
    () => Object.values(managedAccounts).map(({account_number}) => ({value: account_number})),
    [managedAccounts],
  );

  const accountNumberMeta = useMemo<SelectOptionMeta>(
    () =>
      Object.values(managedAccounts).reduce(
        (acc: SelectOptionMeta, {account_number, nickname}) => ({
          ...acc,
          [account_number]: {
            accountNumber: account_number,
            nickname,
          },
        }),
        {},
      ),
    [managedAccounts],
  );

  return (
    <S.Container className={className}>
      <S.Select
        options={accountNumberOptions}
        optionsMeta={accountNumberMeta}
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
