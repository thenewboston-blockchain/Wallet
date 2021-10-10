import React, {FC} from 'react';
import {useFormContext} from '@renderer/hooks';
import {SelectOption} from '@renderer/types';
import * as S from './Styles';

const protocolOptions: SelectOption[] = [{value: 'http'}, {value: 'https'}];

const AddNodeModalFields: FC = () => {
  const {errors} = useFormContext();
  const addressError = errors.form;

  return (
    <>
      {addressError ? <S.FormError>{addressError}</S.FormError> : null}
      <S.Select focused label="Protocol" name="protocol" options={protocolOptions} required />
      <S.TextField label="IP Address" name="ipAddress" required />
      <S.TextField label="Port" name="port" type="number" required />
      <S.TextField label="Nickname" name="nickname" />
    </>
  );
};

export default AddNodeModalFields;
