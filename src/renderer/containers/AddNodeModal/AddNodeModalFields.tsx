import React, {FC} from 'react';
import {useFormContext} from '@renderer/hooks';
import {InputOption} from '@renderer/types';
import * as S from './Styles';

const protocolOptions: InputOption[] = [{value: 'http'}, {value: 'https'}];

const AddNodeModalFields: FC = () => {
  const {errors} = useFormContext();
  const addressError = errors.form;

  return (
    <>
      {addressError ? <S.FormError>{addressError}</S.FormError> : null}
      <S.FormSelect focused label="Protocol" name="protocol" options={protocolOptions} required searchable={false} />
      <S.TextField label="IP Address" name="ipAddress" required />
      <S.TextField label="Port" name="port" type="number" required />
      <S.TextField label="Nickname" name="nickname" />
    </>
  );
};

export default AddNodeModalFields;
