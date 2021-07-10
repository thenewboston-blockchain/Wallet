import React, {FC, ReactNode} from 'react';
import {Icon, IconType} from '@thenewboston/ui';

import ArrowToggle from '@renderer/components/ArrowToggle';
import {useBooleanState} from '@renderer/hooks';

import './LeftSubmenu.scss';

interface ComponentProps {
  menuItems: ReactNode[];
  rightOnClick?(): void;
  title: string;
}

const LeftSubmenu: FC<ComponentProps> = ({menuItems, rightOnClick, title}) => {
  const [expanded, toggleExpanded] = useBooleanState(true);

  const renderHeaderContent = (): ReactNode => {
    return (
      <>
        <div className="LeftSubmenu__left-icon">
          <ArrowToggle expanded={expanded} onClick={toggleExpanded} />
        </div>
        <span className="LeftSubmenu__title" onClick={toggleExpanded}>
          {title}
        </span>
        {rightOnClick ? renderRightSection() : null}
      </>
    );
  };

  const renderRightSection = (): ReactNode => {
    if (!rightOnClick) return null;

    return (
      <Icon className="LeftSubmenu__add-icon" icon={IconType.plus} onClick={rightOnClick} size={20} totalSize={20} />
    );
  };

  return (
    <div className="LeftSubmenu">
      <div className="LeftSubmenu__header-container">{renderHeaderContent()}</div>
      {expanded && menuItems}
    </div>
  );
};

export default LeftSubmenu;
