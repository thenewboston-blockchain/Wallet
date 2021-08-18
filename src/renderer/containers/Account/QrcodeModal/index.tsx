import React, {FC, useRef} from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

import {ContentCopyIcon} from '@renderer/components/Icon';
import Modal from '@renderer/components/Modal';
import Qr from '@renderer/components/Qr';
import {displayToast} from '@renderer/utils/toast';
import * as S from './QrcodeModalStyles';

interface QrcodeModalProps {
  accountLabel: string;
  accountNumber: string;
  close(): void;
}

const formatAccountNumber = (accountNumber: string): string => {
  const length = accountNumber.length;

  return `${accountNumber.slice(0, length / 2)}
  ${accountNumber.slice(length / 2)}`;
};

const QrcodeModal: FC<QrcodeModalProps> = ({accountLabel, accountNumber, close}) => {
  const copyIconRef = useRef<HTMLDivElement>(null);

  const handleCopy = (): void => {
    displayToast('Account Number copied to the clipboard', 'success');
    copyIconRef.current?.blur();
  };

  return (
    <Modal close={close} header={accountLabel} hideFooter>
      <S.ModalContentContainer>
        <Qr text={accountNumber} width={178} />
        <S.AccountNumber>{formatAccountNumber(accountNumber)}</S.AccountNumber>
        <CopyToClipboard text={accountNumber} onCopy={handleCopy}>
          <ContentCopyIcon ref={copyIconRef} />
        </CopyToClipboard>
      </S.ModalContentContainer>
    </Modal>
  );
};

export default QrcodeModal;
