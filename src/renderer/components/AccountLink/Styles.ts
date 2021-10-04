import styled from 'styled-components';
import {NavLink as UNavLink} from 'react-router-dom';
import {colors} from '@renderer/styles';

export const NavLink = styled(UNavLink)`
  color: ${colors.palette.blue['500']};
  text-decoration: none;

  &:hover,
  &:focus {
    text-decoration: underline;
  }
`;
