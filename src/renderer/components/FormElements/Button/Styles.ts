import styled, {css} from 'styled-components';
import {colors} from '@renderer/styles';
import {ButtonColor, ButtonVariant} from './types';

interface ButtonProps {
  color: ButtonColor;
  disabled: boolean;
  fullWidth: boolean;
  variant: ButtonVariant;
}

const containedMixin = css`
  border-width: 2px;
  color: ${colors.white};
`;

const containedPrimaryMixin = css<ButtonProps>`
  background: ${({disabled}) => (disabled ? colors.palette.gray['400'] : colors.primary)};
  border-color: ${({disabled}) => (disabled ? colors.palette.gray['400'] : colors.primary)};
  color: ${({disabled}) => (disabled ? colors.palette.gray['900'] : null)};

  &:hover {
    background: ${({disabled}) => (disabled ? colors.palette.gray['400'] : colors.white)};
    border-color: ${({disabled}) => (disabled ? colors.palette.gray['400'] : colors.palette.gray['900'])};
    color: ${({disabled}) => (disabled ? colors.white : colors.palette.gray['900'])};
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

export const Button = styled.button<ButtonProps>`
  border-radius: 100px;
  border-style: solid;
  border-width: 1px;
  cursor: ${({disabled}) => (disabled ? null : 'cursor')};
  margin: 6px;
  min-height: 40px;
  padding: 0 16px;
  transition: all 0.1s;
  width: ${({fullWidth}) => (fullWidth ? '100%' : null)};

  &:focus {
    box-shadow: 0 0 0 8px ${colors.palette.gray['100']};
    outline: none;
  }

  ${({variant}) => {
    if (variant === ButtonVariant.contained) {
      return containedMixin;
    }

    if (variant === ButtonVariant.outlined) {
      return outlinedMixin;
    }
  }};

  ${({variant, color}) => {
    if (variant === ButtonVariant.contained) {
      if (color === ButtonColor.primary) {
        return containedPrimaryMixin;
      }
    }

    if (variant === ButtonVariant.outlined) {
      if (color === ButtonColor.primary) {
        return outlinedPrimaryMixin;
      }
    }
  }};
`;
