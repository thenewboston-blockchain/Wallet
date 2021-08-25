import styled, {css, keyframes} from 'styled-components';
import {RefreshIcon as URefreshIcon} from '@renderer//components/Icons';
import colors from '@renderer/styles/colors';
import {d2} from '@renderer/styles/fonts';

export const Container = styled.div`
  display: flex;
  align-items: center;
`;

const flash = keyframes`
  0% {
    opacity: 1;
  }
  15% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
`;

export const Balance = styled.h1<{$updated: boolean}>`
  ${d2.regular};
  animation: ${({$updated}) =>
    $updated
      ? css`
          ${flash} 1s linear
        `
      : null};
  color: ${colors.palette.neutral['800']};
`;

const spin = keyframes`
  0% {
    transform: rotateZ(0);
  }
  100% {
    transform: rotateZ(360deg);
  }
`;

export const RefreshIcon = styled(URefreshIcon)<{disabled: boolean}>`
  animation: ${({disabled}) =>
    disabled
      ? css`
          ${spin} 1s linear infinite
        `
      : null};
  color: ${({disabled}) => (disabled ? colors.palette.gray['300'] : colors.palette.blue['500'])};
  margin-left: 6px;
`;
