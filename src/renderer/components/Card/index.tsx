import React, {FC} from 'react';
import * as S from './CardStyles';

interface CardProps {
  className?: string;
}

const Card: FC<CardProps> = ({children, className}) => {
  return <S.Card className={className}>{children}</S.Card>;
};

export default Card;
