import React, {FC, useContext, useMemo, useRef} from 'react';

import {AccountContext} from '@renderer/context';
import {useBooleanState} from '@renderer/hooks';
import {AccountType} from '@renderer/types';
import {truncateLongText} from '@renderer/utils/accounts';
import {displayToast, ToastType} from '@renderer/utils/toast';

import QrcodeModal from '../../QrcodeModal';
import * as S from './Styles';

interface AccountHeaderAccountNumberProps {
  className?: string;
}

const AccountHeaderAccountNumber: FC<AccountHeaderAccountNumberProps> = ({className}) => {
  const {accountNumber, type} = useContext(AccountContext);
  const [qrcodeModalIsOpen, toggleQrcodeModal] = useBooleanState(false);
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
    <S.AccountHeaderSection className={className}>
      <S.Title>{accountLabel}</S.Title>
      <S.Body>
        <S.MainText>{truncateLongText(accountNumber)}</S.MainText>
        <S.QrcodeIcon onClick={toggleQrcodeModal} size={16} totalSize={20} />
        <S.ContentCopyIcon onClick={handleAccountNumberCopy} size={16} totalSize={20} ref={accountNumberCopyRef} />
      </S.Body>
      {qrcodeModalIsOpen && (
        <QrcodeModal accountLabel={accountLabel} accountNumber={accountNumber} close={toggleQrcodeModal} />
      )}
    </S.AccountHeaderSection>
  );
};

export default AccountHeaderAccountNumber;
