import styled, {css} from 'styled-components';
import UBadge from '@renderer/components/Badge';
import UCard from '@renderer/components/Card';
import UPageTable from '@renderer/components/PageTable';
import {colors, d2} from '@renderer/styles';

export const Card = styled(UCard)`
  padding-top: 24px;
`;

export const Top = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 3px;
  padding-left: 24px;
  padding-right: 24px;
`;

export const TopLeft = styled.div``;

export const TopLabel = styled.h3`
  color: ${colors.palette.gray['600']};
  margin-bottom: 3px;
`;

export const TopBoostSection = styled.div`
  display: flex;
  align-items: center;
`;

export const Boost = styled.h1`
  ${d2.regular};
  color: ${colors.palette.gray['800']};
  margin-right: 24px;
`;

export const RankBadge = styled(UBadge)`
  background: ${colors.palette.green['100']};
  margin-right: 13px;
`;

export const TopBadge = styled(UBadge)`
  background: ${colors.badgeGold};
  margin-right: 13px;
`;

export const Filter = styled.h4<{$active: boolean}>`
  color: ${colors.palette.neutral['300']};
  cursor: pointer;

  ${({$active}) =>
    $active &&
    css`
      color: ${colors.palette.neutral['900']};
      cursor: default;
    `}
`;

export const TopRight = styled.div`
  display: flex;

  > ${Filter} {
    margin-left: 24px;
  }
`;

export const GraphWrapper = styled.div`
  border-bottom: 1px solid ${colors.palette.gray['100']};
`;

export const PageTable = styled(UPageTable)`
  border-bottom: 1px solid ${colors.palette.neutral['075']};
  margin-top: 24px;
`;

export const BottomContainer = styled.div`
  padding: 0 3px;
`;
