import React from 'react';
import {SFC} from '@renderer/types';

import * as S from './Styles';

const NodeCenterHeader: SFC = ({className}) => {
  const handleButtonClick = (): void => {};

  return (
    <S.Container className={className}>
      <S.Header>Welcome to the Node Center</S.Header>
      <S.LearnMoreButton onClick={handleButtonClick}>
        Learn More <S.LearnMoreIcon />
      </S.LearnMoreButton>
    </S.Container>
  );
};

export default NodeCenterHeader;
