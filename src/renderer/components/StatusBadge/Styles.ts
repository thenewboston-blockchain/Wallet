import styled from 'styled-components';
import {colors} from '@renderer/styles';

export enum StatusBadgeType {
  active = 'active',
  alert = 'alert',
  inactive = 'inactive',
}

const getColor = (type: StatusBadgeType) => {
  if (type === StatusBadgeType.active) {
    return colors.palette.green['400'];
  }
  if (type === StatusBadgeType.alert) {
    return colors.palette.red['400'];
  }

  return colors.palette.gray['300'];
};

export const Icon = styled.div<{$type: StatusBadgeType}>`
  background: ${({$type}) => ($type === StatusBadgeType.inactive ? 'transparent' : getColor($type))};
  border-color: ${({$type}) => getColor($type)};
  border-radius: 50%;
  border-style: solid;
  border-width: 1px;
  height: 8px;
  width: 8px;
`;
