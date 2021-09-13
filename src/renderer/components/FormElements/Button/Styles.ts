import styled, {css} from 'styled-components';
import {colors, mixinButtonFocus} from '@renderer/styles';
import {ButtonColor, ButtonSize, ButtonVariant} from './types';

interface ButtonProps {
  $color: ButtonColor;
  disabled: boolean;
  $fullWidth: boolean;
  $size: ButtonSize;
  $variant: ButtonVariant;
}

const containedMixin = css`
  border-width: 2px;
  color: ${colors.white};
`;

const containedPrimaryMixin = css<ButtonProps>`
  background: ${({disabled}) => (disabled ? colors.palette.gray['200'] : colors.primary)};
  border-color: ${({disabled}) => (disabled ? colors.palette.gray['200'] : colors.primary)};
  color: ${({disabled}) => (disabled ? colors.white : null)};

  &:hover {
    background: ${({disabled}) => (disabled ? colors.palette.gray['200'] : colors.white)};
    border-color: ${({disabled}) => (disabled ? colors.palette.gray['200'] : colors.palette.gray['900'])};
    color: ${({disabled}) => (disabled ? colors.white : colors.palette.gray['900'])};
  }
`;

const containedDangerMixin = css<ButtonProps>`
  background: ${({disabled}) => (disabled ? colors.palette.neutral['200'] : colors.palette.red['400'])};
  border-color: ${({disabled}) => (disabled ? colors.palette.neutral['200'] : colors.palette.red['400'])};
  color: ${({disabled}) => (disabled ? colors.white : colors.white)};

  &:hover {
    background: ${({disabled}) => (disabled ? colors.palette.neutral['200'] : colors.white)};
    border-color: ${({disabled}) => (disabled ? colors.palette.neutral['200'] : colors.palette.red['500'])};
    color: ${({disabled}) => (disabled ? colors.white : colors.palette.red['500'])};
  }
`;

const outlinedMixin = css`
  background: transparent;
`;

const outlinedPrimaryMixin = css<ButtonProps>`
  background: ${({disabled}) => (disabled ? colors.white : null)};
  border-color: ${({disabled}) => (disabled ? colors.white : colors.palette.gray['200'])};
  color: ${({disabled}) => (disabled ? colors.palette.gray['200'] : colors.primary)};

  &:hover {
    background: ${({disabled}) => (disabled ? colors.palette.gray['050'] : null)};
  }
`;

const outlinedSecondaryMixin = css<ButtonProps>`
  border-color: ${({disabled}) => (disabled ? 'transparent' : colors.palette.blue['400'])};
  color: ${({disabled}) => (disabled ? colors.palette.gray['200'] : colors.palette.blue['500'])};

  &:hover {
    background: ${({disabled}) => (disabled ? null : colors.palette.blue['100'])};
  }
`;

export const Button = styled.button<ButtonProps>`
  ${mixinButtonFocus};
  border-radius: 100px;
  border-style: solid;
  border-width: 1px;
  cursor: ${({disabled}) => (disabled ? null : 'pointer')};
  min-height: ${({$size}) => ($size === ButtonSize.regular ? '40px' : '24px')};
  padding: 0 ${({$size}) => ($size === ButtonSize.regular ? '16px' : '12px')};
  transition: all 0.1s;
  width: ${({$fullWidth}) => ($fullWidth ? `calc(100% - 2 * 6px)` : null)};

  ${({$variant}) => {
    if ($variant === ButtonVariant.contained) {
      return containedMixin;
    }

    if ($variant === ButtonVariant.outlined) {
      return outlinedMixin;
    }
  }};

  ${({$variant, $color}) => {
    if ($variant === ButtonVariant.contained) {
      if ($color === ButtonColor.primary) {
        return containedPrimaryMixin;
      }

      if ($color === ButtonColor.danger) {
        return containedDangerMixin;
      }
    }

    if ($variant === ButtonVariant.outlined) {
      if ($color === ButtonColor.primary) {
        return outlinedPrimaryMixin;
      }
      if ($color === ButtonColor.secondary) {
        return outlinedSecondaryMixin;
      }
    }
  }};
`;
