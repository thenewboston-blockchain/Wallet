import React, { FC, ReactNode, useCallback, useMemo, useRef } from "react";

import DropdownMenuButton from "@renderer/components/DropdownMenuButton";
import QrcodeModal from "@renderer/containers/Account/QrcodeModal";
import SendCoinsModal from "@renderer/containers/Account/SendCoinsModal";
import { useBooleanState, useWriteIpc } from "@renderer/hooks";
import { AccountType } from "@renderer/types";
import { truncateLongText } from "@renderer/utils/accounts";
import { displayToast, ToastType } from "@renderer/utils/toast";
import { IpcChannel } from "@shared/ipc";

import * as S from "./Styles";

interface AccountHeaderProps {
  accountNumber: string;
  className?: string;
  nickname: string | null;
  signingKey: string;
  type: AccountType | null;
}

const downloadSuccessToast = () => {
  displayToast('Signing Key has been saved locally', ToastType.success);
};

const downloadFailToast = (e: any, error: string) => {
  displayToast(`Could not save signing key: ${error}`, ToastType.error);
};

const AccountHeader: FC<AccountHeaderProps> = ({accountNumber, className, nickname, signingKey, type}) => {
  const accountNumberCopyRef = useRef<HTMLDivElement>(null);
  const signingKeyCopyRef = useRef<HTMLDivElement>(null);
  const signingKeyDownloadRef = useRef<HTMLDivElement>(null);
  const [qrcodeModalIsOpen, toggleQrcodeModal] = useBooleanState(false);
  const [sendCoinsModalIsOpen, toggleSendCoinsModal] = useBooleanState(false);
  const [signingKeyIsVisible, toggleSigningKeyIsVisible] = useBooleanState(false);

  const accountLabel = useMemo<string>(() => {
    if (type === AccountType.managedAccount) {
      return 'My Account Number';
    }
    if (type === AccountType.managedFriend) {
      return "Friend's Account Number";
    }
    return 'Account Number';
  }, [type]);

  const handleAccountNumberCopy = (): void => {
    displayToast('Account Number copied to the clipboard', ToastType.success);
    accountNumberCopyRef.current?.blur();
  };

  const handleSigningKeyCopy = (): void => {
    displayToast('Signing Key copied to the clipboard. Do not share!', ToastType.warning);
    signingKeyCopyRef.current?.blur();
  };

  const handleDownloadBlur = useCallback(() => {
    signingKeyDownloadRef.current?.blur();
  }, [signingKeyDownloadRef]);

  const handleDownloadClick = useWriteIpc({
    channel: IpcChannel.downloadSigningKey,
    downloadOptions: {buttonLabel: 'Save', defaultPath: `${accountNumber}.txt`, title: 'Save Signing Key'},
    extension: 'txt',
    failCallback: downloadFailToast,
    payload: signingKey,
    postSendCallback: handleDownloadBlur,
    successCallback: downloadSuccessToast,
  });

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

  const renderSigningKey = (): ReactNode => {
    return truncateLongText(signingKeyIsVisible ? signingKey : '*'.repeat(64));
  };

  const renderAccountNumberItem = (): ReactNode => {
    return (
      <S.LeftItem>
        <S.LeftTitle>{accountLabel}</S.LeftTitle>
        <S.LeftBody>
          <S.LeftMainText>{truncateLongText(accountNumber)}</S.LeftMainText>
          <S.QrcodeIcon onClick={toggleQrcodeModal} size={16} totalSize={20} />
          <S.ContentCopyIcon onClick={handleAccountNumberCopy} size={16} totalSize={20} ref={accountNumberCopyRef} />
        </S.LeftBody>
      </S.LeftItem>
    );
  };

  const renderSigningKeyItem = (): ReactNode => {
    return (
      <S.LeftItem>
        <S.LeftTitle>My Signing Key</S.LeftTitle>
        <S.LeftBody>
          <S.LeftMainText isSigningKey>{renderSigningKey()}</S.LeftMainText>
          {signingKeyIsVisible ? (
            <S.EyeOffIcon onClick={toggleSigningKeyIsVisible} size={16} totalSize={20} />
          ) : (
            <S.EyeIcon onClick={toggleSigningKeyIsVisible} size={16} totalSize={20} />
          )}
          <S.DownloadIcon onClick={handleDownloadClick} size={16} totalSize={20} ref={signingKeyDownloadRef} />
          <S.ContentCopyIcon onClick={handleSigningKeyCopy} size={16} totalSize={20} ref={signingKeyCopyRef} />
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
