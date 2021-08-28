import styled from 'styled-components';
import {colors} from '@renderer/styles';

export const Cell = styled.div<{$isHeader?: boolean; $numOfCols: number}>`
  align-items: center;
  border-bottom: 1px solid ${colors.palette.neutral['075']};
  color: ${({$isHeader}) => ($isHeader ? colors.palette.neutral['500'] : null)};
  display: flex;
  height: 32px;
  padding-right: 14px;

  &:nth-child(${({$numOfCols}) => $numOfCols}n + 1) {
    padding-left: 24px;
  }

  &:nth-child(${({$numOfCols}) => $numOfCols}n) {
    padding-right: 24px;
  }

  &&,
  && * {
    user-select: ${({$isHeader}) => !$isHeader && 'text'};
  }
`;

export const Grid = styled.div<{$numOfCols: number}>`
  display: grid;
  grid-template-columns: repeat(${({$numOfCols}) => $numOfCols - 1}, max-content) minmax(max-content, 1fr);
  overflow-x: auto;
`;
