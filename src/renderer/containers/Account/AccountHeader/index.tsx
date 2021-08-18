import React, {FC, ReactNode, useMemo} from 'react';
import noop from 'lodash/noop';

import DropdownMenuButton from '@renderer/components/DropdownMenuButton';
import QrcodeModal from '@renderer/containers/Account/QrcodeModal';
import SendCoinsModal from '@renderer/containers/Account/SendCoinsModal';
import {useBooleanState} from '@renderer/hooks';
import {AccountType} from '@renderer/types';
import {truncateLongText} from '@renderer/utils/accounts';

import * as S from './AccountHeaderStyles';

interface AccountHeaderProps {
  accountNumber: string;
  className?: string;
  nickname: string | null;
  type: AccountType | null;
}

const AccountHeader: FC<AccountHeaderProps> = ({accountNumber, className, nickname, type}) => {
  const [sendCoinsModalIsOpen, toggleSendCoinsModal] = useBooleanState(false);
  const [qrcodeModalIsOpen, toggleQrcodeModal] = useBooleanState(false);

  const accountLabel = useMemo<string>(() => {
    if (type === AccountType.managedAccount) {
      return 'My Account Number';
    }
    if (type === AccountType.managedFriend) {
      return "Friend's Account Number";
    }
    return 'Account Number';
  }, [type]);

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

  const renderNicknameItem = (): ReactNode => {
    return (
      <S.LeftItem>
        <S.LeftTitle>Nickname</S.LeftTitle>
        <S.LeftBody>
          <S.LeftMainText>{nickname || '-'}</S.LeftMainText>
        </S.LeftBody>
      </S.LeftItem>
    );
  };

  const renderAccountNumberItem = (): ReactNode => {
    return (
      <S.LeftItem>
        <S.LeftTitle>{accountLabel}</S.LeftTitle>
        <S.LeftBody>
          <S.LeftMainText>{truncateLongText(accountNumber)}</S.LeftMainText>
          <S.QrcodeIcon onClick={toggleQrcodeModal} size={16} totalSize={20} />
          <S.ContentCopyIcon onClick={noop} size={16} totalSize={20} />
        </S.LeftBody>
      </S.LeftItem>
    );
  };

  const renderSigningKeyItem = (): ReactNode => {
    return (
      <S.LeftItem>
        <S.LeftTitle>My Signing Key</S.LeftTitle>
        <S.LeftBody>
          <S.LeftMainText>{truncateLongText('*'.repeat(64))}</S.LeftMainText>
          <S.EyeIcon onClick={noop} size={16} totalSize={20} />
          <S.DownloadIcon onClick={noop} size={16} totalSize={20} />
          <S.ContentCopyIcon onClick={noop} size={16} totalSize={20} />
        </S.LeftBody>
      </S.LeftItem>
    );
  };

  return (
    <S.MainContainer className={className}>
      <S.LeftContainer>
        {!!type ? renderNicknameItem() : null}
        {renderAccountNumberItem()}
        {type === AccountType.managedAccount ? renderSigningKeyItem() : null}
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
      {qrcodeModalIsOpen && (
        <QrcodeModal accountLabel={accountLabel} accountNumber={accountNumber} close={toggleQrcodeModal} />
      )}
    </S.MainContainer>
  );
};

export default AccountHeader;
