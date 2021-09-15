import styled from 'styled-components';
import {mixinPageHeaderMargin} from '@renderer/styles';
import UNodeHeader from './NodeHeader';

export const Header = styled(UNodeHeader)`
  ${mixinPageHeaderMargin};
`;
