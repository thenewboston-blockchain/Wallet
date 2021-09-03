import React from 'react';
import noop from 'lodash/noop';
import Link from '@renderer/components/Link';
import PaginatedTable, {PageTableItems} from '@renderer/components/PaginatedTable';
import {SFC} from '@renderer/types';

import data from './data';
import * as S from './Styles';

enum TableKeys {
  datetime,
  action,
  node,
  boostAmount,
}

const pageTableItems: PageTableItems = {
  data: data.map(({key, date, action, node, amount, isPositive}) => ({
    key: key.toString(),
    [TableKeys.datetime]: date,
    [TableKeys.action]: action,
    [TableKeys.node]: (
      <Link textStyled to="/">
        {node}
      </Link>
    ),
    [TableKeys.boostAmount]: (
      <S.Amount $isPositive={isPositive}>{`${isPositive ? '+' : '-'}${amount.toLocaleString()}.0000`}</S.Amount>
    ),
  })),
  headers: {
    [TableKeys.datetime]: 'Date/Time',
    [TableKeys.action]: 'Action',
    [TableKeys.node]: 'Node',
    [TableKeys.boostAmount]: 'Boost Amount',
  },
  meta: {
    align: {
      [TableKeys.boostAmount]: 'right',
    },
    gridTemplateColumns:
      'minmax(max-content, 2fr) minmax(max-content, 2fr) minmax(max-content, 2fr) minmax(max-content, 1fr)',
  },
  orderedKeys: [TableKeys.datetime, TableKeys.action, TableKeys.node, TableKeys.boostAmount],
};

const AccountVaultBoostHistory: SFC = ({className}) => {
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

export default AccountVaultBoostHistory;
