import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';

import MainContainer from '@renderer/components/MainContainer';
import {AccountSection, SFC} from '@renderer/types';

import AccountOverview from './AccountOverview';
import AccountTransactions from './AccountTransactions';
import AccountVault from './AccountVault';
import * as S from './Styles';

const Account: SFC = ({className}) => {
  const basePath = `/account/:accountNumber`;

  return (
    <MainContainer className={className}>
      <S.Header />
      <Switch>
        <Route path={`${basePath}/${AccountSection.overview}`} exact>
          <AccountOverview />
        </Route>
        <Route path={`${basePath}/${AccountSection.transactions}`} exact>
          <AccountTransactions />
        </Route>
        <Route path={`${basePath}/${AccountSection.vault}/:vault?`}>
          <AccountVault />
        </Route>
        <Route path={`${basePath}`}>
          <Redirect to={`${basePath}/${AccountSection.overview}`} />
        </Route>
      </Switch>
    </MainContainer>
  );
};

export default Account;
