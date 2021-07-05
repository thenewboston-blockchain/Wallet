import React, {FC, useMemo, useState} from 'react';

import {Button, ButtonType, TextField} from '@renderer/components/FormElements';
import Modal from '@renderer/components/Modal';
import {ModalProps} from '@renderer/types/modals';
import yup from '@renderer/utils/forms/yup';
import './CreateWalletModal.scss';

const initialValues = {
  nickname: '',
};

type FormValues = typeof initialValues;

type ComponentProps = ModalProps;

const CreateWalletModal: FC<ComponentProps> = ({close}) => {
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleSubmit = async ({nickname}: FormValues): Promise<void> => {
    console.log('hello', nickname);
  };

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        nickname: yup
          .string()
          .matches(/[\S]/, 'Must contain non-whitespace characters.')
          .max(64, 'Nickname must not be more than 64 characters'), // TODO:  add not one of
      }),
    [],
  );

  return (
    <Modal
      className="CreateWalletModal"
      close={close}
      header="Create a wallet"
      hideFooter // TODO: Remove This once you update Modal
      initialValues={initialValues}
      onSubmit={handleSubmit}
      submitting={submitting}
      validationSchema={validationSchema}
    >
      <TextField focused label="What is it for?" name="nickname" />
      <Button className="CreateWalletModal__submit-button" ignoreDirty type={ButtonType.submit}>
        Create
      </Button>
      {/* TODO: Make 'add' a link */}
      <div className="CreateWalletModal__footer-text">Have an existing wallet? Add</div>
    </Modal>
  );
};

export default CreateWalletModal;
