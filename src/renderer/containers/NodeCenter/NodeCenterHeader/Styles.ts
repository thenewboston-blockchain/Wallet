import styled from 'styled-components';
import {mdiOpenInNew} from '@mdi/js';

import {Button, ButtonColor, ButtonVariant} from 'renderer/components/FormElements';
import Icon from 'renderer/components/Icon';
import {h1} from 'renderer/styles';

export const Container = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 32px 40px;
`;

export const Header = styled.h1`
  ${h1.regular};
`;

export const LearnMoreButton = styled(Button).attrs(() => ({
  color: ButtonColor.secondary,
  fullWidth: false,
  variant: ButtonVariant.outlined,
}))`
  align-items: center;
  display: flex;
  gap: 9px;
`;

export const LearnMoreIcon = styled(Icon).attrs(() => ({
  icon: mdiOpenInNew,
  size: 14,
  totalSize: 'unset',
}))`
  display: inline-block;
`;
