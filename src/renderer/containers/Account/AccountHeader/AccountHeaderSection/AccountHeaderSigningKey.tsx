import {ReactNode, useCallback, useEffect, useRef} from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import {useLocation} from 'react-router-dom';

import {PageHeaderSection} from 'renderer/components/PageHeader';
import {useAccountContext, useToggle, useWriteIpc} from 'renderer/hooks';
import {truncateLongText} from 'renderer/utils/accounts';
import {displayToast, ToastType} from 'renderer/utils/toast';
import {DownloadSigningKeyPayload, IpcChannel} from 'shared/ipc';
import {SFC} from 'shared/types';
import * as S from './Styles';

interface AccountHeaderSigningKeyProps {
  signingKey: string;
}

const downloadFailToast = (_: any, error: string) => {
  displayToast(`Could not save signing key: ${error}`, ToastType.error);
};

const AccountHeaderSigningKey: SFC<AccountHeaderSigningKeyProps> = ({className, signingKey}) => {
  const [signingKeyIsVisible, toggleSigningKeyIsVisible] = useToggle(false);
  const {accountNumber} = useAccountContext();
  const location = useLocation();
  const signingKeyCopyRef = useRef<HTMLDivElement>(null);
  const signingKeyDownloadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    toggleSigningKeyIsVisible(false);
  }, [toggleSigningKeyIsVisible, location.pathname]);

  const handleDownloadBlur = useCallback(() => {
    signingKeyDownloadRef.current?.blur();
  }, [signingKeyDownloadRef]);

  const downloadSuccessCallback = () => {
    handleDownloadBlur();
    displayToast('Signing Key has been saved locally', ToastType.success);
  };

  const handleDownloadClick = useWriteIpc<DownloadSigningKeyPayload>({
    channel: IpcChannel.downloadSigningKey,
    failCallback: downloadFailToast,
    payload: {accountNumber, signingKey},
    successCallback: downloadSuccessCallback,
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
    <PageHeaderSection className={className} hasVisibilityToggle mainText={renderSigningKey()} title="My Signing Key">
      {signingKeyIsVisible ? (
        <S.EyeOffIcon onClick={toggleSigningKeyIsVisible} size={16} totalSize={20} />
      ) : (
        <S.EyeIcon onClick={toggleSigningKeyIsVisible} size={16} totalSize={20} />
      )}
      <S.DownloadIcon onClick={handleDownloadClick} size={16} totalSize={20} ref={signingKeyDownloadRef} />
      <CopyToClipboard text={signingKey} onCopy={handleSigningKeyCopy}>
        <S.ContentCopyIcon size={16} totalSize={20} ref={signingKeyCopyRef} />
      </CopyToClipboard>
    </PageHeaderSection>
  );
};

export default AccountHeaderSigningKey;
