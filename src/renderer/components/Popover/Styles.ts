import styled, {css, keyframes} from 'styled-components';
import {CloseIcon as UCloseIcon} from '@renderer/components/Icons';
import {colors} from '@renderer/styles';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const Container = styled.div<{$isOpen: boolean}>`
  background: ${colors.white};
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(85, 108, 214, 0.24);
  opacity: 0;
  outline: none;
  position: absolute;
  visibility: hidden;

  ${({$isOpen}) =>
    $isOpen &&
    css`
      animation: ${fadeIn} 0.3s ease-out;
      opacity: 1;
      visibility: visible;
    `};
`;

export const CloseIcon = styled(UCloseIcon)`
  position: absolute;
  right: 18px;
  top: 18px;
`;
