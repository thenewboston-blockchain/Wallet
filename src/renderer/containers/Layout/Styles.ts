import styled from 'styled-components';
import {colors, constants} from 'renderer/styles';

import ULeftMenu from './LeftMenu';
import UTopNav from './TopNav';

export const Container = styled.div`
  display: grid;
  grid-template-columns: ${constants.leftMenuWidth} minmax(
      min(${constants.maxClientWidth} - ${constants.leftMenuWidth}, 100%),
      1fr
    );
  grid-template-rows: min-content auto;
  height: 100vh;
`;

export const TopNav = styled(UTopNav)`
  border-bottom: 1px solid ${colors.palette.gray['100']};
  grid-column: 1 / span 2;
  grid-row: 1 / span 1;
`;

export const LeftMenu = styled(ULeftMenu)`
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
