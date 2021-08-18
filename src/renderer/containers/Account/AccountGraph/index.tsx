import React, {FC, useState} from 'react';
import {CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis} from 'recharts';
import colors from '@renderer/styles/colors';

import * as S from './Styles';

interface AccountGraphProps {
  className?: string;
}

export enum GraphFilter {
  month = '1M',
  halfYear = '6M',
  year = '1Y',
  all = 'ALL',
}

const mockData = Array.from(Array(1000).keys()).map((i) => ({date: i, balance: i}));

const CustomizedDot = () => {
  return null;
};

const AccountGraph: FC<AccountGraphProps> = ({className}) => {
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
          <S.Balance>0.0000</S.Balance>
        </div>
        <S.TopRight>
          {renderFilterButton(GraphFilter.month)}
          {renderFilterButton(GraphFilter.halfYear)}
          {renderFilterButton(GraphFilter.year)}
          {renderFilterButton(GraphFilter.all)}
        </S.TopRight>
      </S.Top>
      <ResponsiveContainer width="100%" height={368}>
        <LineChart data={mockData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Line type="monotone" dataKey="date" stroke={colors.palette.blue['400']} dot={<CustomizedDot />} />
        </LineChart>
      </ResponsiveContainer>
    </S.Container>
  );
};

export default AccountGraph;
