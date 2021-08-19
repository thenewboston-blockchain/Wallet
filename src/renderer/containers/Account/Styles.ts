import styled from 'styled-components';
import UAccountGraph from './AccountGraph';
import UAccountHeader from './AccountHeader';

const gap = 16;

export const Header = styled(UAccountHeader)`
  margin-bottom: 30px;
  margin-top: ${gap}px;
`;

export const Graph = styled(UAccountGraph)`
  margin-bottom: ${gap}px;
`;

export const BottomRow = styled.div`
  display: grid;
  grid-auto-columns: calc(50% - ${gap / 2}px);
  grid-auto-flow: column;
  grid-gap: ${gap}px;
`;
