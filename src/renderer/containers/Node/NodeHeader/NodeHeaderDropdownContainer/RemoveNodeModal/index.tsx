import React from 'react';
import {useDispatch} from 'react-redux';
import Modal from '@renderer/components/Modal';
import {useNodeContext} from '@renderer/hooks';
import {unsetManagedValidator} from '@renderer/store/app';
import {AppDispatch, SFC} from '@renderer/types';

interface ComponentProps {
  close(): void;
}

const RemoveValidatorModal: SFC<ComponentProps> = ({className, close}) => {
  const {managedNode} = useNodeContext();
  const dispatch = useDispatch<AppDispatch>();

  if (!managedNode) {
    close();
    return null;
  }

  const handleSubmit = async (): Promise<void> => {
    dispatch(unsetManagedValidator(managedNode));
    close();
  };

  return (
    <Modal className={className} close={close} header="Remove Node" onSubmit={handleSubmit} submitButton="Remove">
      Are you sure you want to remove this node?
    </Modal>
  );
};

export default RemoveValidatorModal;
