import styled from 'styled-components';
import {colors, h4} from '@renderer/styles';

export const Badge = styled.span`
  ${h4.bold};
  background: ${colors.badgeGold};
  border-radius: 100px;
  display: inline-flex;
  padding: 3px 8px;
`;
