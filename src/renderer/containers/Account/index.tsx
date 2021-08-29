import React, {useContext} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';

import MainContainer from '@renderer/styles/components/MainContainer';
import {AccountContext} from '@renderer/context';
import {AccountSection, SFC} from '@renderer/types';

import AccountOverview from './AccountOverview';
import AccountTransactions from './AccountTransactions';
import AccountVault from './AccountVault';
import * as S from './Styles';

const Account: SFC = ({className}) => {
  const {accountNumber} = useContext(AccountContext);

  return (
    <MainContainer className={className}>
      <S.Header />
      <Switch>
        <Route path={`/account/:accountNumber/${AccountSection.overview}`} exact>
          <AccountOverview />
        </Route>
        <Route path={`/account/:accountNumber/${AccountSection.transaction}`} exact>
          <AccountTransactions />
        </Route>
        <Route path={`/account/:accountNumber/${AccountSection.vault}/:vault?`}>
          <AccountVault />
        </Route>
        <Route path="/account/:accountNumber">
          <Redirect to={`/account/${accountNumber}/${AccountSection.overview}`} />
        </Route>
      </Switch>
    </MainContainer>
  );
};

export default Account;
