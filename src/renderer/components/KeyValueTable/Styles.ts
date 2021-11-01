import styled, {css} from 'styled-components';
import {colors} from 'renderer/styles';

export const Container = styled.div``;

export const Row = styled.div<{$isSummary: boolean}>`
  border-bottom: 1px solid ${colors.palette.neutral['100']};
  display: flex;
  justify-content: space-between;
  padding-bottom: 6px;
  padding-top: 6px;

  ${({$isSummary}) =>
    $isSummary &&
    css`
      border-bottom: none;
      border-top: 2px solid ${colors.palette.neutral['100']};
    `}
`;

export const Label = styled.div`
  color: ${colors.palette.neutral['500']};
  display: flex;
  flex: 1;
`;

export const Value = styled.div`
  color: ${colors.palette.neutral['900']};
  text-align: right;
`;
