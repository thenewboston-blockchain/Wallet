import styled, {css} from 'styled-components';
import {AlertIcon as UAlertIcon, CheckCircleIcon as UCheckCircleIcon} from '@renderer/components/Icons';
import {b2, colors} from '@renderer/styles';
import {HelperTextType} from './types';

interface Type {
  $type: HelperTextType;
}

const colorMap = {
  [HelperTextType.success]: colors.palette.green['500'],
  [HelperTextType.error]: colors.palette.red['500'],
  [HelperTextType.default]: colors.palette.neutral['400'],
};

export const Container = styled.div<Type>`
  ${b2.regular};
  align-items: center;
  color: ${({$type}) => colorMap[$type]};
  display: flex;
  margin-left: 12px;
  margin-top: 6px;
`;

const iconStyle = css<Type>`
  color: ${({$type}) => colorMap[$type]};
  margin-right: 3px;
`;

export const AlertIcon = styled(UAlertIcon).attrs(() => ({
  size: 14,
  totalSize: 'unset',
}))<Type>`
  ${iconStyle};
`;

export const CheckCircleIcon = styled(UCheckCircleIcon).attrs(() => ({
  size: 14,
  totalSize: 'unset',
}))<Type>`
  ${iconStyle};
`;
