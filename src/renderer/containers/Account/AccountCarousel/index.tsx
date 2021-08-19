import React, {FC} from 'react';
import {Button} from '@renderer/components/FormElements';

import {coinSlides, walletSlides} from './data';
import * as S from './Styles';

export enum AccountCarouselType {
  depositCoins = 'Deposit Coins',
  registerWallet = 'Register Wallet',
}

interface AccountCarouselProps {
  onClick(): void;
  type: AccountCarouselType;
}

const AccountCarousel: FC<AccountCarouselProps> = ({onClick, type}) => {
  const slides = type === AccountCarouselType.depositCoins ? coinSlides : walletSlides;

  return (
    <S.Card>
      <S.Carousel>
        {slides.map(({src, title, description}) => (
          <S.Slide key={title}>
            <S.ImageContainer>
              <S.Image src={src} />
            </S.ImageContainer>
            <S.Title>{title}</S.Title>
            <S.Text>{description}</S.Text>
          </S.Slide>
        ))}
      </S.Carousel>
      <Button fullWidth={false} onClick={onClick}>
        {type}
      </Button>
    </S.Card>
  );
};

export default AccountCarousel;
