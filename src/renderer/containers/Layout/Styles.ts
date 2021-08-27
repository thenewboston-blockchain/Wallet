import styled from 'styled-components';
import {colors, constants} from '@renderer/styles';
import UTopNav from './TopNav';

export const Container = styled.div`
  display: grid;
  grid-template-columns: ${constants.leftMenuWidth} auto;
  grid-template-rows: min-content auto;
  height: 100vh;
`;

export const TopNav = styled(UTopNav)`
  border-bottom: 1px solid ${colors.palette.gray['100']};
  grid-column: 1 / span 2;
  grid-row: 1 / span 1;
`;

export const Left = styled.div`
  background: ${colors.white};
  border-right: 1px solid ${colors.palette.gray['100']};
  grid-column: 1 / span 1;
  grid-row: 2 / span 1;
  overflow-y: auto;
`;

export const Right = styled.div`
  background-color: ${colors.background};
  grid-column: 2 / span 1;
  grid-row: 2 / span 1;
  overflow-y: auto;
`;
