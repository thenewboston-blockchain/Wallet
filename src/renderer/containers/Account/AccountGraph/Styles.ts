import styled, {css} from 'styled-components';
import Card from '@renderer/components/Card';
import colors from '@renderer/styles/colors';
import {d2} from '@renderer/styles/fonts';

interface FilterProps {
  $active: boolean;
}

export const Container = styled(Card)`
  padding-top: 24px;
`;

export const Top = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 3px;
  padding-left: 24px;
  padding-right: 24px;
`;

export const TopLabel = styled.h3`
  color: ${colors.palette.neutral['600']};
  margin-bottom: 3px;
`;

export const Balance = styled.h1`
  ${d2.regular};
  color: ${colors.palette.neutral['800']};
`;

export const Filter = styled.h4<FilterProps>`
  color: ${colors.palette.neutral['300']};
  cursor: pointer;

  ${({$active}) =>
    $active &&
    css`
      color: ${colors.palette.neutral['900']};
      cursor: default;
    `}
`;

export const TopRight = styled.div`
  display: flex;

  > ${Filter} {
    margin-left: 24px;
  }
`;
