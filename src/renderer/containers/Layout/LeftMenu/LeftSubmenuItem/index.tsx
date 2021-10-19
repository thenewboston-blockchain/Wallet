import React, {ReactNode} from 'react';
import {useLocation} from 'react-router-dom';
import {SFC} from '@shared/types';

import * as S from './Styles';

export interface LeftSubmenuItemProps {
  baseUrl: string;
  index: number;
  label: ReactNode;
  subLabel?: string;
  subLabelFallback?: string;
  to: string;
}

const LeftSubmenuItem: SFC<LeftSubmenuItemProps> = ({
  baseUrl,
  className,
  index,
  label,
  subLabel,
  subLabelFallback,
  to,
}) => {
  const location = useLocation();

  const getIsActive = (): boolean => location.pathname.includes(baseUrl);

  return (
    <S.StyledLink
      activeClassName="active"
      className={className}
      $withSubLabel={!!subLabel}
      isActive={getIsActive}
      to={to}
    >
      {subLabel || subLabelFallback ? (
        <S.SubLabel $none={!subLabel}>{subLabel || `${subLabelFallback} ${index + 1}`}</S.SubLabel>
      ) : null}
      <S.Label>{label}</S.Label>
    </S.StyledLink>
  );
};

export default LeftSubmenuItem;
