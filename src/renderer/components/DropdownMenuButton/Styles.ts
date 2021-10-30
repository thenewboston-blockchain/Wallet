import styled, {css} from 'styled-components';
import {mdiDevTo, mdiDotsVertical} from '@mdi/js';

import Icon from 'renderer/components/Icon';
import {colors} from 'renderer/styles';

interface ButtonIconProps {
  $isActive: boolean;
}

const iconStyle = css<ButtonIconProps>`
  background-color: ${({$isActive}) => ($isActive ? colors.palette.gray['100'] : null)};
  border-radius: 6px;
`;

export const DevToIcon = styled(Icon).attrs(() => ({icon: mdiDevTo}))<ButtonIconProps>`
  ${iconStyle};
`;

export const DotsVerticalIcon = styled(Icon).attrs(() => ({icon: mdiDotsVertical}))<ButtonIconProps>`
  ${iconStyle};
`;

export const MenuContainer = styled.div`
  background: ${colors.white};
  border-radius: 3px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
  padding: 6px 0;
  position: fixed;
`;

export const Option = styled.div<{$isDisabled: boolean}>`
  align-items: center;
  color: ${({$isDisabled}) => ($isDisabled ? colors.palette.gray['300'] : null)};
  cursor: ${({$isDisabled}) => ($isDisabled ? 'default' : 'pointer')};
  display: flex;
  height: 30px;
  padding: 12px;
  transition: background 0.1s;
  white-space: nowrap;

  &:focus {
    background-color: ${colors.palette.gray['100']};
  }

  &:hover {
    background-color: ${({$isDisabled}) => ($isDisabled ? null : colors.palette.gray['050'])};
  }
`;
