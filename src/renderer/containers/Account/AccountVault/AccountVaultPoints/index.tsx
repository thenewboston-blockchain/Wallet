import noop from 'lodash/noop';
import PaginatedTable, {PageTableItems} from 'renderer/components/PaginatedTable';
import {SFC} from 'shared/types';

import data from './data';
import * as S from './Styles';

enum TableKeys {
  datetime,
  action,
  pointsUsed,
  pointsRemaining,
}

const pageTableItems: PageTableItems = {
  data: data.map(({key, date, action, points, isPositive, pointsRemaining}) => ({
    key: key.toString(),
    [TableKeys.datetime]: date,
    [TableKeys.action]: action,
    [TableKeys.pointsUsed]: (
      <S.Points $isPositive={isPositive}>
        {isPositive ? '+' : '-'}${points}B
      </S.Points>
    ),
    [TableKeys.pointsRemaining]: `${pointsRemaining}B`,
  })),
  headers: {
    [TableKeys.datetime]: 'Date/Time',
    [TableKeys.action]: 'Action',
    [TableKeys.pointsUsed]: 'Points Used',
    [TableKeys.pointsRemaining]: 'Points Remaining',
  },
  meta: {
    align: {
      [TableKeys.pointsUsed]: 'right',
      [TableKeys.pointsRemaining]: 'right',
    },
    gridTemplateColumns:
      'minmax(max-content, 1fr) minmax(max-content, 1fr) minmax(max-content, 1fr) minmax(max-content, 1fr)',
  },
  orderedKeys: [TableKeys.datetime, TableKeys.action, TableKeys.pointsUsed, TableKeys.pointsRemaining],
};

const AccountVaultPoints: SFC = ({className}) => {
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

export default AccountVaultPoints;
