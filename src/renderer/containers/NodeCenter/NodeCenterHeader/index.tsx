import React from 'react';
import PageHeader from '@renderer/components/PageHeader';
import {SFC} from '@renderer/types';

import * as S from './Styles';

const NodeCenterHeader: SFC = ({className}) => {
  const handleButtonClick = (): void => {};

  return (
    <PageHeader
      className={className}
      rightButtons={
        <S.LearnMoreButton onClick={handleButtonClick}>
          Learn More <S.LearnMoreIcon />
        </S.LearnMoreButton>
      }
    >
      <S.Header>Welcome to the Node Center</S.Header>
    </PageHeader>
  );
};

export default NodeCenterHeader;
