/* eslint-disable react/jsx-props-no-spreading */

import React, {CSSProperties, KeyboardEvent, ReactNode, useCallback, useEffect, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import noop from 'lodash/noop';

import {useToggle, useEventListener} from '@renderer/hooks';
import {GenericVoidFunction, SFC} from '@renderer/types';

import * as S from './Styles';

export enum DropdownMenuDirection {
  left,
  right,
}

export interface DropdownMenuOption {
  disabled?: boolean;
  label: ReactNode;
  onClick: GenericVoidFunction;
}

export enum DropdownMenuIcon {
  dotsVertical = 'dotsVertical',
  devTo = 'devTo',
}

interface ComponentProps {
  className?: string;
  direction?: DropdownMenuDirection;
  icon?: DropdownMenuIcon;
  options: DropdownMenuOption[];
}

const dropdownRoot = document.getElementById('dropdown-root')!;

const DropdownMenuButton: SFC<ComponentProps> = ({
  className,
  direction = DropdownMenuDirection.right,
  icon = DropdownMenuIcon.dotsVertical,
  options,
}) => {
  const iconRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement[]>([]);
  const [isOpen, , setIsOpen] = useToggle(false);
  const [dropdownPositionStyle, setDropdownPositionStyle] = useState<CSSProperties | undefined>(undefined);

  useEffect(() => {
    if (isOpen) {
      optionsRef.current[0]?.focus();
    }
  }, [isOpen, optionsRef]);

  const handleClick = (e: any): void => {
    if (!dropdownRoot.contains(e.target) && !iconRef.current?.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEventListener('mousedown', handleClick, document);

  const handleOpenDropdown = useCallback((): void => {
    if (iconRef.current) {
      const {bottom, left, width} = iconRef.current.getBoundingClientRect();

      if (direction === DropdownMenuDirection.left) {
        setDropdownPositionStyle({right: window.innerWidth - left - width / 2, top: bottom + 3});
      } else if (direction === DropdownMenuDirection.right) {
        setDropdownPositionStyle({left: left + width / 2, top: bottom + 3});
      }

      setIsOpen(true);
    }
  }, [direction, setIsOpen]);

  const handleOptionClick = (optionOnClick: GenericVoidFunction) => async (): Promise<void> => {
    await optionOnClick();
    setIsOpen(false);
  };

  const handleOptionKeyDown = (optionOnClick: GenericVoidFunction, index: number, disabled: boolean) => async (
    e: KeyboardEvent<HTMLDivElement>,
  ): Promise<void> => {
    if (e.key === 'ArrowDown' && index !== options.length - 1) {
      optionsRef.current[index + 1]?.focus();
      return;
    }

    if (e.key === 'ArrowUp' && index !== 0) {
      optionsRef.current[index - 1]?.focus();
      return;
    }

    if (e.key === 'Enter' && !disabled) {
      setIsOpen(false);
      await optionOnClick();
    }
  };

  const renderButtonIcon = useCallback((): ReactNode => {
    const iconProps = {
      $isActive: isOpen,
      className,
      onClick: handleOpenDropdown,
      ref: iconRef,
    };
    switch (icon) {
      case DropdownMenuIcon.devTo:
        return <S.DevToIcon {...iconProps} />;
      default:
        return <S.DotsVerticalIcon {...iconProps} />;
    }
  }, [className, icon, handleOpenDropdown, isOpen]);

  return (
    <>
      {renderButtonIcon()}
      {isOpen &&
        createPortal(
          <S.MenuContainer style={dropdownPositionStyle}>
            {options.map(({disabled = false, label, onClick: optionOnClick}, index) => {
              return (
                <S.Option
                  $isDisabled={disabled}
                  key={JSON.stringify(label)}
                  onKeyDown={handleOptionKeyDown(optionOnClick, index, disabled)}
                  onClick={disabled ? noop : handleOptionClick(optionOnClick)}
                  ref={(el) => {
                    if (el) {
                      optionsRef.current[index] = el;
                    }
                  }}
                  role="button"
                  tabIndex={0}
                >
                  {label}
                </S.Option>
              );
            })}
          </S.MenuContainer>,
          dropdownRoot,
        )}
    </>
  );
};

export default DropdownMenuButton;
