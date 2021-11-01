import {ReactNode, useMemo} from 'react';
import {useSelector} from 'react-redux';

import CreateAccountModal from 'renderer/containers/CreateAccountModal';
import AddFriendModal from 'renderer/containers/AddFriendModal';
import AddNodeModal from 'renderer/containers/AddNodeModal';
import {useToggle} from 'renderer/hooks';
import {
  getBankConfigs,
  getManagedAccounts,
  getManagedBanks,
  getManagedFriends,
  getManagedValidators,
  getValidatorConfigs,
} from 'renderer/selectors';
import {truncateLongText} from 'renderer/utils/accounts';
import {formatAddressFromNode, formatPathFromNode} from 'renderer/utils/address';
import {sortByBooleanKey, sortDictValuesByPreferredKey} from 'renderer/utils/sort';
import {ManagedAccount, ManagedFriend, ManagedNode, NodeSection, RootState, SFC} from 'shared/types';

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
  const [addNodeModalIsOpen, toggleAddNodeModal] = useToggle(false);
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
      .map(({baseUrl, key, label, subLabel, to}, i) => (
        <LeftSubmenuItem
          baseUrl={baseUrl}
          index={i}
          key={key}
          label={label}
          subLabel={subLabel}
          subLabelFallback="Account"
          to={to}
        />
      ));
  }, [managedAccounts]);

  const communityItems = useMemo<ReactNode[]>(() => {
    return [
      <LeftSubmenuItem baseUrl="/governance" index={0} label="Governance" key="governance" to="/governance" />,
      <LeftSubmenuItem baseUrl="/treasury" index={1} label="Treasury" key="treasury" to="/treasury" />,
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
        .map(({baseUrl, key, label, subLabel, to}, i) => (
          <LeftSubmenuItem
            baseUrl={baseUrl}
            index={i}
            key={key}
            label={label}
            subLabel={subLabel}
            subLabelFallback="Friend"
            to={to}
          />
        )),
    [managedFriends],
  );

  const nodeMenuItems = useMemo<ReactNode[]>(
    () =>
      sortDictValuesByPreferredKey<ManagedNode>(managedValidators, 'nickname', 'ip_address')
        .sort(sortByBooleanKey<ManagedNode>('is_default'))
        .map((managedValidator) => ({
          baseUrl: `/node/${formatPathFromNode(managedValidator)}`,
          isDefault: managedValidator.is_default || false,
          isOnline: validatorConfigs[formatAddressFromNode(managedValidator)]?.error === null || false,
          key: formatAddressFromNode(managedValidator),
          label: formatAddressFromNode(managedValidator),
          subLabel: managedValidator.nickname,
          to: `/node/${formatPathFromNode(managedValidator)}/${NodeSection.overview}`,
        }))
        .map(({baseUrl, key, label, to}, i) => (
          <LeftSubmenuItem baseUrl={baseUrl} index={i} key={key} label={label} subLabelFallback="Node" to={to} />
        )),
    [managedValidators, validatorConfigs],
  );

  return (
    <S.Container className={className}>
      <S.LeftSubmenu menuItems={accountItems} rightOnClick={toggleCreateAccountModal} title="My Accounts" />
      <S.LeftSubmenu menuItems={friendMenuItems} rightOnClick={toggleAddFriendModal} title="My Friends" />
      <S.LeftSubmenu menuItems={communityItems} title="Community" />
      <S.LeftSubmenu menuItems={nodeMenuItems} rightOnClick={toggleAddNodeModal} title="Nodes" />
      <S.Link to="/node-center">Node Center</S.Link>
      {addFriendModalIsOpen && <AddFriendModal close={toggleAddFriendModal} />}
      {addNodeModalIsOpen && <AddNodeModal close={toggleAddNodeModal} />}
      {createAccountModalIsOpen && <CreateAccountModal close={toggleCreateAccountModal} />}
    </S.Container>
  );
};

export default LeftMenu;
