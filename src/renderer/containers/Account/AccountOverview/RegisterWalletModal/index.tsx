import React, {useState} from 'react';

import {TextField} from '@renderer/components/FormElements';
import Modal from '@renderer/components/Modal';
import {SFC} from '@renderer/types';
import {getUsernameField} from '@renderer/utils/forms/fields';
import yup from '@renderer/utils/forms/yup';
import {displayToast, ToastType} from '@renderer/utils/toast';

import * as S from './Styles';

const initialValues = {
  username: '',
};

type FormValues = typeof initialValues;

const validationSchema = yup.object().shape({
  username: getUsernameField(),
});

interface RegisterWalletModalProps {
  close(): void;
}

const RegisterWalletModal: SFC<RegisterWalletModalProps> = ({className, close}) => {
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleSubmit = async ({username}: FormValues): Promise<void> => {
    try {
      setSubmitting(true);
      displayToast(username, ToastType.success);
    } catch (error) {
      displayToast('An error occurred', ToastType.error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      className={className}
      close={close}
      header="Register Wallet"
      hideFooter
      initialValues={initialValues}
      onSubmit={handleSubmit}
      submitting={submitting}
      validationSchema={validationSchema}
    >
      <S.Container>
        <TextField label="Enter username" name="username" />
      </S.Container>
    </Modal>
  );
};

export default RegisterWalletModal;
