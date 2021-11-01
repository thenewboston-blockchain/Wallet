import styled, {css} from 'styled-components';
import {mdiPlay} from '@mdi/js';
import Icon from 'renderer/components/Icon';
import {colors} from 'renderer/styles';

interface ArrowToggleProps {
  $expanded: boolean;
}

const expandedStyles = css`
  margin-left: 1px;
  margin-right: -1px;
  transform: rotate(90deg);
`;

export const ArrowToggle = styled(Icon).attrs(() => ({icon: mdiPlay}))<ArrowToggleProps>`
  color: ${colors.palette.gray['700']};
  transition: transform 0.06s linear;

  ${({$expanded}) => $expanded && expandedStyles};
`;
