import {PageTableData, PageTableItems} from 'renderer/components/PageTable';
import {SFC} from 'shared/types';
import * as S from './Styles';

export enum NodeCenterTableKeys {
  rank,
  isPv,
  status,
  networkId,
  ipAddress,
  txFeeRate,
  totalBoosts,
  boostAction,
}

const orderedKeys = [
  NodeCenterTableKeys.rank,
  NodeCenterTableKeys.isPv,
  NodeCenterTableKeys.status,
  NodeCenterTableKeys.networkId,
  NodeCenterTableKeys.ipAddress,
  NodeCenterTableKeys.txFeeRate,
  NodeCenterTableKeys.totalBoosts,
  NodeCenterTableKeys.boostAction,
];

const headers = {
  [NodeCenterTableKeys.rank]: 'Rank',
  [NodeCenterTableKeys.isPv]: '',
  [NodeCenterTableKeys.status]: 'Status',
  [NodeCenterTableKeys.networkId]: 'Network ID',
  [NodeCenterTableKeys.ipAddress]: 'IP Address',
  [NodeCenterTableKeys.txFeeRate]: 'Tx Fee Rate',
  [NodeCenterTableKeys.totalBoosts]: 'Total Boosts',
  [NodeCenterTableKeys.boostAction]: '',
};

export interface NodeCenterTableProps {
  data: PageTableData[];
}

const NodeCenterTable: SFC<NodeCenterTableProps> = ({className, data}) => {
  const pageTableItems: PageTableItems = {
    data,
    headers,
    meta: {
      align: {
        [NodeCenterTableKeys.txFeeRate]: 'right',
        [NodeCenterTableKeys.boostAction]: 'right',
        [NodeCenterTableKeys.rank]: 'center',
      },
      gridTemplateColumns:
        'minmax(max-content, 1fr) max-content minmax(max-content, 2fr) minmax(max-content, 2fr) minmax(max-content, 2fr) minmax(max-content, 2fr) minmax(max-content, 4fr) minmax(max-content, 1fr)',
    },
    orderedKeys,
  };

  return <S.PageTable className={className} items={pageTableItems} />;
};

export default NodeCenterTable;
