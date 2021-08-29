import styled from 'styled-components';
import UCard from '@renderer/components/Card';
import {Button, ButtonSize, ButtonVariant} from '@renderer/components/FormElements';

export const Card = styled(UCard)`
  padding: 24px 0;
`;

export const WithdrawButton = styled(Button).attrs(() => ({
  fullWidth: false,
  size: ButtonSize.small,
  variant: ButtonVariant.outlined,
}))`
  && {
    user-select: none;
  }
`;
