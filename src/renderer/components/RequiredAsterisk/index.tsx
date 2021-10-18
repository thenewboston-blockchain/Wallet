import React from 'react';
import {SFC} from '@shared/types';
import * as S from './Styles';

const RequiredAsterisk: SFC = ({className}) => {
  return <S.RequiredAsterisk className={className}>*</S.RequiredAsterisk>;
};

export {S as RequiredAsteriskStyles};
export default RequiredAsterisk;
