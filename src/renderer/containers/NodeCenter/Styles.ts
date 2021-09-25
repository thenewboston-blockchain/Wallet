import styled from 'styled-components';
import {colors, h1} from '@renderer/styles';

export const Container = styled.div``;

export const Main = styled.div`
  background: ${colors.white};
  padding: 32px 0;
`;

export const TableHeader = styled.h1`
  ${h1.regular};
  color: ${colors.palette.gray['500']};
  margin: 0 41px;
`;
