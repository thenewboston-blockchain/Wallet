import styled from 'styled-components';
import Badge from '@renderer/components/Badge';
import UProgressBar from '@renderer/components/ProgressBar';
import UStatusBadge from '@renderer/components/StatusBadge';
import {b1, colors, h1} from '@renderer/styles';
import UNodeCenterTable from './NodeCenterTable';

export const Container = styled.div``;

export const Main = styled.div`
  background: ${colors.white};
  padding: 32px 0;
`;

export const TableHeader = styled.h1`
  ${h1.regular};
  color: ${colors.palette.gray['500']};
  margin: 0 41px 32px;
`;

export const NodeCenterTable = styled(UNodeCenterTable)`
  margin-bottom: 32px;
`;

export const PvBadge = styled(Badge)`
  ${b1.regular};
  color: ${colors.white};
  background: ${colors.palette.green['300']};
`;

export const StatusWrapper = styled.div`
  align-items: center;
  display: flex;
`;

export const StatusBadge = styled(UStatusBadge)`
  margin-right: 8px;
`;

export const TotalBoostsContainer = styled.div`
  align-items: center;
  display: flex;
`;

export const ProgressBar = styled(UProgressBar)`
  margin-right: 16px;
  width: 160px;
`;
