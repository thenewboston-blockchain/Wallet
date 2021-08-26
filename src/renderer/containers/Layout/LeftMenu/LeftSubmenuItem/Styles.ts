import {NavLink} from 'react-router-dom';
import styled, {css} from 'styled-components';
import {b2, colors} from '@renderer/styles';

interface StyledLinkProps {
  $withSubLabel: boolean;
}

const withSubLabelStyle = css`
  padding-bottom: 6px;
  padding-top: 6px;
`;

export const StyledLink = styled(NavLink)<StyledLinkProps>`
  border-radius: 8px;
  display: block;
  padding-bottom: 3px;
  padding-left: 28px;
  padding-top: 3px;
  text-decoration: none;

  &:focus:not(.active),
  &:hover {
    background: ${colors.palette.neutral['050']};
  }

  &.active,
  &.active:hover {
    background: ${colors.palette.neutral['075']};
  }

  ${({$withSubLabel}) => ($withSubLabel ? withSubLabelStyle : null)}
`;

export const SubLabel = styled.div`
  ${b2.regular};
  color: ${colors.palette.neutral['500']};
  margin-bottom: 3px;
`;

export const Label = styled.div`
  color: ${colors.palette.neutral['900']};
  overflow: hidden;
  text-overflow: ellipsis;
`;
