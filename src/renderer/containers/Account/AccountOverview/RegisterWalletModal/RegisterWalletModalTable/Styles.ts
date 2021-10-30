import styled from 'styled-components';
import {mdiInformationOutline} from '@mdi/js';

import UKeyValueTable, {Row as URow} from 'renderer/components/KeyValueTable';
import Icon from 'renderer/components/Icon';
import {colors} from 'renderer/styles';

export const Table = styled(UKeyValueTable)`
  margin-bottom: 50px;
  padding-left: 3px;
  padding-right: 3px;
`;

export const Row = styled(URow)``;

export const InfoIcon = styled(Icon).attrs(() => ({
  icon: mdiInformationOutline,
  size: 14,
  totalSize: 'unset',
}))`
  color: ${colors.palette.neutral['400']};
  cursor: pointer;
  margin-left: 9px;
`;
