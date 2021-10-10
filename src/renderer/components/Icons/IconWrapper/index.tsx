import React, {forwardRef, useMemo} from 'react';

import {IconProps} from '../types';
import * as S from './Styles';

const IconWrapper = forwardRef<HTMLDivElement, IconProps>(
  (
    {children, className, dataTestId, disabled = false, onClick, onKeyDown, size, totalSize, unfocusable = false},
    ref,
  ) => {
    const handleClick = (e?: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
      if (disabled || !onClick) return;

      onClick(e);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
      if (!onClick) return;

      if (e.key === 'Enter' && !disabled) {
        handleClick();
      }

      onKeyDown?.(e);
    };

    const tabIndex = useMemo(
      () => (unfocusable || disabled || !onClick ? undefined : 0),
      [disabled, onClick, unfocusable],
    );

    return (
      <S.Wrapper
        className={className}
        data-testid={dataTestId || 'Icon'}
        disabled={disabled}
        ref={ref}
        role={onClick ? 'button' : 'img'}
        onClick={handleClick}
        hasOnClickHandler={!!onClick}
        onKeyDown={handleKeyDown}
        size={size}
        tabIndex={tabIndex}
        totalSize={totalSize}
        unfocusable={unfocusable}
      >
        {children}
      </S.Wrapper>
    );
  },
);

export default IconWrapper;
