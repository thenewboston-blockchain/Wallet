import styled from 'styled-components';
import UAccountOverviewGraph from './AccountOverviewGraph';

// Temp
import Card from '@renderer/components/Card';
// Temp end

const gap = 16;

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

  & > * {
    margin-bottom: 12px;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;
// Temp End
