import {useRef} from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

import {ContentCopyIcon} from 'renderer/components/Icons';
import Modal from 'renderer/components/Modal';
import Qr from 'renderer/components/Qr';
import {displayToast, ToastType} from 'renderer/utils/toast';
import {SFC} from 'shared/types';
import * as S from './Styles';

const formatAccountNumber = (accountNumber: string): string => {
  const {length} = accountNumber;

  return `${accountNumber.slice(0, length / 2)}
  ${accountNumber.slice(length / 2)}`;
};

interface QrcodeModalProps {
  accountLabel: string;
  accountNumber: string;
  close(): void;
}

const QrcodeModal: SFC<QrcodeModalProps> = ({accountLabel, accountNumber, className, close}) => {
  const copyIconRef = useRef<HTMLDivElement>(null);

  const handleCopy = (): void => {
    displayToast('Account Number copied to the clipboard', ToastType.success);
    copyIconRef.current?.blur();
  };

  return (
    <Modal className={className} close={close} header={accountLabel} hideFooter>
      <S.Container>
        <Qr text={accountNumber} width={178} />
        <S.AccountNumber>{formatAccountNumber(accountNumber)}</S.AccountNumber>
        <CopyToClipboard text={accountNumber} onCopy={handleCopy}>
          <ContentCopyIcon ref={copyIconRef} />
        </CopyToClipboard>
      </S.Container>
    </Modal>
  );
};

export default QrcodeModal;
