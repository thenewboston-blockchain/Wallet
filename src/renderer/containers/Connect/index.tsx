import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';

import {connectAndStoreLocalData} from '@renderer/dispatchers/app';
import {getActiveBankConfig} from '@renderer/selectors';
import {AppDispatch, SelectOption, ProtocolType, SFC} from '@renderer/types';
import {formatPathFromNode} from '@renderer/utils/address';
import {getIpAddressField, getNicknameField, getPortField, getProtocolField} from '@renderer/utils/forms/fields';
import yup from '@renderer/utils/forms/yup';
import {displayErrorToast, displayToast, ToastType} from '@renderer/utils/toast';

import * as S from './Styles';

const initialValues = {
  ipAddress: '54.219.234.129',
  nickname: '',
  port: '80',
  protocol: 'http' as ProtocolType,
};

type FormValues = typeof initialValues;

const protocolOptions: SelectOption[] = [{value: 'http'}, {value: 'https'}];

const validationSchema = yup.object().shape({
  ipAddress: getIpAddressField(),
  nickname: getNicknameField(),
  port: getPortField(),
  protocol: getProtocolField(),
});

const Connect: SFC = ({className}) => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const activeBankConfig = useSelector(getActiveBankConfig);
  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();

  useEffect(() => {
    if (activeBankConfig) history.push(`/bank/${formatPathFromNode(activeBankConfig)}/overview`);
  }, [activeBankConfig, history]);

  const handleSubmit = async ({ipAddress, nickname, port, protocol}: FormValues): Promise<void> => {
    try {
      setSubmitting(true);
      const bankAddressData = {
        ip_address: ipAddress,
        port: parseInt(port, 10),
        protocol,
      };
      const response = await dispatch(connectAndStoreLocalData(bankAddressData, nickname));
      if (response?.error) {
        displayErrorToast(response.error);
      }
    } catch (error) {
      displayToast('An error occurred', ToastType.error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <S.Container className={className}>
      <S.Header>
        <S.Logo size={30} />
        <h2>thenewboston</h2>
      </S.Header>
      <S.Subheader>Enter the address of a bank.</S.Subheader>
      <S.Form initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
        <S.Select focused label="Protocol" name="protocol" options={protocolOptions} required />
        <S.TextField label="IP Address" name="ipAddress" required />
        <S.TextField label="Port" name="port" type="number" required />
        <S.TextField label="Nickname" name="nickname" />
        <S.FormButton ignoreDirty submitting={submitting}>
          Connect
        </S.FormButton>
      </S.Form>
    </S.Container>
  );
};

export default Connect;
