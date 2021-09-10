import styled from 'styled-components';
import {InformationOutlineIcon} from '@renderer/components/Icons';
import {colors} from '@renderer/styles';

export const Container = styled.div`
  margin-bottom: 50px;
  padding-left: 3px;
  padding-right: 3px;
`;

export const Row = styled.div`
  align-items: center;
  border-bottom: 1px solid ${colors.palette.neutral['100']};
  display: flex;
  height: 32px;
  justify-content: space-between;
`;

export const RowLeft = styled.div`
  align-items: center;
  color: ${colors.palette.neutral['500']};
  display: flex;
  flex: 1;
`;

export const InfoIcon = styled(InformationOutlineIcon).attrs(() => ({
  size: 14,
  totalSize: 'unset',
}))`
  color: ${colors.palette.neutral['400']};
  cursor: pointer;
  margin-left: 9px;
`;

export const RowRight = styled.div`
  color: ${colors.palette.neutral['900']};
`;

export const RowSummary = styled(Row)`
  border-bottom: none;
  border-top: 2px solid ${colors.palette.neutral['100']};
`;
