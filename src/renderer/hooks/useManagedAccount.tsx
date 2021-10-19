import {useSelector} from 'react-redux';
import {getManagedAccounts} from '@renderer/selectors';
import {AccountType, ManagedAccount} from '@shared/types';
import useAccountContext from './useAccountContext';

const useManagedAccount = (): ManagedAccount | null => {
  const {accountNumber, type} = useAccountContext();

  const managedAccounts = useSelector(getManagedAccounts);
  const managedAccount = managedAccounts[accountNumber] || null;

  if (type !== AccountType.managedAccount) return null;

  return managedAccount;
};

export default useManagedAccount;
