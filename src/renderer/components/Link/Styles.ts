import styled from 'styled-components';
import {Link as RRLink, LinkProps as RRLinkProps} from 'react-router-dom';
import {ChevronRightIcon as UChevronRightIcon} from '@renderer/components/Icons';
import colors from '@renderer/styles/colors';

interface LinkProps extends RRLinkProps {
  disabled: boolean;
}

export const Link = styled(RRLink)<LinkProps>`
  align-items: center;
  border-radius: 100px;
  border: 1px solid transparent;
  cursor: ${({disabled}) => (disabled ? null : 'cursor')};
  display: inline-flex;
  justify-content: center;
  margin: 6px;
  min-height: 40px;
  padding: 0 16px;
  text-decoration: none;
  transition: all 0.1s;

  &:focus {
    box-shadow: 0 0 0 8px ${colors.palette.gray['100']};
    outline: none;
  }

  &:hover {
    text-decoration: underline;
  }
`;

export const ChevronRightIcon = styled(UChevronRightIcon)`
  margin-right: -8px;
  position: relative;
  top: 1px;
`;
