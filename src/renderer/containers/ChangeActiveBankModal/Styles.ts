import styled from 'styled-components';
import {colors} from 'renderer/styles';

export const Container = styled.div`
  & > * {
    margin-bottom: 12px;
  }
`;

export const ErrorMessage = styled.span`
  color: ${colors.palette.red['500']};
  display: block;
  margin-bottom: 6px;
`;
