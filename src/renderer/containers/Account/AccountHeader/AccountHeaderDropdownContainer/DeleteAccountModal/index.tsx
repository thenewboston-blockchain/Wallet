import React from 'react';
import {useDispatch} from 'react-redux';

import Modal from '@renderer/components/Modal';
import {useManagedAccount} from '@renderer/hooks';
import {unsetManagedAccount} from '@renderer/store/app';
import {unsetManagedAccountBalance} from '@renderer/store/managedAccountBalances';
import {AppDispatch, SFC} from '@renderer/types';

import * as S from './Styles';

interface ComponentProps {
  close(): void;
}

const DeleteAccountModal: SFC<ComponentProps> = ({className, close}) => {
  const dispatch = useDispatch<AppDispatch>();
  const managedAccount = useManagedAccount();

  if (!managedAccount) {
    close();
    return null;
  }

  const handleSubmit = async (): Promise<void> => {
    dispatch(unsetManagedAccount(managedAccount));
    dispatch(unsetManagedAccountBalance(managedAccount));
    close();
  };

  return (
    <Modal
      className={className}
      close={close}
      header={
        <>
          <S.AlertIcon />
          <S.Header>Delete Account</S.Header>
        </>
      }
      hideFooter
    >
      <>
        <S.Text>
          <S.Warning>Warning: </S.Warning> If you delete your account, you will lose all the coins in your account as
          well as your signing key. Are you sure you want to delete your account?
        </S.Text>
        <S.SubmitButton onClick={handleSubmit}>Delete</S.SubmitButton>
      </>
    </Modal>
  );
};

export default DeleteAccountModal;
