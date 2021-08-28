import React from 'react';
import noop from 'lodash/noop';

// Temp
import {Switch} from '@renderer/components/FormElements';
import {useBooleanState} from '@renderer/hooks';
// Temp End

import {SFC} from '@renderer/types';
import AccountOverviewCarousel, {AccountOverviewCarouselTopic} from './AccountOverviewCarousel';
import AccountOverviewVaultCard from './AccountOverviewVaultCard';
import * as S from './Styles';

const AccountOverview: SFC = ({className}) => {
  // Temp
  const [moneyDeposited, toggleMoneyDeposited] = useBooleanState(false);
  const [accountRegistered, toggleAccountRegistered] = useBooleanState(false);
  // Temp End

  return (
    <>
      <S.Graph className={className} />
      <S.BottomRow>
        {moneyDeposited ? (
          <AccountOverviewVaultCard />
        ) : (
          <AccountOverviewCarousel carouselTopic={AccountOverviewCarouselTopic.depositCoins} onClick={noop} />
        )}
        <AccountOverviewCarousel carouselTopic={AccountOverviewCarouselTopic.registerWallet} onClick={noop} />
      </S.BottomRow>

      {/* Temp */}
      <S.TempCard>
        <Switch checked={moneyDeposited} onChange={toggleMoneyDeposited} label="Money has been deposited" />
        <Switch checked={accountRegistered} onChange={toggleAccountRegistered} label="Account has been registered" />
      </S.TempCard>
      {/* Temp End */}
    </>
  );
};

export default AccountOverview;
