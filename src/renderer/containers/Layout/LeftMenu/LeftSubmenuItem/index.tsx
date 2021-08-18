import React, {FC, ReactNode} from 'react';
import {useLocation} from 'react-router-dom';

import * as S from './Styles';

export interface LeftSubmenuItemProps {
  baseUrl: string;
  label: ReactNode;
  subLabel?: string;
  to: string;
}

const LeftSubmenuItem: FC<LeftSubmenuItemProps> = ({baseUrl, label, subLabel, to}) => {
  const location = useLocation();

  const getIsActive = (): boolean => location.pathname.includes(baseUrl);

  return (
    <S.StyledLink activeClassName="active" $withSubLabel={!!subLabel} isActive={getIsActive} to={to}>
      {subLabel ? <S.SubLabel>{subLabel}</S.SubLabel> : null}
      <S.Label>{label}</S.Label>
    </S.StyledLink>
  );
};

export default LeftSubmenuItem;
