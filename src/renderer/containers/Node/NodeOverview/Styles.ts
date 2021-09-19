import styled from 'styled-components';
import UCard from '@renderer/components/Card';
import {colors, d2, h3} from '@renderer/styles';

import UNodeOverviewDetails from './NodeOverviewDetails';
import UNodeOverviewGraph from './NodeOverviewGraph';

const GAP = '16px';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 388px 1fr;
  grid-gap: ${GAP};
`;

export const Left = styled.div``;

export const Right = styled.div``;

export const TxCard = styled(UCard)`
  grid-column: 1 / span 1;
  grid-row: 1 / span 1;
  padding: 24px;
`;

export const TxLabel = styled.h3`
  ${h3.regular};
  color: ${colors.palette.gray['600']};
  display: block;
  margin-bottom: 4px;
`;

export const Tx = styled.h1`
  ${d2.regular};
  color: ${colors.palette.gray['800']};
`;

export const NodeOverviewDetails = styled(UNodeOverviewDetails)`
  margin-top: ${GAP};
`;

export const NodeOverviewGraph = styled(UNodeOverviewGraph)``;
