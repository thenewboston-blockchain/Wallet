import styled from 'styled-components';
import {FormSelectDetailed as UFormSelectDetailed} from '@renderer/components/FormComponents';
import UKeyValueTable, {Row as URow} from '@renderer/components/KeyValueTable';
import {colors} from '@renderer/styles';
import * as NodeCenterStyles from '../Styles';

export const Table = styled(UKeyValueTable)`
  margin-bottom: 56px;
`;

export const Row = styled(URow)``;

export const {StatusWrapper, StatusBadge, ProgressBar, TotalBoostsContainer} = NodeCenterStyles;

export const Container = styled.div``;

export const FormSelectDetailed = styled(UFormSelectDetailed)`
  margin-bottom: 16px;
`;

export const AvailableBoostsContainer = styled.div`
  background: ${colors.palette.neutral['075']};
  border-radius: 4px;
  height: 72px;
  margin-bottom: 56px;
  padding: 16px;
`;

export const AvailableBoostsLabel = styled.span`
  color: ${colors.palette.neutral['500']};
  display: block;
  margin-bottom: 3px;
`;

export const AvailableBoosts = styled.span`
  display: block;
`;
