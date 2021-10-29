import {useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';

import Modal from 'renderer/components/Modal';
import {fetchValidatorConfig} from 'renderer/dispatchers/validators';
import {getManagedValidators} from 'renderer/selectors';
import {setManagedValidator} from 'renderer/store/app';
import {formatAddressFromNode, formatPathFromNode} from 'renderer/utils/address';
import {
  getAddressFormField,
  getIpAddressField,
  getNicknameField,
  getPortField,
  getProtocolField,
} from 'renderer/utils/forms/fields';
import yup from 'renderer/utils/forms/yup';
import {displayErrorToast, displayToast, ToastType} from 'renderer/utils/toast';
import {AppDispatch, ProtocolType, SFC} from 'shared/types';

import AddNodeModalFields from './AddNodeModalFields';

const initialValues = {
  form: '',
  ipAddress: '',
  nickname: '',
  port: '80',
  protocol: 'http' as ProtocolType,
};

type FormValues = typeof initialValues;

interface ComponentProps {
  close(): void;
}

const AddNodeModal: SFC<ComponentProps> = ({className, close}) => {
  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();
  const managedNodes = useSelector(getManagedValidators);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleSubmit = async ({ipAddress, nickname, port, protocol}: FormValues): Promise<void> => {
    try {
      setSubmitting(true);

      const nodeAddressData = {
        ip_address: ipAddress,
        port: parseInt(port, 10),
        protocol,
      };

      const address = formatAddressFromNode(nodeAddressData);
      const nodeConfig = await dispatch(fetchValidatorConfig(address));

      if (nodeConfig.error) {
        if (nodeConfig.error.includes('timeout') || nodeConfig.error.includes('Network Error')) {
          displayErrorToast('Could Not Connect to Node');
        } else {
          displayErrorToast('Invalid Node Address');
        }
        setSubmitting(false);
        return;
      }

      const formattedData = {
        ...nodeAddressData,
        account_signing_key: '',
        nickname,
        nid_signing_key: '',
      };

      dispatch(setManagedValidator(formattedData));
      history.push(`/node/${formatPathFromNode(formattedData)}/overview`);
      close();
    } catch (error) {
      displayToast('An error occurred', ToastType.error);
    } finally {
      setSubmitting(false);
    }
  };

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      form: getAddressFormField(managedNodes, 'This address is already a managed validator'),
      ipAddress: getIpAddressField(),
      nickname: getNicknameField(managedNodes),
      port: getPortField(),
      protocol: getProtocolField(),
    });
  }, [managedNodes]);

  return (
    <Modal
      className={className}
      close={close}
      header="Add Node"
      initialValues={initialValues}
      onSubmit={handleSubmit}
      submitButton="Add"
      submitting={submitting}
      validationSchema={validationSchema}
    >
      <AddNodeModalFields />
    </Modal>
  );
};

export default AddNodeModal;
