import styled from 'styled-components';
import UTabs, {Tab as UTab} from '@renderer/components/Tabs';
import {colors, constants, mixinPageHeaderMargin} from '@renderer/styles';
import UNodeHeader from './NodeHeader';

export const Header = styled(UNodeHeader)`
  ${mixinPageHeaderMargin};
`;

export const Hr = styled.hr`
  border: 1px solid ${colors.palette.gray['100']};
  margin: 0 -${constants.mainContainerPadding};
`;

export const Tabs = styled(UTabs)`
  padding: 24px 12px;
`;

export const Tab = styled(UTab)``;
