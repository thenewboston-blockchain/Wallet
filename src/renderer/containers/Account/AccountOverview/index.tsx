import React from 'react';
import noop from 'lodash/noop';

// Temp
import {Switch} from '@renderer/components/FormElements';
import {useToggle} from '@renderer/hooks';
// Temp End

import {SFC} from '@renderer/types';
import AccountOverviewCarousel, {AccountOverviewCarouselTopic} from './AccountOverviewCarousel';
import AccountOverviewVaultCard from './AccountOverviewVaultCard';
import AccountOverviewVoteCard from './AccountOverviewVoteCard';
import RegisterWalletModal from './RegisterWalletModal';
import * as S from './Styles';

const AccountOverview: SFC = ({className}) => {
  const [registerWalletModalIsOpen, toggleRegisterWalletModal] = useToggle(false);
  // Temp
  const [moneyDeposited, toggleMoneyDeposited] = useToggle(false);
  const [accountRegistered, toggleAccountRegistered] = useToggle(false);
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
        {accountRegistered ? (
          <AccountOverviewVoteCard />
        ) : (
          <AccountOverviewCarousel
            carouselTopic={AccountOverviewCarouselTopic.registerWallet}
            onClick={toggleRegisterWalletModal}
          />
        )}
      </S.BottomRow>
      {registerWalletModalIsOpen && <RegisterWalletModal close={toggleRegisterWalletModal} />}

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
