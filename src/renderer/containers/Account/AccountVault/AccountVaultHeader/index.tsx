import React from 'react';

import {SFC} from '@shared/types';
import AccountBreadcrumb from '../../AccountBreadcrumb';
import * as S from './Styles';

const AccountVaultHeader: SFC = ({className}) => {
  return (
    <S.Card className={className}>
      <AccountBreadcrumb currentSection="Vault" />
      <S.Flex>
        <S.BalanceContainer>
          <S.Label>Vault Balance</S.Label>
          <S.BalanceValue>100,000.0000</S.BalanceValue>
        </S.BalanceContainer>
        <S.MiddleContainer>
          <S.MiddleContainerSet>
            <S.Label>Boosted Node</S.Label>
            <S.MiddleContainerValue>13.57.215.62</S.MiddleContainerValue>
          </S.MiddleContainerSet>
          <S.MiddleContainerSet>
            <S.Label>Boosts Given</S.Label>
            <S.MiddleContainerValue>100,000.0000</S.MiddleContainerValue>
          </S.MiddleContainerSet>
        </S.MiddleContainer>
        <S.PointsContainer>
          <S.Label>Points</S.Label>
          <S.ProgressBar progress={100} total={100} />
          <S.PointsRatio>10.05B / 10.05B</S.PointsRatio>
        </S.PointsContainer>
      </S.Flex>
    </S.Card>
  );
};

export default AccountVaultHeader;
