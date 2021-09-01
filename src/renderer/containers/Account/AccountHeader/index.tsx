import React, {ReactNode, useCallback, useContext, useMemo} from 'react';

import DropdownMenuButton from '@renderer/components/DropdownMenuButton';
import SendCoinsModal from '@renderer/containers/Account/SendCoinsModal';
import {AccountContext} from '@renderer/context';
import {useBooleanState} from '@renderer/hooks';
import {AccountType, SFC} from '@renderer/types';

import {AccountHeaderAccountNumber, AccountHeaderNickname, AccountHeaderSigningKey} from './AccountHeaderSection';
import * as S from './Styles';

const AccountHeader: SFC = ({className}) => {
  const {accountNumber, managedAccount, managedFriend, type} = useContext(AccountContext);
  const [sendCoinsModalIsOpen, toggleSendCoinsModal] = useBooleanState(false);

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

    return <AccountHeaderNickname nickname={nickname} />;
  }, [nickname, type]);

  const renderSigningKey = useCallback((): ReactNode => {
    if (type === AccountType.managedAccount && signingKey) {
      return <AccountHeaderSigningKey signingKey={signingKey} />;
    }

    return null;
  }, [signingKey, type]);

  return (
    <S.MainContainer className={className}>
      <S.LeftContainer>
        {renderAccountNickname()}
        <AccountHeaderAccountNumber />
        {renderSigningKey()}
      </S.LeftContainer>
      <S.RightContainer>
        <S.SendCoinsButton onClick={toggleSendCoinsModal}>Send Coins</S.SendCoinsButton>
        <DropdownMenuButton options={[]} />
      </S.RightContainer>
      {sendCoinsModalIsOpen && (
        <SendCoinsModal
          close={toggleSendCoinsModal}
          initialRecipient={sendCoinsInitialRecipient}
          initialSender={sendCoinsInitialSender}
        />
      )}
    </S.MainContainer>
  );
};

export default AccountHeader;
