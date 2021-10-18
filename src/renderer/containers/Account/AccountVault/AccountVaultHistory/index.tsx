import React from 'react';
import noop from 'lodash/noop';
import PaginatedTable, {PageTableItems} from '@renderer/components/PaginatedTable';
import {SFC} from '@shared/types';

import data from './data';
import * as S from './Styles';

enum TableKeys {
  datetime,
  action,
  coins,
}

const pageTableItems: PageTableItems = {
  data: data.map(({key, date, action, coins, isPositive}) => ({
    key: key.toString(),
    [TableKeys.datetime]: date,
    [TableKeys.action]: action,
    [TableKeys.coins]: `${isPositive ? '+' : '-'}${coins.toLocaleString()}.0000`,
  })),
  headers: {
    [TableKeys.datetime]: 'Date/Time',
    [TableKeys.action]: 'Action',
    [TableKeys.coins]: 'Coins',
  },
  meta: {
    align: {
      [TableKeys.coins]: 'right',
    },
    gridTemplateColumns: 'minmax(max-content, 3fr) minmax(max-content,5fr) minmax(max-content, 1fr)',
  },
  orderedKeys: [TableKeys.datetime, TableKeys.action, TableKeys.coins],
};

const AccountVaultHistory: SFC = ({className}) => {
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

export default AccountVaultHistory;
