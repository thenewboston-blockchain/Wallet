import styled from 'styled-components';
import UKeyValueTable, {Row as URow} from '@renderer/components/KeyValueTable';
import {InformationOutlineIcon} from '@renderer/components/Icons';
import {colors} from '@renderer/styles';

export const Table = styled(UKeyValueTable)`
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
