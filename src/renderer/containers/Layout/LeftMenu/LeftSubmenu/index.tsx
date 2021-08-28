import React, {ReactNode} from 'react';

import ArrowToggle from '@renderer/components/ArrowToggle';
import {PlusIcon} from '@renderer/components/Icons';
import {useBooleanState} from '@renderer/hooks';
import {SFC} from '@renderer/types';

import * as S from './Styles';

interface ComponentProps {
  menuItems: ReactNode[];
  rightOnClick?(): void;
  title: string;
}

const LeftSubmenu: SFC<ComponentProps> = ({className, menuItems, rightOnClick, title}) => {
  const [expanded, toggleExpanded] = useBooleanState(true);

  const renderHeaderContent = (): ReactNode => {
    return (
      <S.HeaderContainer>
        <S.LeftIconContainer>
          <ArrowToggle expanded={expanded} onClick={toggleExpanded} />
        </S.LeftIconContainer>
        <S.Title onClick={toggleExpanded}>{title}</S.Title>
        {rightOnClick ? renderRightSection() : null}
      </S.HeaderContainer>
    );
  };

  const renderRightSection = (): ReactNode => {
    if (!rightOnClick) return null;

    return <PlusIcon onClick={rightOnClick} size={20} totalSize={20} />;
  };

  return (
    <S.Container className={className}>
      {renderHeaderContent()}
      {expanded && menuItems}
    </S.Container>
  );
};

export default LeftSubmenu;
