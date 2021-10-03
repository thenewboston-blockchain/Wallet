import React, {useRef} from 'react';
import {SFC} from '@renderer/types';
import * as S from './Styles';

interface ComponentProps {
  expanded: boolean;
  onClick(e?: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
}

const ArrowToggle: SFC<ComponentProps> = ({className, expanded, onClick}) => {
  const iconRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    onClick(e);
    iconRef.current?.blur();
  };

  return (
    <S.ArrowToggle
      $expanded={expanded}
      className={className}
      onClick={handleClick}
      ref={iconRef}
      size={16}
      totalSize={16}
    />
  );
};

export {S as ArrowToggleStyles};
export default ArrowToggle;
