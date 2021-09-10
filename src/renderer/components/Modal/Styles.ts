import styled, {keyframes} from 'styled-components';
import {CloseIcon as UCloseIcon} from '@renderer/components/Icons';
import {colors} from '@renderer/styles';

const FOOTER_HEIGHT = '60px';

const addOverlay = keyframes`
  from {
    background: rgba(0, 0, 0, 0);
  }
  to {
    background: rgba(44, 57, 103, 0.3); // Primary color
  }
`;

export const Overlay = styled.div<{$submitting: boolean}>`
  animation: ${addOverlay} 0.3s forwards;
  cursor: ${({$submitting}) => ($submitting ? 'wait' : null)};
  height: 100vh;
  left: 0;
  position: fixed;
  top: 0;
  width: 100vw;
`;

export const Container = styled.div`
  background: ${colors.white};
  left: 50%;
  padding: 24px 24px 20px;
  position: fixed;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 414px;
`;

export const Header = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: 45px;
  position: relative;
`;

export const CloseIcon = styled(UCloseIcon)<{$submitting: boolean}>`
  cursor: ${({$submitting}) => ($submitting ? 'wait' : null)};
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
`;

export const MainContent = styled.div<{$noFooter: boolean}>`
  max-height: calc(85vh - ${({$noFooter}) => ($noFooter ? '0' : FOOTER_HEIGHT)});
  overflow-y: auto;
`;

export const Footer = styled.div`
  align-items: center;
  display: flex;
  height: ${FOOTER_HEIGHT};
  justify-content: flex-end;
`;
