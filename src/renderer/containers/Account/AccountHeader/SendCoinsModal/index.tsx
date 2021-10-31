import {useCallback, useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Modal from 'renderer/components/Modal';
import {INVALID_AMOUNT_ERROR, MATCH_ERROR} from 'renderer/constants/form-validation';
import {fetchAccountBalance} from 'renderer/dispatchers/balances';
import {useToggle} from 'renderer/hooks';
import {
  getActiveBankConfig,
  getManagedAccountBalances,
  getManagedAccounts,
  getPrimaryValidatorConfig,
} from 'renderer/selectors';
import {sendBlock} from 'renderer/utils/blocks';
import yup from 'renderer/utils/forms/yup';
import {displayErrorToast, displayToast, ToastType} from 'renderer/utils/toast';
import {getBankTxFee, getPrimaryValidatorTxFee} from 'renderer/utils/transactions';
import {AppDispatch, SFC} from 'shared/types';

import SendCoinsModalFields, {FormValues} from './SendCoinsModalFields';

const COIN_AMOUNT_CEILING = 100_000_000;

export interface SendCoinsModalProps {
  close(): void;
  initialRecipient: string;
  initialSender: string;
}

const SendCoinsModal: SFC<SendCoinsModalProps> = ({className, close, initialRecipient, initialSender}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [loadingBalance, toggleLoadingBalance] = useToggle(false);
  const activeBank = useSelector(getActiveBankConfig)!;
  const primaryValidator = useSelector(getPrimaryValidatorConfig)!;
  const managedAccounts = useSelector(getManagedAccounts);
  const managedAccountBalances = useSelector(getManagedAccountBalances);

  useEffect(() => {
    (async () => {
      try {
        toggleLoadingBalance(true);
        const managedAccountNumbers = Object.keys(managedAccounts);
        await Promise.all(managedAccountNumbers.map((accountNumber) => dispatch(fetchAccountBalance(accountNumber))));
        toggleLoadingBalance(false);
      } catch (error) {
        displayErrorToast('There was an error fetching your account balances');
      }
    })();
  }, [dispatch, managedAccounts, toggleLoadingBalance]);

  const checkCoinsWithBalance = useCallback(
    (coins: number, accountNumber: string): boolean => {
      if (!accountNumber || !coins) return true;
      const {balance} = managedAccountBalances[accountNumber];
      if (!balance) return false;
      const totalCost =
        getBankTxFee(activeBank, accountNumber) + getPrimaryValidatorTxFee(primaryValidator, accountNumber) + coins;
      return totalCost <= balance;
    },
    [activeBank, primaryValidator, managedAccountBalances],
  );

  const initialValues = useMemo(
    () => ({
      coins: '',
      memo: '',
      recipientAccountNumber: initialRecipient,
      senderAccountNumber: initialSender,
    }),
    [initialRecipient, initialSender],
  );

  const handleSubmit = async ({
    coins,
    memo,
    recipientAccountNumber,
    senderAccountNumber,
  }: FormValues): Promise<void> => {
    try {
      setSubmitting(true);
      await sendBlock(
        activeBank,
        primaryValidator,
        managedAccounts[senderAccountNumber].signing_key,
        senderAccountNumber,
        [{accountNumber: recipientAccountNumber, amount: parseInt(coins, 10)}],
        memo,
      );
      await Promise.all([
        dispatch(fetchAccountBalance(senderAccountNumber)),
        dispatch(fetchAccountBalance(recipientAccountNumber)),
      ]);
      displayToast('Your payment has been sent', ToastType.success);
      close();
    } catch (error) {
      displayErrorToast(error);
      setSubmitting(false);
    }
  };

  const validationSchema = useMemo(() => {
    const senderAccountNumberRef = yup.ref('senderAccountNumber');
    return yup.object().shape({
      coins: yup
        .number()
        .callbackWithRef(senderAccountNumberRef, checkCoinsWithBalance, INVALID_AMOUNT_ERROR)
        .moreThan(0, 'Coins must be greater than 0')
        .lessThan(COIN_AMOUNT_CEILING, `Coins must be less than ${COIN_AMOUNT_CEILING.toLocaleString()}`)
        .integer('Coins cannot be a decimal')
        .required('Coins is a required field'),
      memo: yup
        .string()
        .matches(/^[a-zA-Z0-9_ ]*$/, 'Memo can only contain alphanumeric characters, spaces, and underscores')
        .max(64, 'Memo cannot exceed 64 characters'),
      recipientAccountNumber: yup
        .string()
        .notEqualTo(senderAccountNumberRef, MATCH_ERROR)
        .length(64, 'Account Number must be 64 characters long')
        .required('This field is required'),
      senderAccountNumber: yup.string().required('This field is required'),
    });
  }, [checkCoinsWithBalance]);

  return (
    <Modal
      className={className}
      close={close}
      header="Send Coins"
      initialValues={initialValues}
      onSubmit={handleSubmit}
      submitButton="Send"
      submitting={submitting}
      validationSchema={validationSchema}
    >
      {loadingBalance ? <div>loader</div> : <SendCoinsModalFields submitting={submitting} />}
    </Modal>
  );
};

export default SendCoinsModal;
