import React from 'react';
import noop from 'lodash/noop';
import PaginatedTable, {PageTableItems} from '@renderer/components/PaginatedTable';
import {SFC} from '@renderer/types';

import data from './data';
import * as S from './Styles';

enum TableKeys {
  datetime,
  depositedAmount,
  holdingPeriod,
  penalty,
  actions,
}

const pageTableItems: PageTableItems = {
  data: data.map(({key, date, amount, penalty, period}) => ({
    key: key.toString(),
    [TableKeys.datetime]: date,
    [TableKeys.depositedAmount]: amount.toLocaleString() + '.0000',
    [TableKeys.holdingPeriod]: `${period} blocks left`,
    [TableKeys.penalty]: penalty > 0 ? `${penalty}% (2,000 coins)` : 0,
    [TableKeys.actions]: <S.WithdrawButton>Withdraw</S.WithdrawButton>,
  })),
  headers: {
    [TableKeys.actions]: '',
    [TableKeys.datetime]: 'Date/Time',
    [TableKeys.depositedAmount]: 'Deposited',
    [TableKeys.holdingPeriod]: 'Holding Period',
    [TableKeys.penalty]: 'Penalty % for Early Withdrawal',
  },
  meta: {
    align: {
      [TableKeys.depositedAmount]: 'right',
      [TableKeys.holdingPeriod]: 'right',
      [TableKeys.penalty]: 'right',
      [TableKeys.actions]: 'right',
    },
    gridTemplateColumns: 'max-content minmax(max-content, 1fr) minmax(max-content, 2fr) minmax(max-content, 2fr) minmax(max-content, 1fr)',
  },
  orderedKeys: [
    TableKeys.datetime,
    TableKeys.depositedAmount,
    TableKeys.holdingPeriod,
    TableKeys.penalty,
    TableKeys.actions,
  ],
};

const AccountVaultCoins: SFC = ({className}) => {
  return (
    <S.Card className={className}>
      <PaginatedTable
        loading={false}
        items={pageTableItems}
        currentPage={1}
        setPage={() => noop}
        totalPages={1}
        count={0}
      />
    </S.Card>
  );
};

export default AccountVaultCoins;
