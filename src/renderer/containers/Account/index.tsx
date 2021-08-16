import React, {FC, useMemo} from 'react';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';

import MainContainer from '@renderer/styles/components/MainContainer';
import {getManagedAccounts, getManagedFriends} from '@renderer/selectors';
import {AccountNumberParams, AccountType, ManagedAccount, ManagedFriend} from '@renderer/types';

import * as S from './AccountStyles';

const Account: FC = () => {
  const {accountNumber} = useParams<AccountNumberParams>();
  const managedAccounts = useSelector(getManagedAccounts);
  const managedFriends = useSelector(getManagedFriends);
  const managedAccount = managedAccounts[accountNumber];
  const managedFriend = managedFriends[accountNumber];

  const type = useMemo<AccountType | null>(() => {
    let output: AccountType | null = null;

    if (managedAccount) {
      output = AccountType.managedAccount;
    } else if (managedFriend) {
      output = AccountType.managedFriend;
    }

    return output;
  }, [managedAccount, managedFriend]);

  const managedAccountOrFriend = useMemo<ManagedAccount | ManagedFriend | null>(() => {
    return [];
  }, []);

  return (
    <MainContainer>
      <S.AccountHeader accountNumber={accountNumber} nickname={managedAccountOrFriend?.nickname || null} type={type} />
      <S.AccountGraph />
    </MainContainer>
  );
};

export default Account;
