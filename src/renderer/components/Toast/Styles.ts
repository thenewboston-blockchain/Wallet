import styled from 'styled-components';
import {
  AlertCircleOutlineIcon as UAlertCircleOutlineIcon,
  CheckCircleIcon as UCheckCircleIcon,
} from 'renderer/components/Icons';
import {colors} from 'renderer/styles';
import {ToastType} from 'shared/types/toast';

export const Container = styled.div<{type: ToastType}>`
  background-color: ${({type}) => {
    if (type === ToastType.success) {
      return colors.palette.green['400'];
    }
    if (type === ToastType.warning) {
      return colors.palette.yellow['400'];
    }
    return colors.palette.red['400'];
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
