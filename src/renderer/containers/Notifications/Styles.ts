import styled from 'styled-components';
import {NavLink as UNavLink} from 'react-router-dom';
import {BellIcon as UBellIcon} from '@renderer/components/Icons';
import UStatusBadge, {StatusBadgeType} from '@renderer/components/StatusBadge';
import {b3, colors} from '@renderer/styles';

export const Container = styled.div`
  position: relative;
`;

export const BellIcon = styled(UBellIcon)<{$isActive: boolean}>`
  background: ${({$isActive}) => $isActive && colors.palette.gray['100']};
`;

export const MainStatusBadge = styled(UStatusBadge).attrs(() => ({
  status: StatusBadgeType.alert,
}))`
  position: absolute;
  right: 5px;
  top: 7px;
`;

export const NavLink = styled(UNavLink)`
  color: ${colors.primary};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const Notification = styled.div`
  border-bottom: 1px solid ${colors.palette.gray['100']};
  display: flex;
  justify-content: space-between;
  padding: 12px 0 12px 33px;
  position: relative;
`;

export const NotificationStatusBadge = styled(UStatusBadge).attrs(() => ({
  status: StatusBadgeType.alert,
}))`
  left: 12px;
  position: absolute;
  top: 17px;
`;

export const DescriptionContainer = styled.div`
  padding-right: 12px;
`;

export const Amount = styled.div`
  color: ${colors.palette.green['500']};
  padding-right: 12px;
`;

export const TimeAgo = styled.div<{$isRead: boolean}>`
  ${b3.regular};
  color: ${({$isRead}) => ($isRead ? colors.primary : colors.palette.red['500'])};
  margin-top: 6px;
`;
