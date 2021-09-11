import {useContext} from 'react';
import {useSelector} from 'react-redux';
import {AccountContext} from '@renderer/context';
import {getManagedAccounts} from '@renderer/selectors';
import {AccountType, ManagedAccount} from '@renderer/types';

const useManagedAccount = (): ManagedAccount | null => {
  const {accountNumber, type} = useContext(AccountContext);

  const managedAccounts = useSelector(getManagedAccounts);
  const managedAccount = managedAccounts[accountNumber] || null;

  if (type !== AccountType.managedAccount) return null;

  return managedAccount;
};

export default useManagedAccount;
