import styled from 'styled-components';
import UCard from '@renderer/components/Card';
import {colors, d2, h3} from '@renderer/styles';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 388px 1fr;
  grid-gap: 16px;
`;

export const TxCard = styled(UCard)`
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
