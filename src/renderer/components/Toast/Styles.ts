import styled from 'styled-components';
import {
  AlertCircleOutlineIcon as UAlertCircleOutlineIcon,
  CheckCircleIcon as UCheckCircleIcon,
} from '@renderer/components/Icons';
import {colors} from '@renderer/styles';
import {ToastType} from '@renderer/types/toast';

export const Container = styled.div<{type: ToastType}>`
  background-color: ${({type}) => {
    return type === ToastType.success
      ? colors.palette.green['400']
      : type === ToastType.warning
      ? colors.palette.yellow['400']
      : colors.palette.red['400'];
  }};
  display: flex;
  padding: 12px;
`;

export const Text = styled.span`
  align-items: center;
  color: ${colors.white};
  display: flex;
`;

const iconProps = `
  color: ${colors.white};
  margin-right: 12px;
`;

export const AlertCircleOutlineIcon = styled(UAlertCircleOutlineIcon)`
  ${iconProps}
`;

export const CheckCircleIcon = styled(UCheckCircleIcon)`
  ${iconProps}
`;
