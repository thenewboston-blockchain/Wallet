import React, {useContext} from 'react';

import Link from '@renderer/components/Link';
import {AccountContext} from '@renderer/context';
import {AccountSection, SFC} from '@renderer/types';

import AccountBalance from '../../AccountBalance';
import * as S from './Styles';

const AccountTransactionsHeader: SFC = ({className}) => {
  const {accountNumber} = useContext(AccountContext);

  return (
    <S.Card className={className}>
      <span>
        <Link textStyled to={`/account/${accountNumber}/${AccountSection.overview}`}>
          Dashboard
        </Link>
        {' > Transaction Details'}
      </span>
      <S.Label>Wallet Balance</S.Label>
      <AccountBalance />
    </S.Card>
  );
};

export default AccountTransactionsHeader;
