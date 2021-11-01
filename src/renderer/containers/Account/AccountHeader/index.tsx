import {ReactNode, useCallback, useMemo} from 'react';

import {Button} from 'renderer/components/FormElements';
import PageHeader, {PageHeaderSection} from 'renderer/components/PageHeader';
import {useAccountContext, useToggle} from 'renderer/hooks';
import {AccountType, SFC} from 'shared/types';

import AccountHeaderDropdownContainer from './AccountHeaderDropdownContainer';
import {AccountHeaderAccountNumber, AccountHeaderSigningKey} from './AccountHeaderSection';
import SendCoinsModal from './SendCoinsModal';

const AccountHeader: SFC = ({className}) => {
  const {accountNumber, managedAccount, managedFriend, type} = useAccountContext();
  const [sendCoinsModalIsOpen, toggleSendCoinsModal] = useToggle(false);

  const nickname = useMemo(() => {
    return managedAccount?.nickname || managedFriend?.nickname || null;
  }, [managedAccount, managedFriend]);

  const signingKey = useMemo(() => {
    return managedAccount?.signing_key || null;
  }, [managedAccount]);

  const sendCoinsInitialRecipient = useMemo<string>(() => {
    let output: string;

    if (type === AccountType.managedAccount) {
      output = '';
    } else if (type === AccountType.managedFriend) {
      output = accountNumber;
    } else {
      output = accountNumber;
    }

    return output;
  }, [accountNumber, type]);

  const sendCoinsInitialSender = useMemo<string>(() => {
    let output: string;

    if (type === AccountType.managedAccount) {
      output = accountNumber;
    } else if (type === AccountType.managedFriend) {
      output = '';
    } else {
      output = '';
    }

    return output;
  }, [accountNumber, type]);

  const renderAccountNickname = useCallback((): ReactNode => {
    if (!type) return null;

    return <PageHeaderSection mainText={nickname || '-'} title="Nickname" />;
  }, [nickname, type]);

  const renderSigningKey = useCallback((): ReactNode => {
    if (type === AccountType.managedAccount && signingKey) {
      return <AccountHeaderSigningKey signingKey={signingKey} />;
    }

    return null;
  }, [signingKey, type]);

  return (
    <PageHeader
      className={className}
      dropdown={<AccountHeaderDropdownContainer />}
      rightButtons={<Button onClick={toggleSendCoinsModal}>Send Coins</Button>}
    >
      {renderAccountNickname()}
      <AccountHeaderAccountNumber />
      {renderSigningKey()}
      {sendCoinsModalIsOpen && (
        <SendCoinsModal
          close={toggleSendCoinsModal}
          initialRecipient={sendCoinsInitialRecipient}
          initialSender={sendCoinsInitialSender}
        />
      )}
    </PageHeader>
  );
};

export default AccountHeader;
