import React, {ReactNode, RefObject, useRef} from 'react';
import noop from 'lodash/noop';

import {useEventListener} from '@renderer/hooks';
import {SFC} from '@shared/types';

import * as S from './Styles';

interface ComponentProps {
  handleMenuClose(): void;
  iconRef: RefObject<HTMLDivElement>;
  menuOpen: boolean;
  notifications: ReactNode[];
  unreadNotificationsLength: number;
  updateLastReadTime(): void;
}

const NotificationsMenu: SFC<ComponentProps> = ({
  className,
  handleMenuClose,
  iconRef,
  menuOpen,
  notifications,
  unreadNotificationsLength,
  updateLastReadTime,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: any): void => {
    if (menuOpen && !iconRef.current?.contains(e.target) && !menuRef.current?.contains(e.target)) {
      handleMenuClose();
    }
  };

  useEventListener('mousedown', handleClick, document);

  const renderHeader = (): ReactNode => {
    return (
      <S.Header>
        <S.HeaderLeft>
          <h2>Notifications</h2>
          <S.CountSpan>{unreadNotificationsLength} unread</S.CountSpan>
        </S.HeaderLeft>
        <S.MarkAsReadLink
          $isDisabled={!unreadNotificationsLength}
          onClick={unreadNotificationsLength ? updateLastReadTime : noop}
        >
          Mark all as read
        </S.MarkAsReadLink>
      </S.Header>
    );
  };

  const renderEmptyState = (): ReactNode => {
    return (
      <S.EmptyContainer>
        <h1>No notifications</h1>
      </S.EmptyContainer>
    );
  };

  return (
    <S.Container className={className} ref={menuRef}>
      {renderHeader()}
      {notifications.length ? notifications : renderEmptyState()}
    </S.Container>
  );
};

export default NotificationsMenu;
