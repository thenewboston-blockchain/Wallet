import React from 'react';
import {useFormContext} from '@renderer/hooks';
import {TextField} from '@renderer/components/FormElements';
import {FormSelect} from '@renderer/components/FormComponents';
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
      <TextField label="IP Address" name="ipAddress" required />
      <TextField label="Port" name="port" type="number" required />
      <TextField label="Nickname" name="nickname" />
    </S.Container>
  );
};

export default ChangeActiveBankModalFields;
