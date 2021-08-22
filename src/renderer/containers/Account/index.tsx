import React, {FC, useMemo} from 'react';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import noop from 'lodash/noop';

import MainContainer from '@renderer/styles/components/MainContainer';
import {getManagedAccounts, getManagedFriends} from '@renderer/selectors';
import {AccountNumberParams, AccountType, ManagedAccount, ManagedFriend} from '@renderer/types';

import AccountOverviewCarousel, {AccountCarouselTopic} from './AccountCarousel';
import * as S from './Styles';

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
    let output: ManagedAccount | ManagedFriend | null = null;

    if (managedAccount) {
      output = managedAccount;
    } else if (managedFriend) {
      output = managedFriend;
    }

    return output;
  }, [managedAccount, managedFriend]);

  return (
    <MainContainer>
      <S.Header
        accountNumber={accountNumber}
        nickname={managedAccountOrFriend?.nickname || null}
        signingKey={type === AccountType.managedAccount ? managedAccount.signing_key : null}
        type={type}
      />
      <S.Graph />
      <S.BottomRow>
        <AccountOverviewCarousel accountType={type} carouselTopic={AccountCarouselTopic.depositCoins} onClick={noop} />
        <AccountOverviewCarousel
          accountType={type}
          carouselTopic={AccountCarouselTopic.registerWallet}
          onClick={noop}
        />
      </S.BottomRow>
    </MainContainer>
  );
};

export default Account;
