import styled from 'styled-components';
import {mixinPageHeaderMargin} from 'renderer/styles';
import UAccountHeader from './AccountHeader';

export const Header = styled(UAccountHeader)`
  ${mixinPageHeaderMargin};
`;
