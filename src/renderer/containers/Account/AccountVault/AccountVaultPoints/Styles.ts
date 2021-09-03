import styled from 'styled-components';
import UCard from '@renderer/components/Card';
import {colors} from '@renderer/styles';

export const Card = styled(UCard)`
  padding: 24px 0;
`;

export const Points = styled.span<{$isPositive: boolean}>`
  color: ${({$isPositive}) => ($isPositive ? colors.palette.gray['900'] : colors.palette.red['500'])};
`;
