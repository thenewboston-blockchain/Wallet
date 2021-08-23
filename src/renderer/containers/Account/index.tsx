import React, {FC, useContext} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';

import MainContainer from '@renderer/styles/components/MainContainer';
import {AccountContext} from '@renderer/context';
import {AccountSection} from '@renderer/types';

import AccountOverview from './AccountOverview';
import AccountTransactions from './AccountTransactions';
import * as S from './Styles';

const Account: FC = () => {
  const {accountNumber} = useContext(AccountContext);

  return (
    <MainContainer>
      <S.Header />
      <Switch>
        <Route path={`/account/:accountNumber/${AccountSection.overview}`} exact>
          <AccountOverview />
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
