import React, {FC, useEffect} from 'react';
import {useFormContext} from '@renderer/hooks';
import * as S from './Styles';

export const initialValues = {
  nickname: '',
  signingKey: '',
  type: 'create',
};

export type FormValues = typeof initialValues;

interface ComponentProps {
  setIsCreatingNewAccount(val: boolean): void;
}

const CreateAccountModalFields: FC<ComponentProps> = ({setIsCreatingNewAccount}) => {
  const {
    values: {type},
  } = useFormContext<FormValues>();
  const renderSigningKey = type === 'add';

  useEffect(() => {
    if (type === 'add') {
      setIsCreatingNewAccount(false);
    } else {
      setIsCreatingNewAccount(true);
    }
  }, [setIsCreatingNewAccount, type]);

  return (
    <S.Container>
      <S.RadioGroup
        options={[
          {label: 'Create New Account', value: 'create'},
          {label: 'Add Existing Account', value: 'add'},
        ]}
        name="type"
        required
      />
      <S.TextField label="Nickname" name="nickname" />
      {renderSigningKey && <S.TextField label="Signing Key" multiline name="signingKey" required />}
    </S.Container>
  );
};

export default CreateAccountModalFields;
