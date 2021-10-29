import styled from 'styled-components';

// Temp
import Card from 'renderer/components/Card';
// Temp end
import UAccountOverviewGraph from './AccountOverviewGraph';

const gap = 16;

export const Container = styled.div``;

export const Graph = styled(UAccountOverviewGraph)`
  margin-bottom: ${gap}px;
`;

export const BottomRow = styled.div`
  display: grid;
  grid-auto-columns: calc(50% - ${gap / 2}px);
  grid-auto-flow: column;
  grid-gap: ${gap}px;
  height: 346px;
`;

// Temp
export const TempCard = styled(Card)`
  padding: 24px;
  margin-top: 24px;
`;
// Temp End
