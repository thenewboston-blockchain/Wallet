import React, {useContext} from 'react';

import Link from '@renderer/components/Link';
import {AccountContext} from '@renderer/context';
import {AccountSection, SFC} from '@renderer/types';
import * as S from './Styles';

interface AccountOverviewVaultCardProps {}

const AccountOverviewVaultCard: SFC<AccountOverviewVaultCardProps> = ({className}) => {
  const {accountNumber} = useContext(AccountContext);

  return (
    <S.Card className={className}>
      <S.TopSection>
        <S.TopSectionLeft>
          <S.BalanceLabel>Vault Balance</S.BalanceLabel>
          <S.Balance>100,000.0000</S.Balance>
        </S.TopSectionLeft>
        <S.DepositButton>Deposit</S.DepositButton>
      </S.TopSection>
      <S.BoostSection>
        <S.BoostLeftSection>
          <S.BoostLabelValueContainer>
            <S.BoostLabel>Boosted Node</S.BoostLabel>
            <S.BoostValue>-</S.BoostValue>
          </S.BoostLabelValueContainer>
          <S.BoostLabelValueContainer>
            <S.BoostLabel>Boosts Given</S.BoostLabel>
            <S.BoostValue>-</S.BoostValue>
          </S.BoostLabelValueContainer>
        </S.BoostLeftSection>
        <S.BoostNodeButton>
          <S.RocketLaunchIcon />
          Boost Node
        </S.BoostNodeButton>
      </S.BoostSection>
      <S.PointsSection>
        <S.PointsLabel>Points</S.PointsLabel>
        <S.PointsProgressBar />
        <S.PointsRatioText>10.05B / 10.05B</S.PointsRatioText>
      </S.PointsSection>
      <S.LinkSection>
        <Link to={`/account/${accountNumber}/${AccountSection.transaction}`} withChevron>
          Vault Details
        </Link>
      </S.LinkSection>
    </S.Card>
  );
};

export default AccountOverviewVaultCard;