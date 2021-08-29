import styled from 'styled-components';
import {colors, mixinButtonFocus} from '@renderer/styles';

export const Button = styled.button<{$isActive: boolean}>`
  ${mixinButtonFocus};
  border: none;
  border-radius: 0;
  background: transparent;
  color: ${({$isActive}) => ($isActive ? colors.palette.gray['900'] : colors.palette.gray['300'])};
  cursor: ${({$isActive}) => ($isActive ? null : 'pointer')};
  min-height: 40px;
  padding: 6px 12px;
  transition: all 0.1s;

  &:hover {
    background-color: ${({$isActive}) => ($isActive ? null : colors.palette.gray['100'])};
    color: ${({$isActive}) => ($isActive ? null : colors.palette.gray['900'])};
  }
`;
