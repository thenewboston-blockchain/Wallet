import React from 'react';
import {useFormContext} from '@renderer/hooks';
import {FormInput, FormSelect} from '@renderer/components/FormComponents';
import {InputOption, SFC} from '@renderer/types';
import * as S from './Styles';

const protocolOptions: InputOption[] = [{value: 'http'}, {value: 'https'}];

const ChangeActiveBankModalFields: SFC = ({className}) => {
  const {errors} = useFormContext();
  const addressError = errors.form;

  return (
    <S.Container className={className}>
      {addressError ? <S.ErrorMessage>{addressError}</S.ErrorMessage> : null}
      <FormSelect focused label="Protocol" name="protocol" options={protocolOptions} required searchable={false} />
      <FormInput label="IP Address" name="ipAddress" required />
      <FormInput label="Port" name="port" type="number" required />
      <FormInput label="Nickname" name="nickname" />
    </S.Container>
  );
};

export default ChangeActiveBankModalFields;
