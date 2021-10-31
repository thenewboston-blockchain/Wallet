import React, {useRef} from 'react';
import {SFC} from 'shared/types';
import * as S from './Styles';

export interface ArrowToggleProps {
  expanded: boolean;
  onClick(e?: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
}

const ArrowToggle: SFC<ArrowToggleProps> = ({className, expanded, onClick}) => {
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
