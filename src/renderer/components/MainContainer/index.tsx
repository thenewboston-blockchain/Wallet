import {SFC} from 'shared/types';
import * as S from './Styles';

const MainContainer: SFC = ({children, className}) => {
  return <S.Container className={className}>{children}</S.Container>;
};

export default MainContainer;
