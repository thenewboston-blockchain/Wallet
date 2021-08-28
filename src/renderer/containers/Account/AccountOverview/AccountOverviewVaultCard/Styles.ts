import styled, {css} from 'styled-components';

import UCard from '@renderer/components/Card';
import {Button, ButtonColor, ButtonVariant} from '@renderer/components/FormElements';
import {RocketLaunchIcon as URocketLaunchIcon} from '@renderer/components/Icons';
import {b1, b2, colors, d2, h3} from '@renderer/styles';

export const Card = styled(UCard)`
  height: 100%;
`;

const cardDivider = css`
  border-bottom: 1px solid ${colors.palette.neutral['075']};
`;

export const TopSection = styled.div`
  ${cardDivider};
  display: flex;
  justify-content: space-between;
  padding: 24px 24px 16px;
`;

export const TopSectionLeft = styled.div``;

export const BalanceLabel = styled.h3`
  ${h3.regular};
  color: ${colors.palette.neutral['600']};
  margin-bottom: 3px;
`;

export const Balance = styled.h1`
  ${d2.regular};
  color: ${colors.palette.neutral['800']};
`;

export const TopSectionRight = styled.div``;

export const DepositButton = styled(Button)`
  margin-right: 3px;
`;

export const BoostSection = styled.div`
  ${cardDivider};
  display: flex;
  justify-content: space-between;
  padding: 16px 24px 20px;
`;

export const BoostLabelValueContainer = styled.div``;

export const BoostLeftSection = styled.div`
  display: flex;

  ${BoostLabelValueContainer} + ${BoostLabelValueContainer} {
    margin-left: 36px;
  }
`;

export const BoostLabel = styled.div`
  ${b2.regular};
  color: ${colors.palette.neutral['500']};
  margin-bottom: 3px;
`;

export const BoostValue = styled.div`
  ${b1.regular};
  color: ${colors.palette.gray['900']};
`;

export const BoostRightSection = styled.div``;

export const BoostNodeButton = styled(Button).attrs(() => ({
  color: ButtonColor.secondary,
  variant: ButtonVariant.outlined,
}))`
  align-items: center;
  display: flex;
  margin-right: 3px;
`;

export const RocketLaunchIcon = styled(URocketLaunchIcon).attrs(() => ({
  color: colors.palette.blue['500'],
}))`
  margin-right: 3px;
`;

export const PointsSection = styled.div`
  ${cardDivider};
  padding: 16px 24px 20px;
`;

export const PointsLabel = styled.div`
  ${b2.regular};
  color: ${colors.palette.neutral['500']};
  margin-bottom: 3px;
`;

export const PointsProgressBar = styled.div`
  background: ${colors.progressBar};
  border-radius: 8px;
  height: 12px;
  margin-bottom: 9px;
`;

export const PointsRatioText = styled.div`
  ${b1.regular};
  color: ${colors.palette.neutral['900']};
`;

export const LinkSection = styled.div`
  padding: 1px 6px;
`;
