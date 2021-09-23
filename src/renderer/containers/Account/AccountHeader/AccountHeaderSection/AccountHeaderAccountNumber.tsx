import React, {useMemo, useRef} from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

import {PageHeaderSection} from '@renderer/components/PageHeader';
import {useAccountContext, useToggle} from '@renderer/hooks';
import {AccountType, SFC} from '@renderer/types';
import {truncateLongText} from '@renderer/utils/accounts';
import {displayToast, ToastType} from '@renderer/utils/toast';

import QrcodeModal from '../../QrcodeModal';
import * as S from './Styles';

const AccountHeaderAccountNumber: SFC = ({className}) => {
  const {accountNumber, type} = useAccountContext();
  const [qrcodeModalIsOpen, toggleQrcodeModal] = useToggle(false);
  const accountNumberCopyRef = useRef<HTMLDivElement>(null);

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

  return (
    <PageHeaderSection className={className} mainText={truncateLongText(accountNumber)} title={accountLabel}>
      <S.QrcodeIcon onClick={toggleQrcodeModal} size={16} totalSize={20} />
      <CopyToClipboard text={accountNumber} onCopy={handleAccountNumberCopy}>
        <S.ContentCopyIcon size={16} totalSize={20} ref={accountNumberCopyRef} />
      </CopyToClipboard>
      {qrcodeModalIsOpen && (
        <QrcodeModal accountLabel={accountLabel} accountNumber={accountNumber} close={toggleQrcodeModal} />
      )}
    </PageHeaderSection>
  );
};

export default AccountHeaderAccountNumber;
