import React from 'react';
import ExpandableText from '@renderer/components/ExpandableText';
import {SFC} from '@shared/types';
import * as S from './Styles';

interface ComponentProps {
  accountNumber: string;
  expanded: boolean;
}

const AccountLink: SFC<ComponentProps> = ({accountNumber, className, expanded}) => {
  return (
    <S.NavLink className={className} to={`/account/${accountNumber}/overview`}>
      <ExpandableText expanded={expanded} text={accountNumber} />
    </S.NavLink>
  );
};

export {S as AccountLinkStyles};
export default AccountLink;
