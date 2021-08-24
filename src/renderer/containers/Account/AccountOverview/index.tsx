import React from 'react';
import noop from 'lodash/noop';

import {SFC} from '@renderer/types';
import AccountOverviewCarousel, {AccountCarouselTopic} from '../AccountCarousel';
import * as S from './Styles';

const AccountOverview: SFC = ({className}) => {
  return (
    <>
      <S.Graph className={className} />
      <S.BottomRow>
        <AccountOverviewCarousel carouselTopic={AccountCarouselTopic.depositCoins} onClick={noop} />
        <AccountOverviewCarousel carouselTopic={AccountCarouselTopic.registerWallet} onClick={noop} />
      </S.BottomRow>
    </>
  );
};

export default AccountOverview;
