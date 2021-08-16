import styled, {css} from 'styled-components';
import {PlayIcon} from '@renderer/components/Icon';
import colors from '@renderer/styles/colors';

interface ArrowToggleProps {
  $expanded: boolean;
}

const expandedStyles = css`
  margin-left: 1px;
  margin-right: -1px;
  transform: rotate(90deg);
`;

export const ArrowToggle = styled(PlayIcon)<ArrowToggleProps>`
  color: ${colors.palette.gray['700']};
  transition: transform 0.06s linear;

  ${({$expanded}) => $expanded && expandedStyles};
`;
