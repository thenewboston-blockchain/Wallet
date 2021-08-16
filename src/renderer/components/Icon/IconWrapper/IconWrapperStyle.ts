import styled, {css} from 'styled-components';
import colors from '@renderer/styles/colors';
import {IconProps} from '../types';

const buttonStyle = css`
  cursor: pointer;

  :hover {
    background: ${colors.palette.gray['100']};
  }
`;

const disabledStyle = css`
  color: ${colors.palette.gray['300']};
  cursor: default;

  :hover {
    background: transparent;
  }
`;

const sizeStyle = (size = 24, totalSize = 30) => css`
  height: ${Math.max(size, totalSize)}px;
  width: ${Math.max(size, totalSize)}px;
`;

export const Wrapper = styled.div<IconProps>`
  align-items: center;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  transition: background-color 0.3s, color 0.3s;

  :focus {
    background: ${colors.palette.gray['100']};
  }

  ${({size, totalSize}) => totalSize !== 'unset' && sizeStyle(size, totalSize)}

  ${({onClick}) => !!onClick && buttonStyle}

  ${({disabled}) => !!disabled && disabledStyle}
`;
