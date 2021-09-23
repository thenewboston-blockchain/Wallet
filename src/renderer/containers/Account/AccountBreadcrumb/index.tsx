import React from 'react';

import {useAccountContext} from '@renderer/hooks';
import {AccountSection, SFC} from '@renderer/types';
import Link from '@renderer/components/Link';

interface AccountBreadcrumbProps {
  currentSection: string;
}

const AccountBreadcrumb: SFC<AccountBreadcrumbProps> = ({className, currentSection}) => {
  const {accountNumber} = useAccountContext();

  const label = ` > ${currentSection} Details`;

  return (
    <span className={className}>
      <Link textStyled to={`/account/${accountNumber}/${AccountSection.overview}`}>
        Dashboard
      </Link>
      {label}
    </span>
  );
};

export default AccountBreadcrumb;
