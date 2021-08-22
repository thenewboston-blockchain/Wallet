import styled from 'styled-components';
import UAccountGraph from '../AccountGraph';

const gap = 16;

export const Graph = styled(UAccountGraph)`
  margin-bottom: ${gap}px;
`;

export const BottomRow = styled.div`
  display: grid;
  grid-auto-columns: calc(50% - ${gap / 2}px);
  grid-auto-flow: column;
  grid-gap: ${gap}px;
`;
