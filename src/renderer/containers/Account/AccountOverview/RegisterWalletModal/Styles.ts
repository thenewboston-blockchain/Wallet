import styled from 'styled-components';
import {mdiAlert, mdiCheckCircle} from '@mdi/js';

import {Loader as ULoader} from 'renderer/components/FormElements';
import Icon from 'renderer/components/Icon';
import UPopover, {HorizontalPosition, VerticalPosition} from 'renderer/components/Popover';
import {colors, h4} from 'renderer/styles';

export const Container = styled.div``;

export const InsufficientFunds = styled.div`
  ${h4.medium};
  align-items: center;
  background-color: ${colors.palette.red['100']};
  border-radius: 4px;
  color: ${colors.palette.red['500']};
  display: flex;
  margin-bottom: 16px;
  padding: 12px 16px;
`;

export const AlertIcon = styled(Icon).attrs(() => ({
  icon: mdiAlert,
  size: 24,
  totalSize: 'unset',
}))`
  color: ${colors.palette.red['500']};
  margin-right: 15px;
`;

export const ErrorArea = styled.div`
  min-height: 50px;
  margin-left: 15px;
  margin-top: 6px;
`;

export const Loader = styled(ULoader).attrs(() => ({size: 14}))`
  justify-content: flex-start;
`;

export const Popover = styled(UPopover).attrs(() => ({
  anchorOrigin: {horizontal: HorizontalPosition.left, vertical: VerticalPosition.bottom},
  transformOffset: {horizontal: 0, vertical: 4},
  transformOrigin: {horizontal: HorizontalPosition.left, vertical: VerticalPosition.top},
}))`
  padding: 18px;
`;

export const PopoverRow = styled.div`
  align-items: center;
  display: flex;
  gap: 14px;

  &:not(:last-of-type) {
    margin-bottom: 12px;
  }
`;

export const CheckIcon = styled(Icon).attrs(() => ({icon: mdiCheckCircle, size: 20, totalSize: 'unset'}))<{
  $isValid: boolean;
}>`
  color: ${({$isValid}) => ($isValid ? colors.palette.green['400'] : colors.palette.neutral['200'])};
`;
