import {fetchAndDispatchPrimaryValidator} from 'renderer/dispatchers/app';
import {setPrimaryValidatorUpdatedNotification} from 'renderer/store/notifications';
import {formatAddressFromNode} from 'renderer/utils/address';
import {generateUuid} from 'renderer/utils/local';
import {displayToast, ToastType} from 'renderer/utils/toast';
import {AppDispatch} from 'shared/types';

const handlePrimaryValidatorUpdatedNotifications = async (dispatch: AppDispatch, notification: any): Promise<void> => {
  const primaryValidatorAddress = formatAddressFromNode(notification.payload);

  try {
    const {validatorConfig} = await dispatch(fetchAndDispatchPrimaryValidator(primaryValidatorAddress));
    if (validatorConfig) {
      dispatch(
        setPrimaryValidatorUpdatedNotification({
          data: primaryValidatorAddress,
          id: generateUuid(),
          timestamp: new Date().getTime(),
          type: notification.notification_type,
        }),
      );

      displayToast(`The networks Primary Validator has been changed to ${primaryValidatorAddress}`, ToastType.error);
    }
  } catch (err) {
    displayToast('An error occurred', ToastType.error);
  }
};

export default handlePrimaryValidatorUpdatedNotifications;
