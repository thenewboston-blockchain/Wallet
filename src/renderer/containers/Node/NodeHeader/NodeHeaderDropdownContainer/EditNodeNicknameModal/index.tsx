import React, {useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNodeContext} from '@renderer/hooks';
import {TextField} from '@renderer/components/FormElements';
import Modal from '@renderer/components/Modal';
import {getManagedValidators} from '@renderer/selectors';
import {setManagedValidator} from '@renderer/store/app';
import {getNicknameField} from '@renderer/utils/forms/fields';
import yup from '@renderer/utils/forms/yup';
import {AppDispatch, SFC} from '@shared/types';

interface ComponentProps {
  close(): void;
}

const EditNodeNicknameModal: SFC<ComponentProps> = ({className, close}) => {
  const {managedNode} = useNodeContext();
  const dispatch = useDispatch<AppDispatch>();
  const managedNodes = useSelector(getManagedValidators);

  const initialValues = useMemo(() => {
    return {
      nickname: managedNode?.nickname || '',
    };
  }, [managedNode]);

  type FormValues = typeof initialValues;

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      nickname: getNicknameField(managedNodes, managedNode?.nickname || ''),
    });
  }, [managedNode?.nickname, managedNodes]);

  if (!managedNode) {
    close();
    return null;
  }

  const handleSubmit = ({nickname}: FormValues): void => {
    dispatch(
      setManagedValidator({
        ...managedNode,
        nickname,
      }),
    );
    close();
  };

  return (
    <Modal
      className={className}
      close={close}
      header="Edit Node Nickname"
      ignoreDirty
      initialValues={initialValues}
      onSubmit={handleSubmit}
      submitButton="Save"
      validationSchema={validationSchema}
    >
      <TextField focused label="Nickname" name="nickname" />
    </Modal>
  );
};

export default EditNodeNicknameModal;
