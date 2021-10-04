import styled from 'styled-components';
import {Button, ButtonVariant} from '@renderer/components/FormElements';
import {OpenInNewIcon} from '@renderer/components/Icons';
import UPopover, {HorizontalPosition, VerticalPosition, PopoverStyles} from '@renderer/components/Popover';
import {b1, colors, h2, mixinButtonFocusDarkmode} from '@renderer/styles';

export const Popover = styled(UPopover).attrs(() => ({
  anchorOrigin: {horizontal: HorizontalPosition.left, vertical: VerticalPosition.center},
  transformOffset: {horizontal: -25, vertical: 0},
  transformOrigin: {horizontal: HorizontalPosition.right, vertical: VerticalPosition.center},
}))`
  background: ${colors.palette.blue['700']};
  padding: 24px;
  width: 414px;

  ${PopoverStyles.CloseIcon} {
    color: ${colors.white};

    &:hover {
      color: ${colors.palette.blue['700']};
    }
  }
`;

export const Pointer = styled.div`
  border-bottom: 16px solid transparent;
  border-left: 24px solid ${colors.palette.blue['700']};
  border-top: 16px solid transparent;
  height: 0;
  position: absolute;
  right: -16px;
  top: 50%;
  transform: translateY(calc(-50% - 16px));
  width: 0;
`;

export const Label = styled.span`
  ${b1.regular};
  display: block;
  color: ${colors.white};
  margin-bottom: 28px;
`;

export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const Image = styled.img`
  height: 91px;
  margin-bottom: 24px;
  width: 91px;
`;

export const Header = styled.h2`
  ${h2.regular};
  color: ${colors.white};
  margin-bottom: 16px;
  text-align: center;
`;

export const Text = styled.span`
  ${b1.regular};
  color: ${colors.palette.blue['300']};
  display: block;
  margin-bottom: 27px;
  text-align: center;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const LearnMoreButton = styled(Button).attrs(() => ({
  fullWidth: false,
  variant: ButtonVariant.outlined,
}))`
  ${mixinButtonFocusDarkmode};
  color: ${colors.palette.blue['500']};
  display: flex;
  align-items: center;
  gap: 10px;

  &:hover {
    background: ${colors.palette.blue['100']};
  }
`;

export const ExternalIcon = styled(OpenInNewIcon).attrs(() => ({
  size: 14,
  totalSize: 'unset',
}))`
  display: inline-block;
`;
