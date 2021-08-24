import React, {useContext, useState} from 'react';
import format from 'date-fns/format';
import getTime from 'date-fns/getTime';
import parseISO from 'date-fns/parseISO';
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';

import Link from '@renderer/components/Link';
import {AccountContext} from '@renderer/context';
import colors from '@renderer/styles/colors';
import {AccountSection, SFC} from '@renderer/types';

import {mockBalanceData} from './data';
import * as S from './Styles';

const transformedData = mockBalanceData.map((data) => ({
  balance: data.balance,
  date: getTime(parseISO(data.date)),
}));

export enum GraphFilter {
  month = '1M',
  halfYear = '6M',
  year = '1Y',
  all = 'ALL',
}

const AccountGraph: SFC = ({className}) => {
  const {accountNumber} = useContext(AccountContext);
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
    <S.Container className={className}>
      <S.Top>
        <div>
          <S.TopLabel>Wallet Balance</S.TopLabel>
          <S.Balance>310,720.0000</S.Balance>
        </div>
        <S.TopRight>
          {renderFilterButton(GraphFilter.month)}
          {renderFilterButton(GraphFilter.halfYear)}
          {renderFilterButton(GraphFilter.year)}
          {renderFilterButton(GraphFilter.all)}
        </S.TopRight>
      </S.Top>
      <ResponsiveContainer width="100%" height={368}>
        <LineChart data={transformedData}>
          <CartesianGrid stroke={colors.palette.neutral['075']} />
          <XAxis
            dataKey="date"
            tickFormatter={(date) => format(date, 'MMM d')}
            minTickGap={100}
            stroke={colors.palette.neutral['400']}
          />
          <YAxis hide />
          <Line activeDot={{r: 6}} dataKey="balance" dot={false} stroke={colors.palette.blue['400']} />
          <Tooltip
            labelFormatter={(date) => format(date, 'yyyy MMM dd')}
            formatter={(amount: number) => amount.toLocaleString()}
          />
        </LineChart>
      </ResponsiveContainer>
      <S.BottomContainer>
        <Link to={`/account/${accountNumber}/${AccountSection.transaction}`} withChevron>
          View Details
        </Link>
      </S.BottomContainer>
    </S.Container>
  );
};

export default AccountGraph;
