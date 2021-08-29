import React from 'react';

import {SFC} from '@renderer/types';

import AccountBalance from '../../AccountBalance';
import AccountBreadcrumb from "../../AccountBreadcrumb";
import * as S from './Styles';

const AccountTransactionsHeader: SFC = ({className}) => {
  return (
    <S.Card className={className}>
      <AccountBreadcrumb currentSection="Transaction" />
      <S.Label>Wallet Balance</S.Label>
      <AccountBalance />
    </S.Card>
  );
};

export default AccountTransactionsHeader;
