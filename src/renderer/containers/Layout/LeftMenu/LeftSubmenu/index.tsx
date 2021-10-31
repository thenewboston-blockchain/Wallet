import {ReactNode} from 'react';
import {mdiPlus} from '@mdi/js';

import ArrowToggle from 'renderer/components/ArrowToggle';
import Icon from 'renderer/components/Icon';
import {useToggle} from 'renderer/hooks';
import {SFC} from 'shared/types';

import * as S from './Styles';

export interface LeftSubmenuProps {
  menuItems: ReactNode[];
  rightOnClick?(): void;
  title: string;
}

const LeftSubmenu: SFC<LeftSubmenuProps> = ({className, menuItems, rightOnClick, title}) => {
  const [expanded, toggleExpanded] = useToggle(true);

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

    return <Icon icon={mdiPlus} onClick={rightOnClick} size={20} totalSize={20} />;
  };

  return (
    <S.Container className={className}>
      {renderHeaderContent()}
      {expanded && menuItems}
    </S.Container>
  );
};

export default LeftSubmenu;
