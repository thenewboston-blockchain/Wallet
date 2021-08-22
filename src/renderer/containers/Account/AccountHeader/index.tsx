import React, {FC, ReactNode, useCallback, useMemo} from 'react';

import DropdownMenuButton from '@renderer/components/DropdownMenuButton';
import SendCoinsModal from '@renderer/containers/Account/SendCoinsModal';
import {useBooleanState} from '@renderer/hooks';
import {AccountType} from '@renderer/types';

import {AccountHeaderAccountNumber, AccountHeaderNickname, AccountHeaderSigningKey} from './AccountHeaderSection';
import * as S from './Styles';

interface AccountHeaderProps {
  accountNumber: string;
  className?: string;
  nickname: string | null;
  signingKey: string | null;
  type: AccountType | null;
}

const AccountHeader: FC<AccountHeaderProps> = ({accountNumber, className, nickname, signingKey, type}) => {
  const [sendCoinsModalIsOpen, toggleSendCoinsModal] = useBooleanState(false);

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
      return <AccountHeaderSigningKey accountNumber={accountNumber} signingKey={signingKey} />;
    }

    return null;
  }, [accountNumber, signingKey, type]);

  return (
    <S.MainContainer className={className}>
      <S.LeftContainer>
        {renderAccountNickname()}
        <AccountHeaderAccountNumber accountNumber={accountNumber} type={type} />
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
