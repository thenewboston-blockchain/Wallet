import styled, {css} from 'styled-components';
import {Link as RRLink, LinkProps as RRLinkProps} from 'react-router-dom';
import {mdiChevronRight} from '@mdi/js';

import Icon from 'renderer/components/Icon';
import {colors} from 'renderer/styles';

interface LinkProps extends RRLinkProps {
  $disabled: boolean;
  $textStyled: boolean;
}

export const Link = styled(RRLink)<LinkProps>`
  cursor: ${({$disabled}) => ($disabled ? null : 'cursor')};
  text-decoration: none;
  transition: all 0.1s;

  ${({$textStyled}) =>
    !$textStyled &&
    css`
      align-items: center;
      border: 1px solid transparent;
      border-radius: 100px;
      display: inline-flex;
      justify-content: center;
      margin: 6px;
      min-height: 40px;
      padding: 0 16px;

      &:focus {
        box-shadow: 0 0 0 8px ${colors.palette.gray['100']};
        outline: none;
      }
    `};

  &:hover {
    text-decoration: underline;
  }
`;

export const ChevronRightIcon = styled(Icon).attrs(() => ({icon: mdiChevronRight}))`
  margin-right: -8px;
  position: relative;
  top: 1px;
`;
