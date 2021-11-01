import styled from 'styled-components';
import {b3, colors} from 'renderer/styles';

const maxWidthText = '175px';

export const Container = styled.div``;

export const Title = styled.div`
  ${b3.regular};
  color: ${colors.palette.neutral['500']};
  height: 15px;
  margin-bottom: 3px;
  max-width: ${maxWidthText};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Body = styled.div`
  display: flex;
  height: 20px;
`;

export const MainText = styled.h3<{$hasVisibilityToggle: boolean}>`
  max-width: ${maxWidthText};
  min-width: ${({$hasVisibilityToggle}) => ($hasVisibilityToggle ? '165px' : null)};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
