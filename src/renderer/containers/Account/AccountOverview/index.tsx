import React, {FC} from 'react';
import noop from 'lodash/noop';

import AccountOverviewCarousel, {AccountCarouselTopic} from '../AccountCarousel';
import * as S from './Styles';

const AccountOverview: FC = () => {
  return (
    <>
      <S.Graph />
      <S.BottomRow>
        <AccountOverviewCarousel carouselTopic={AccountCarouselTopic.depositCoins} onClick={noop} />
        <AccountOverviewCarousel carouselTopic={AccountCarouselTopic.registerWallet} onClick={noop} />
      </S.BottomRow>
    </>
  );
};

export default AccountOverview;
