import {useContext} from 'react';
import {AccountContext} from '@renderer/context';
import {useSelector} from 'react-redux';
import {getAccountBalances} from '@renderer/selectors';

const useAccountBalance = (): number | null => {
  const {accountNumber} = useContext(AccountContext);
  const accountBalances = useSelector(getAccountBalances);

  const accountBalanceObject = accountBalances[accountNumber];
  return accountBalanceObject ? accountBalanceObject.balance : null;
};

export default useAccountBalance;
