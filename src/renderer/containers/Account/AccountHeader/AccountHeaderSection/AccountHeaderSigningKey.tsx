import React, {ReactNode, useCallback, useContext, useEffect, useRef} from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import {useLocation} from 'react-router-dom';

import {AccountContext} from '@renderer/context';
import {useToggle, useWriteIpc} from '@renderer/hooks';
import {SFC} from '@renderer/types';
import {truncateLongText} from '@renderer/utils/accounts';
import {displayToast, ToastType} from '@renderer/utils/toast';
import {IpcChannel} from '@shared/ipc';
import * as S from './Styles';

interface AccountHeaderSigningKeyProps {
  signingKey: string;
}

const downloadSuccessToast = () => {
  displayToast('Signing Key has been saved locally', ToastType.success);
};

const downloadFailToast = (e: any, error: string) => {
  displayToast(`Could not save signing key: ${error}`, ToastType.error);
};

const AccountHeaderSigningKey: SFC<AccountHeaderSigningKeyProps> = ({className, signingKey}) => {
  const [signingKeyIsVisible, toggleSigningKeyIsVisible] = useToggle(false);
  const {accountNumber} = useContext(AccountContext);
  const location = useLocation();
  const signingKeyCopyRef = useRef<HTMLDivElement>(null);
  const signingKeyDownloadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    toggleSigningKeyIsVisible(false);
  }, [toggleSigningKeyIsVisible, location.pathname]);

  const handleDownloadBlur = useCallback(() => {
    signingKeyDownloadRef.current?.blur();
  }, [signingKeyDownloadRef]);

  const handleDownloadClick = useWriteIpc({
    channel: IpcChannel.downloadSigningKey,
    downloadOptions: {buttonLabel: 'Save', defaultPath: `${accountNumber}.txt`, title: 'Save Signing Key'},
    extension: 'txt',
    failCallback: downloadFailToast,
    payload: signingKey || '',
    postSendCallback: handleDownloadBlur,
    successCallback: downloadSuccessToast,
  });

  const handleSigningKeyCopy = (): void => {
    displayToast('Signing Key copied to the clipboard. Do not share!', ToastType.warning);
    signingKeyCopyRef.current?.blur();
  };

  const renderSigningKey = (): ReactNode => {
    if (!signingKey) return null;
    return truncateLongText(signingKeyIsVisible ? signingKey : '*'.repeat(64));
  };

  return (
    <S.AccountHeaderSection className={className}>
      <S.Title>My Signing Key</S.Title>
      <S.Body>
        <S.MainText isSigningKey>{renderSigningKey()}</S.MainText>
        {signingKeyIsVisible ? (
          <S.EyeOffIcon onClick={toggleSigningKeyIsVisible} size={16} totalSize={20} />
        ) : (
          <S.EyeIcon onClick={toggleSigningKeyIsVisible} size={16} totalSize={20} />
        )}
        <S.DownloadIcon onClick={handleDownloadClick} size={16} totalSize={20} ref={signingKeyDownloadRef} />
        <CopyToClipboard text={signingKey} onCopy={handleSigningKeyCopy}>
          <S.ContentCopyIcon size={16} totalSize={20} ref={signingKeyCopyRef} />
        </CopyToClipboard>
      </S.Body>
    </S.AccountHeaderSection>
  );
};

export default AccountHeaderSigningKey;
