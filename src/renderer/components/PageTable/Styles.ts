import styled from 'styled-components';
import {colors} from 'renderer/styles';

export const Cell = styled.div<{$align?: 'left' | 'center' | 'right'; $isHeader?: boolean; $numOfCols: number}>`
  align-items: center;
  border-bottom: 1px solid ${colors.palette.neutral['075']};
  color: ${({$isHeader}) => ($isHeader ? colors.palette.neutral['500'] : null)};
  justify-content: ${({$align}) => {
    if ($align === 'center') return 'center';
    if ($align === 'right') return 'flex-end';
    return 'flex-start';
  }};
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

export const Header = styled.div;

export const Grid = styled.div<{$gridTemplateColumns?: string; $numOfCols: number}>`
  display: grid;
  grid-template-columns: ${({$gridTemplateColumns, $numOfCols}) =>
    $gridTemplateColumns || `repeat(${$numOfCols - 1}, max-content) minmax(max-content, 1fr)`};
  overflow-x: auto;
  overflow-y: hidden;
`;
