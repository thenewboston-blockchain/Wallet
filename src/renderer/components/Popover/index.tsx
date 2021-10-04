import React, {useEffect, useMemo, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import {useLocation} from 'react-router-dom';
import throttle from 'lodash/throttle';

import {useEventListener, useWindowDimensions} from '@renderer/hooks';
import {SFC} from '@renderer/types';
import * as S from './Styles';

export interface DomRect {
  height: number;
  left: number;
  top: number;
  width: number;
}

export enum HorizontalPosition {
  center = 'center',
  left = 'left',
  right = 'right',
}

export enum VerticalPosition {
  bottom = 'bottom',
  center = 'center',
  top = 'top',
}

type GenericPosition<H, V> = {horizontal: H; vertical: V};

type OriginType = GenericPosition<HorizontalPosition | number, VerticalPosition | number>;
type OffsetType = GenericPosition<number, number>;

const initialDomRect: DomRect = {height: 0, left: 0, top: 0, width: 0};

export interface PopoverProps {
  anchorOrigin?: OriginType;
  anchorEl: HTMLElement | null;
  closePopover(e?: any): void;
  id?: string;
  manualClose?: boolean;
  open: boolean;
  transformOrigin?: OriginType;
  transformOffset?: OffsetType;
}

const Popover: SFC<PopoverProps> = ({
  anchorEl,
  anchorOrigin = {horizontal: HorizontalPosition.left, vertical: VerticalPosition.top},
  children,
  className,
  closePopover,
  id = 'popover',
  manualClose = false,
  open,
  transformOrigin = {horizontal: HorizontalPosition.left, vertical: VerticalPosition.top},
  transformOffset = {horizontal: 0, vertical: 0},
}) => {
  const {pathname} = useLocation();
  const portalRef = useRef<HTMLDivElement>(null);
  const [anchorDomRect, setAnchorDomRect] = useState<DomRect>(initialDomRect);
  const [portalDomRect, setPortalDomRect] = useState<DomRect>(initialDomRect);
  const windowDimensions = useWindowDimensions();

  useEventListener(
    'mousedown',
    throttle((e: any): void => {
      if (!open || manualClose) return;

      let targetElement = e.target;

      do {
        if (targetElement.id === id || targetElement === anchorEl) {
          return;
        }
        targetElement = targetElement.parentNode;
      } while (targetElement);

      closePopover();
    }, 150),
    document,
  );

  useEventListener(
    'scroll',
    throttle((e: any): void => {
      if (!open || manualClose) return;

      let targetElement = e.target;

      do {
        if (targetElement.id === id) {
          return;
        }
        targetElement = targetElement.parentNode;
      } while (targetElement);

      closePopover();
    }, 150),
    document,
    true,
  );

  useEffect(() => {
    if (open) {
      closePopover();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (anchorEl) {
      const {height, top, left, width} = anchorEl.getBoundingClientRect();
      setAnchorDomRect({height, left, top, width});
    }
  }, [anchorEl, windowDimensions]);

  useEffect(() => {
    if (portalRef.current) {
      const {height, left, top, width} = portalRef.current.getBoundingClientRect();
      setPortalDomRect({height, left, top, width});
    }
  }, [portalRef, windowDimensions]);

  const portalStyle = useMemo(() => {
    let left: number;
    let top: number;

    if (anchorOrigin.horizontal === 'left') {
      left = anchorDomRect.left;
    } else if (anchorOrigin.horizontal === 'right') {
      left = anchorDomRect.left + anchorDomRect.width;
    } else if (anchorOrigin.horizontal === 'center') {
      left = anchorDomRect.left + anchorDomRect.width / 2;
    } else {
      left = anchorOrigin.horizontal;
    }

    if (transformOrigin.horizontal === 'left') {
      left += transformOffset.horizontal;
    } else if (transformOrigin.horizontal === 'right') {
      left -= portalDomRect.width;
      left += transformOffset.horizontal;
    } else if (transformOrigin.horizontal === 'center') {
      left -= portalDomRect.width / 2;
      left += transformOffset.horizontal;
    } else {
      left -= transformOrigin.horizontal;
    }

    if (anchorOrigin.vertical === 'bottom') {
      top = anchorDomRect.top + anchorDomRect.height;
    } else if (anchorOrigin.vertical === 'top') {
      top = anchorDomRect.top;
    } else if (anchorOrigin.vertical === 'center') {
      top = anchorDomRect.top + anchorDomRect.height / 2;
    } else {
      top = anchorOrigin.vertical;
    }

    if (transformOrigin.vertical === 'bottom') {
      top -= portalDomRect.height;
      top += transformOffset.vertical;
    } else if (transformOrigin.vertical === 'top') {
      top += transformOffset.vertical;
    } else if (transformOrigin.vertical === 'center') {
      top -= portalDomRect.width / 2;
      top += transformOffset.vertical;
    } else {
      top -= transformOrigin.vertical;
    }

    return {left, top};
  }, [
    anchorOrigin.horizontal,
    anchorOrigin.vertical,
    anchorDomRect,
    portalDomRect,
    transformOrigin.horizontal,
    transformOrigin.vertical,
    transformOffset.horizontal,
    transformOffset.vertical,
  ]);

  return (
    <>
      {createPortal(
        <S.Container
          $isOpen={open}
          aria-hidden={!open}
          className={className}
          data-testid="Popover"
          onClick={(e) => e.stopPropagation()}
          id={id}
          ref={portalRef}
          role="dialog"
          style={portalStyle}
          tabIndex={open ? undefined : -1}
        >
          {manualClose ? <S.CloseIcon onClick={closePopover} /> : null}
          {children}
        </S.Container>,
        document.getElementById('popover-root')!,
      )}
    </>
  );
};

export {S as PopoverStyles};
export default Popover;
