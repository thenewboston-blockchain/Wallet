import {SFC} from 'shared/types';
import * as S from './Styles';

const Card: SFC = ({children, className}) => {
  return <S.Card className={className}>{children}</S.Card>;
};

export default Card;
