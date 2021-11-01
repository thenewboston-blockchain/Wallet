import {useCallback, useEffect, useState} from 'react';

import {StatusBadgeType} from 'renderer/components/StatusBadge';
import {useToggle} from 'renderer/hooks';
import {truncateLongText} from 'renderer/utils/accounts';
import {SFC} from 'shared/types';

import {NodeData, otherNodes, top20Nodes} from './data';
import NodeCenterBoostNodeModal from './NodeCenterBoostNodeModal';
import NodeCenterPopover from './NodeCenterPopover';
import NodeCenterHeader from './NodeCenterHeader';
import {NodeCenterTableKeys} from './NodeCenterTable';
import * as S from './Styles';

const NodeCenter: SFC = ({className}) => {
  const [popoverAnchorEl, setPopoverAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [popoverWasOpened, togglePopoverWasOpened] = useToggle(false);
  const [boostModalIsOpen, toggleBoostModal] = useToggle(false);
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);
  const popoverIsOpen = !!popoverAnchorEl;

  useEffect(() => {
    if (selectedNode) {
      toggleBoostModal(true);
    }
  }, [selectedNode, toggleBoostModal]);

  const unsetAnchorEl = useCallback((): void => {
    setPopoverAnchorEl(null);
  }, [setPopoverAnchorEl]);

  const handleBoostClick = (nodeData: NodeData) => () => {
    setSelectedNode(nodeData);
  };

  const handleModalClose = () => {
    setSelectedNode(null);
    toggleBoostModal(false);
  };

  const transformNodeData = (nodeDataArray: NodeData[], isTopTwenty = false) => {
    return nodeDataArray.map((node, index) => ({
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
        <S.BoostButton
          onClick={handleBoostClick(node)}
          ref={(ref) => {
            if (!popoverWasOpened && isTopTwenty && index === 5 && ref) {
              setPopoverAnchorEl(ref);
              togglePopoverWasOpened(true);
            }
          }}
        >
          <S.RocketLaunchIcon />
          Boost
        </S.BoostButton>
      ),
    }));
  };

  const top20TableData = transformNodeData(top20Nodes, true);
  const otherTableData = transformNodeData(otherNodes);

  return (
    <S.Container className={className}>
      <NodeCenterHeader />
      <S.Main>
        <S.TableHeader>Top 20 Nodes</S.TableHeader>
        <S.NodeCenterTable data={top20TableData} />
        <S.TableHeader>Other Nodes</S.TableHeader>
        <S.NodeCenterTable data={otherTableData} />
      </S.Main>
      {boostModalIsOpen && selectedNode ? (
        <NodeCenterBoostNodeModal close={handleModalClose} nodeData={selectedNode} />
      ) : null}
      <NodeCenterPopover anchorEl={popoverAnchorEl} closePopover={unsetAnchorEl} open={popoverIsOpen} />
    </S.Container>
  );
};

export default NodeCenter;
