import React from 'react';

import {StatusBadgeType} from '@renderer/components/StatusBadge';
import {SFC} from '@renderer/types';
import {truncateLongText} from '@renderer/utils/accounts';

import {NodeData, otherNodes, top20Nodes} from './data';
import {NodeCenterTableKeys} from './NodeCenterTable';
import NodeCenterHeader from './NodeCenterHeader';
import * as S from './Styles';

const transformNodeData = (nodeData: NodeData[]) => {
  return nodeData.map((node) => ({
    key: node.networkId,
    [NodeCenterTableKeys.rank]: node.rank,
    [NodeCenterTableKeys.isPv]: node.isPv ? <S.PvBadge>PV</S.PvBadge> : '',
    [NodeCenterTableKeys.status]: (
      <S.StatusWrapper>
        <S.StatusBadge status={node.isActive ? StatusBadgeType.active : StatusBadgeType.inactive} />
        {node.isActive ? 'Active' : 'Inactive'}
      </S.StatusWrapper>
    ),
    [NodeCenterTableKeys.networkId]: truncateLongText(node.networkId),
    [NodeCenterTableKeys.ipAddress]: node.ipAddress,
    [NodeCenterTableKeys.txFeeRate]: node.txFeeRate,
    [NodeCenterTableKeys.totalBoosts]: (
      <S.TotalBoostsContainer>
        <S.ProgressBar progress={node.totalBoosts} total={300000} />
        {node.totalBoosts.toLocaleString()}
      </S.TotalBoostsContainer>
    ),
    [NodeCenterTableKeys.boostAction]: (
      <S.BoostButton>
        <S.RocketLaunchIcon />
        Boost
      </S.BoostButton>
    ),
  }));
};

const top20TableData = transformNodeData(top20Nodes);
const otherTableData = transformNodeData(otherNodes);

const NodeCenter: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <NodeCenterHeader />
      <S.Main>
        <S.TableHeader>Top 20 Nodes</S.TableHeader>
        <S.NodeCenterTable data={top20TableData} />
        <S.TableHeader>Other Nodes</S.TableHeader>
        <S.NodeCenterTable data={otherTableData} />
      </S.Main>
    </S.Container>
  );
};

export default NodeCenter;
