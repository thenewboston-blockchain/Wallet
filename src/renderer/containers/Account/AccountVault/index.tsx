import React, {ReactNode, useContext, useEffect, useMemo} from 'react';
import {Route, Switch, useHistory, useParams} from 'react-router-dom';

import {AccountContext} from '@renderer/context';
import {AccountVaultParams, AccountVaultSection, SFC} from '@renderer/types';

import AccountVaultBoostHistory from './AccountVaultBoostHistory';
import AccountVaultCoins from './AccountVaultCoins';
import AccountVaultHeader from './AccountVaultHeader';
import AccountVaultHistory from './AccountVaultHistory';
import AccountVaultPoints from './AccountVaultPoints';
import * as S from './Styles';

const tabs: Array<{label: string; section: AccountVaultSection}> = [
  {
    label: 'Vault Coins',
    section: AccountVaultSection.coins,
  },
  {
    label: 'Vault History',
    section: AccountVaultSection.history,
  },
  {
    label: 'Boost History',
    section: AccountVaultSection.boostHistory,
  },
  {
    label: 'Points',
    section: AccountVaultSection.points,
  },
];

const AccountVault: SFC = ({className}) => {
  const {vault} = useParams<AccountVaultParams>();
  const {accountNumber} = useContext(AccountContext);
  const history = useHistory();

  const basePath = useMemo<string>(() => `/account/${accountNumber}/vault`, [accountNumber]);

  useEffect(() => {
    if (!vault) {
      history.replace(`${basePath}/${AccountVaultSection.coins}`);
    }
  }, [accountNumber, history, vault]);

  const handleTabChange = (toSection: AccountVaultSection): void => {
    history.push(`${basePath}/${toSection}`);
  };

  const renderTabs = (): ReactNode => {
    return (
      <S.Tabs onChange={handleTabChange} value={vault}>
        {tabs.map(({label, section}) => (
          <S.Tab key={section} value={section}>
            {label.toUpperCase()}
          </S.Tab>
        ))}
      </S.Tabs>
    );
  };

  return (
    <S.Container className={className}>
      <AccountVaultHeader />
      {renderTabs()}
      <Switch>
        <Route path={`${basePath}/${AccountVaultSection.coins}`} exact>
          <AccountVaultCoins />
        </Route>
        <Route path={`${basePath}/${AccountVaultSection.history}`} exact>
          <AccountVaultHistory />
        </Route>
        <Route path={`${basePath}/${AccountVaultSection.boostHistory}`} exact>
          <AccountVaultBoostHistory />
        </Route>
        <Route path={`${basePath}/${AccountVaultSection.points}`} exact>
          <AccountVaultPoints />
        </Route>
      </Switch>
    </S.Container>
  );
};

export default AccountVault;
