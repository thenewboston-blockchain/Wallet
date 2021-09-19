import React from 'react';
import {SFC} from '@renderer/types';
import * as S from './Styles';

const MainContainer: SFC = ({children, className}) => {
  return <S.Container className={className}>{children}</S.Container>;
};

export default MainContainer;
