import React, {FC, ReactNode} from 'react';
import {NavLink, useLocation} from 'react-router-dom';
import clsx from 'clsx';

import './LeftSubmenuItem.scss';

export interface LeftSubmenuItemProps {
  baseUrl: string;
  className?: string;
  key: string;
  label: ReactNode;
  subLabel?: string;
  to: string;
}

const LeftSubmenuItem: FC<LeftSubmenuItemProps> = ({baseUrl, className, key, label, subLabel, to}) => {
  const location = useLocation();

  const getIsActive = (): boolean => location.pathname.includes(baseUrl);

  return (
    <NavLink
      activeClassName="LeftSubmenuItem--active"
      className={clsx('LeftSubmenuItem', className, {'LeftSubmenuItem--with-sub-label': !!subLabel})}
      isActive={getIsActive}
      key={key}
      to={to}
    >
      {subLabel ? <div className="LeftSubmenuItem__sub-label">{subLabel}</div> : null}
      <div className="LeftSubmenuItem__label">{label}</div>
    </NavLink>
  );
};

export default LeftSubmenuItem;
