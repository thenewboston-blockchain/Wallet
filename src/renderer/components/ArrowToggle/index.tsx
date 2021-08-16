import React, {FC, useRef} from 'react';
import * as S from './ArrowToggleStyles';

interface ComponentProps {
  className?: string;
  expanded: boolean;
  onClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
}

const ArrowToggle: FC<ComponentProps> = ({className, expanded, onClick}) => {
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

export default ArrowToggle;
