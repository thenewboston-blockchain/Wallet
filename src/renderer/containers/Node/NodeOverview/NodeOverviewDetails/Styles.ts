import styled from 'styled-components';
import UCard from 'renderer/components/Card';
import UKeyValueTable, {Row as URow, KeyValueTableStyles} from 'renderer/components/KeyValueTable';
import {colors, h3} from 'renderer/styles';

export const Card = styled(UCard)`
  padding-bottom: 24px;
  padding-top: 24px;
`;

export const Title = styled.h3`
  ${h3.regular};
  color: ${colors.palette.gray['600']};
  margin: 0 24px 32px;
`;

export const Table = styled(UKeyValueTable)``;

export const Row = styled(URow)`
  padding-left: 24px;
  padding-right: 24px;

  &:last-of-type {
    border-bottom: none;
  }

  ${KeyValueTableStyles.Label} {
    max-width: 143px;
  }

  ${KeyValueTableStyles.Value} {
    max-width: 184px;
    word-break: break-all;
  }
`;
