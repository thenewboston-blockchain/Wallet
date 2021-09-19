import React, {useContext, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {TextField} from '@renderer/components/FormElements';
import Modal from '@renderer/components/Modal';
import {NodeContext} from '@renderer/context';
import {getManagedValidators} from '@renderer/selectors';
import {setManagedValidator} from '@renderer/store/app';
import {AppDispatch, SFC} from '@renderer/types';
import {getNicknameField} from '@renderer/utils/forms/fields';
import yup from '@renderer/utils/forms/yup';

interface ComponentProps {
  close(): void;
}

const EditNodeNicknameModal: SFC<ComponentProps> = ({className, close}) => {
  const {managedNode} = useContext(NodeContext);
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
