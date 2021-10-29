import {SFC} from 'shared/types';
import * as S from './Styles';

const Badge: SFC = ({children, className}) => {
  return <S.Badge className={className}>{children}</S.Badge>;
};

export default Badge;
