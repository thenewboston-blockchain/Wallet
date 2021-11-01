import styled from 'styled-components';
import UCard from 'renderer/components/Card';
import {b2, colors} from 'renderer/styles';

export const Card = styled(UCard)`
  padding: 24px;
`;

export const Label = styled.div`
  ${b2.regular};
  color: ${colors.palette.neutral['500']};
  margin-bottom: 3px;
  margin-top: 24px;
`;
