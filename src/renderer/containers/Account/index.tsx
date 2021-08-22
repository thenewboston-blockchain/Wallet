import React, {FC, useEffect, useMemo} from 'react';
import {useSelector} from 'react-redux';
import {Redirect, Route, Switch, useHistory, useParams} from 'react-router-dom';

import MainContainer from '@renderer/styles/components/MainContainer';
import {getManagedAccounts, getManagedFriends} from '@renderer/selectors';
import {
  AccountNumberParams,
  AccountSection,
  AccountType,
  ManagedAccount,
  ManagedFriend,
  SectionParams,
} from '@renderer/types';

import AccountOverview from './AccountOverview';
import AccountTransactions from './AccountTransactions';
import * as S from './Styles';

type AccountParams = AccountNumberParams & SectionParams<AccountSection>;

// TODO:
// Transactions
// AccountContext

const Account: FC = () => {
  const history = useHistory();
  const {accountNumber, section} = useParams<AccountParams>();
  const managedAccounts = useSelector(getManagedAccounts);
  const managedFriends = useSelector(getManagedFriends);
  const managedAccount = managedAccounts[accountNumber];
  const managedFriend = managedFriends[accountNumber];

  useEffect(() => {
    if (!section || !Object.values(AccountSection).includes(section)) {
      history.replace(`/account/${accountNumber}/${AccountSection.overview}`);
      return;
    }
  }, [accountNumber, section]);

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
      <Switch>
        <Route path={`/account/:accountNumber/${AccountSection.overview}`} exact>
          <AccountOverview accountNumber={accountNumber} type={type} />
        </Route>
        <Route path={`/account/:accountNumber/${AccountSection.transaction}`} exact>
          <AccountTransactions />
        </Route>
        <Route path="/account/:accountNumber">
          <Redirect to={`/account/${accountNumber}/${AccountSection.overview}`} />
        </Route>
      </Switch>
    </MainContainer>
  );
};

export default Account;
