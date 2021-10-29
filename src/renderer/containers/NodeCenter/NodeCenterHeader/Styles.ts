import styled from 'styled-components';
import {Button, ButtonColor, ButtonVariant} from 'renderer/components/FormElements';
import {OpenInNewIcon} from 'renderer/components/Icons';
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

export const LearnMoreIcon = styled(OpenInNewIcon).attrs(() => ({
  size: 14,
  totalSize: 'unset',
}))`
  display: inline-block;
`;
