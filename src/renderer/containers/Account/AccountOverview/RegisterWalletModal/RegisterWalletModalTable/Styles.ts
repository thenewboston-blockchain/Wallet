import styled from 'styled-components';
import UCalculationTable, {Row as URow} from '@renderer/components/CalculationTable';
import {InformationOutlineIcon} from '@renderer/components/Icons';
import {colors} from '@renderer/styles';

export const CalculationTable = styled(UCalculationTable)`
  margin-bottom: 50px;
  padding-left: 3px;
  padding-right: 3px;
`;

export const Row = styled(URow)``;

export const InfoIcon = styled(InformationOutlineIcon).attrs(() => ({
  size: 14,
  totalSize: 'unset',
}))`
  color: ${colors.palette.neutral['400']};
  cursor: pointer;
  margin-left: 9px;
`;
