import React, {FC} from 'react';
import noop from 'lodash/noop';
import {AccountType} from '@renderer/types';

import AccountOverviewCarousel, {AccountCarouselTopic} from '../AccountCarousel';
import * as S from './Styles';

interface AccountOverviewProps {
  type: AccountType | null;
}

const AccountOverview: FC<AccountOverviewProps> = ({type}) => {
  return (
    <>
      <S.Graph />
      <S.BottomRow>
        <AccountOverviewCarousel accountType={type} carouselTopic={AccountCarouselTopic.depositCoins} onClick={noop} />
        <AccountOverviewCarousel
          accountType={type}
          carouselTopic={AccountCarouselTopic.registerWallet}
          onClick={noop}
        />
      </S.BottomRow>
    </>
  );
};

export default AccountOverview;
