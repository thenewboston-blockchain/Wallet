import {useState} from 'react';
import format from 'date-fns/format';
import getTime from 'date-fns/getTime';
import parseISO from 'date-fns/parseISO';
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';

import Link from 'renderer/components/Link';
import {PageTableItems} from 'renderer/components/PageTable';
import {colors} from 'renderer/styles';
import {truncateLongText} from 'renderer/utils/accounts';
import {SFC} from 'shared/types';

import {mockBoostData, mockBoostTableData} from './data';
import * as S from './Styles';

const transformedBoostData = mockBoostData.map((data) => ({
  amount: data.amount,
  date: getTime(parseISO(data.date)),
}));

enum TableKeys {
  datetime,
  account,
  amount,
}

const pageTableItems: PageTableItems = {
  data: mockBoostTableData.map(({date, amount, account}) => ({
    key: date,
    [TableKeys.datetime]: date,
    [TableKeys.account]: truncateLongText(account),
    [TableKeys.amount]: amount.toLocaleString(),
  })),
  headers: {
    [TableKeys.datetime]: 'Last Boosted',
    [TableKeys.account]: 'Wallet Account',
    [TableKeys.amount]: 'Boosted',
  },
  meta: {
    align: {
      [TableKeys.amount]: 'right',
    },
    gridTemplateColumns: 'minmax(max-content, 2fr) minmax(max-content, 1fr) minmax(max-content, 2fr)',
  },
  orderedKeys: [TableKeys.datetime, TableKeys.account, TableKeys.amount],
};

export enum GraphFilter {
  month = '1M',
  halfYear = '6M',
  year = '1Y',
  all = 'ALL',
}

const NodeOverviewGraph: SFC = ({className}) => {
  const [filter, setFilter] = useState<GraphFilter>(GraphFilter.month);

  const handleFilterOnClick = (filterParam: GraphFilter) => () => {
    setFilter(filterParam);
  };

  const renderFilterButton = (filterParam: GraphFilter) => {
    const isActive = filter === filterParam;
    return (
      <S.Filter $active={isActive} onClick={!isActive ? handleFilterOnClick(filterParam) : undefined}>
        {filterParam}
      </S.Filter>
    );
  };

  return (
    <S.Card className={className}>
      <S.Top>
        <S.TopLeft>
          <S.TopLabel>Total Boosts</S.TopLabel>
          <S.TopBoostSection>
            <S.Boost>293,503</S.Boost>
            <S.RankBadge>Rank #16</S.RankBadge>
            <S.TopBadge>Top 20</S.TopBadge>
          </S.TopBoostSection>
        </S.TopLeft>
        <S.TopRight>
          {renderFilterButton(GraphFilter.month)}
          {renderFilterButton(GraphFilter.halfYear)}
          {renderFilterButton(GraphFilter.year)}
          {renderFilterButton(GraphFilter.all)}
        </S.TopRight>
      </S.Top>
      <S.GraphWrapper>
        <ResponsiveContainer width="99%" height={183}>
          <LineChart data={transformedBoostData}>
            <CartesianGrid stroke={colors.palette.neutral['075']} />
            <XAxis
              dataKey="date"
              tickFormatter={(date) => format(date, 'MMM d')}
              minTickGap={100}
              stroke={colors.palette.neutral['400']}
            />
            <YAxis hide />
            <Line
              activeDot={{r: 6}}
              dataKey="amount"
              dot={false}
              stroke={colors.palette.green['300']}
              strokeWidth={2}
            />
            <Tooltip
              labelFormatter={(date) => format(date, 'yyyy MMM dd')}
              formatter={(amount: number) => amount.toLocaleString()}
            />
          </LineChart>
        </ResponsiveContainer>
      </S.GraphWrapper>
      <S.PageTable items={pageTableItems} />
      <S.BottomContainer>
        <Link to="/" withChevron>
          View Details
        </Link>
      </S.BottomContainer>
    </S.Card>
  );
};

export default NodeOverviewGraph;
