import React from 'react';
import {useDispatch} from 'react-redux';
import Modal from '@renderer/components/Modal';
import {useManagedFriend} from '@renderer/hooks';
import {unsetManagedFriend} from '@renderer/store/app';
import {AppDispatch, SFC} from '@renderer/types';

interface ComponentProps {
  close(): void;
}

const DeleteFriendModal: SFC<ComponentProps> = ({className, close}) => {
  const dispatch = useDispatch<AppDispatch>();
  const managedFriend = useManagedFriend();

  if (!managedFriend) {
    close();
    return null;
  }

  const handleSubmit = async (): Promise<void> => {
    dispatch(unsetManagedFriend(managedFriend));
    close();
  };

  return (
    <Modal className={className} close={close} header="Remove Friend" onSubmit={handleSubmit} submitButton="Remove">
      Are you sure you want to remove your friend?
    </Modal>
  );
};

export default DeleteFriendModal;
