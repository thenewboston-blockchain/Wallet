import styled, {css} from 'styled-components';
import {mdiChevronLeft, mdiChevronRight} from '@mdi/js';

import Icon from 'renderer/components/Icon';
import {colors} from 'renderer/styles';

export const Container = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  padding-bottom: 24px;
`;

const activeStyle = css`
  background: ${colors.palette.gray['100']};
  color: ${colors.primary};
`;

const disabledStyle = css`
  color: ${colors.palette.gray['700']};
  cursor: default;

  &:hover {
    background: transparent;
  }
`;

const buttonStyle = css`
  align-items: center;
  border-radius: 15px;
  color: ${colors.palette.blue['500']};
  cursor: pointer;
  display: flex;
  height: 30px;
  justify-content: center;
  margin: 0 3px;
  min-width: 30px;
  padding: 0 6px;
  transition: all 0.1s;

  &:hover {
    background: ${colors.palette.gray['100']};
  }
`;

const ellipsesStyle = css`
  color: ${colors.primary};
  cursor: default;

  &:hover {
    background: transparent;
  }
`;

const prevNextButtonStyle = css`
  padding: 0;
`;

export const ChevronLeftIcon = styled(Icon).attrs(() => ({icon: mdiChevronLeft}))<{disabled: boolean}>`
  ${buttonStyle};
  ${prevNextButtonStyle};

  ${({disabled}) => disabled && disabledStyle};
`;

export const ChevronRightIcon = styled(Icon).attrs(() => ({icon: mdiChevronRight}))<{disabled: boolean}>`
  ${buttonStyle};
  ${prevNextButtonStyle};

  ${({disabled}) => disabled && disabledStyle};
`;

export const PageButton = styled.div<{$active: boolean}>`
  ${buttonStyle};
  ${({$active}) => $active && activeStyle};
`;

export const Ellipse = styled.div`
  ${buttonStyle};
  ${ellipsesStyle};
`;
