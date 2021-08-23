import React, {FC, ReactNode, useCallback, useContext} from 'react';

import {Button} from '@renderer/components/FormElements';
import {AccountContext} from '@renderer/context';
import {AccountType} from '@renderer/types';

import identificationBadge from './assets/IdentificationBadge.png';
import piggyBank from './assets/PiggyBank.png';
import {coinSlides, walletSlides} from './data';
import * as S from './Styles';

export enum AccountCarouselTopic {
  depositCoins = 'Deposit Coins',
  registerWallet = 'Register Wallet',
}

interface AccountCarouselProps {
  carouselTopic: AccountCarouselTopic;
  onClick(): void;
}

const AccountCarousel: FC<AccountCarouselProps> = ({carouselTopic, onClick}) => {
  const {type} = useContext(AccountContext);
  const slides = carouselTopic === AccountCarouselTopic.depositCoins ? coinSlides : walletSlides;

  const renderManagedNodeContent = () => {
    return (
      <>
        <S.Carousel>
          {slides.map(({src, title, description}) => (
            <S.Slide key={title}>
              <S.CarouselImageContainer>
                <S.Image src={src} />
              </S.CarouselImageContainer>
              <S.Title>{title}</S.Title>
              <S.Text>{description}</S.Text>
            </S.Slide>
          ))}
        </S.Carousel>
        <Button fullWidth={false} onClick={onClick}>
          {carouselTopic}
        </Button>
      </>
    );
  };

  const renderNonManagedNodeContent = useCallback((): ReactNode => {
    const src = carouselTopic === AccountCarouselTopic.depositCoins ? piggyBank : identificationBadge;
    const text = carouselTopic === AccountCarouselTopic.depositCoins ? 'No coins deposited' : 'Wallet not registered';
    return (
      <>
        <S.EmptyStateImageContainer>
          <S.Image src={src} />
        </S.EmptyStateImageContainer>
        <S.EmptyStateText>{text}</S.EmptyStateText>
      </>
    );
  }, [carouselTopic]);

  return (
    <S.Card>{type === AccountType.managedAccount ? renderManagedNodeContent() : renderNonManagedNodeContent()}</S.Card>
  );
};

export default AccountCarousel;
