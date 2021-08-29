import styled, {css} from 'styled-components';

import UCard from '@renderer/components/Card';
import {b1, b2, colors, d2, h3} from '@renderer/styles';

export const Card = styled(UCard)`
  padding: 24px;
`;

export const Flex = styled.div`
  display: flex;
  margin-top: 24px;
`;

const rightPaddingAndBorder = css`
  border-right: 1px solid ${colors.palette.gray['100']};
  padding-right: 24px;
`;

export const BalanceContainer = styled.div`
  ${rightPaddingAndBorder};
`;

export const Label = styled.div`
  ${b2.regular};
  color: ${colors.palette.gray['500']};
  margin-bottom: 3px;
`;

export const BalanceValue = styled.h1`
  ${d2.regular};
`;

export const MiddleContainerSet = styled.div`
  margin-left: 24px;
`;

export const MiddleContainer = styled.div`
  ${rightPaddingAndBorder};
  display: flex;
`;

export const MiddleContainerValue = styled.div`
  ${b1.regular};
`;

export const PointsContainer = styled.div`
  margin-left: 24px;
`;

export const ProgressBar = styled.div`
  background: ${colors.progressBar};
  border-radius: 8px;
  height: 12px;
  margin-bottom: 8px;
  width: 483px;
`;

export const PointsRatio = styled.h3`
  ${h3.regular};
  color: ${colors.palette.gray['900']};
`;
