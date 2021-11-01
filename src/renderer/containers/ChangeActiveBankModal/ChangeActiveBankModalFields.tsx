import {useFormContext} from 'renderer/hooks';
import {Select, TextField} from 'renderer/components/FormElements';
import {SelectOption, SFC} from 'shared/types';
import * as S from './Styles';

const protocolOptions: SelectOption[] = [{value: 'http'}, {value: 'https'}];

const ChangeActiveBankModalFields: SFC = ({className}) => {
  const {errors} = useFormContext();
  const addressError = errors.form;

  return (
    <S.Container className={className}>
      {addressError ? <S.ErrorMessage>{addressError}</S.ErrorMessage> : null}
      <Select focused label="Protocol" name="protocol" options={protocolOptions} required />
      <TextField label="IP Address" name="ipAddress" required />
      <TextField label="Port" name="port" type="number" required />
      <TextField label="Nickname" name="nickname" />
    </S.Container>
  );
};

export default ChangeActiveBankModalFields;
