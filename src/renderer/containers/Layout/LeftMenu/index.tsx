import React, {ReactNode, useMemo} from 'react';
import {useSelector} from 'react-redux';

import CreateAccountModal from '@renderer/containers/Account/CreateAccountModal';
import AddFriendModal from '@renderer/containers/Account/AddFriendModal';
import AddValidatorModal from '@renderer/containers/Validator/AddValidatorModal';
import {useToggle} from '@renderer/hooks';
import {
  getBankConfigs,
  getManagedAccounts,
  getManagedBanks,
  getManagedFriends,
  getManagedValidators,
  getValidatorConfigs,
} from '@renderer/selectors';
import {ManagedAccount, ManagedFriend, ManagedNode, RootState, SFC} from '@renderer/types';
import {truncateLongText} from '@renderer/utils/accounts';
import {formatAddressFromNode, formatPathFromNode} from '@renderer/utils/address';
import {sortByBooleanKey, sortDictValuesByPreferredKey} from '@renderer/utils/sort';

import LeftSubmenu from './LeftSubmenu';
import LeftSubmenuItem from './LeftSubmenuItem';
import * as S from './Styles';

const LeftMenuSelector = (state: RootState) => {
  return {
    bankConfigs: getBankConfigs(state),
    managedAccounts: getManagedAccounts(state),
    managedBanks: getManagedBanks(state),
    managedFriends: getManagedFriends(state),
    managedValidators: getManagedValidators(state),
    validatorConfigs: getValidatorConfigs(state),
  };
};

const LeftMenu: SFC = ({className}) => {
  const {managedAccounts, managedFriends, managedValidators, validatorConfigs} = useSelector(LeftMenuSelector);
  const [addFriendModalIsOpen, toggleAddFriendModal] = useToggle(false);
  const [addValidatorModalIsOpen, toggleAddValidatorModal] = useToggle(false);
  const [createAccountModalIsOpen, toggleCreateAccountModal] = useToggle(false);

  const accountItems = useMemo<ReactNode[]>(() => {
    return sortDictValuesByPreferredKey<ManagedAccount>(managedAccounts, 'nickname', 'account_number')
      .map(({account_number, nickname}) => ({
        baseUrl: `/account/${account_number}`,
        key: account_number,
        label: truncateLongText(account_number),
        subLabel: nickname,
        to: `/account/${account_number}/overview`,
      }))
      .map(({baseUrl, key, label, subLabel, to}) => (
        <LeftSubmenuItem baseUrl={baseUrl} key={key} label={label} subLabel={subLabel} to={to} />
      ));
  }, [managedAccounts]);

  const communityItems = useMemo<ReactNode[]>(() => {
    return [
      <LeftSubmenuItem baseUrl="/governance" label="Governance" key="governance" to="/governance" />,
      <LeftSubmenuItem baseUrl="/treasury" label="Treasury" key="treasury" to="/treasury" />,
    ];
  }, []);

  const friendMenuItems = useMemo<ReactNode[]>(
    () =>
      sortDictValuesByPreferredKey<ManagedFriend>(managedFriends, 'nickname', 'account_number')
        .map(({account_number, nickname}) => ({
          baseUrl: `/account/${account_number}`,
          key: account_number,
          label: truncateLongText(account_number),
          subLabel: nickname,
          to: `/account/${account_number}/overview`,
        }))
        .map(({baseUrl, key, label, subLabel, to}) => (
          <LeftSubmenuItem baseUrl={baseUrl} key={key} label={label} subLabel={subLabel} to={to} />
        )),
    [managedFriends],
  );

  const validatorMenuItems = useMemo<ReactNode[]>(
    () =>
      sortDictValuesByPreferredKey<ManagedNode>(managedValidators, 'nickname', 'ip_address')
        .sort(sortByBooleanKey<ManagedNode>('is_default'))
        .map((managedValidator) => ({
          baseUrl: `/validator/${formatPathFromNode(managedValidator)}`,
          isDefault: managedValidator.is_default || false,
          isOnline: validatorConfigs[formatAddressFromNode(managedValidator)]?.error === null || false,
          key: formatAddressFromNode(managedValidator),
          label: managedValidator.nickname || formatAddressFromNode(managedValidator),
          to: `/validator/${formatPathFromNode(managedValidator)}/overview`,
        }))
        .map(({baseUrl, key, label, to}) => <LeftSubmenuItem baseUrl={baseUrl} key={key} label={label} to={to} />),
    [managedValidators, validatorConfigs],
  );

  return (
    <S.Container className={className}>
      <LeftSubmenu menuItems={accountItems} rightOnClick={toggleCreateAccountModal} title="My Wallets" />
      <LeftSubmenu menuItems={friendMenuItems} rightOnClick={toggleAddFriendModal} title="My Friends" />
      <LeftSubmenu menuItems={communityItems} title="Community" />
      <LeftSubmenu menuItems={validatorMenuItems} rightOnClick={toggleAddValidatorModal} title="Nodes" />
      {addFriendModalIsOpen && <AddFriendModal close={toggleAddFriendModal} />}
      {addValidatorModalIsOpen && <AddValidatorModal close={toggleAddValidatorModal} />}
      {createAccountModalIsOpen && <CreateAccountModal close={toggleCreateAccountModal} />}
    </S.Container>
  );
};

export default LeftMenu;
