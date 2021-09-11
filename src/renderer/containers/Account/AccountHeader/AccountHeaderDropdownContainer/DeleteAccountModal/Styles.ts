import styled from 'styled-components';
import {FormButton} from '@renderer/components/FormComponents';
import {AlertIcon as UAlertIcon} from '@renderer/components/Icons';
import {colors, h2, h4} from '@renderer/styles';
import {ButtonColor, ButtonType} from '@renderer/components/FormElements';

export const Header = styled.h2`
  ${h2.medium};
  color: ${colors.palette.red['500']};
`;

export const AlertIcon = styled(UAlertIcon)`
  color: ${colors.palette.red['400']};
  margin-right: 9px;
`;

export const Text = styled.div`
  margin-bottom: 60px;
`;

export const Warning = styled.span`
  ${h4.medium};
  color: ${colors.palette.red['500']};
  text-transform: uppercase;
`;

export const SubmitButton = styled(FormButton).attrs(() => ({
  color: ButtonColor.danger,
  ignoreDirty: true,
  type: ButtonType.submit,
}))``;
