import styled from 'styled-components';
import {colors} from '@renderer/styles';

export const Container = styled.div`
  background: ${colors.palette.neutral['100']};
  border-radius: 8px;
  height: 12px;
  overflow: hidden;
`;

export const ProgressBar = styled.div<{$progress: number}>`
  background: ${colors.palette.green['300']};
  height: 100%;
  width: ${({$progress}) => `${$progress}%`};
`;
