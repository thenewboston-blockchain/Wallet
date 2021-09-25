import React from 'react';
import {SFC} from '@renderer/types';

import NodeCenterHeader from './NodeCenterHeader';
import * as S from './Styles';

const NodeCenter: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <NodeCenterHeader />
      <S.Main>
        <S.TableHeader>Top 20 Nodes</S.TableHeader>
        <S.TableHeader>Other Nodes</S.TableHeader>
      </S.Main>
    </S.Container>
  );
};

export default NodeCenter;
