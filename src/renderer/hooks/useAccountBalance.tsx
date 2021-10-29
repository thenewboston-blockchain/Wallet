import {useSelector} from 'react-redux';
import {getAccountBalances} from 'renderer/selectors';
import useAccountContext from './useAccountContext';

const useAccountBalance = (): number | null => {
  const {accountNumber} = useAccountContext();
  const accountBalances = useSelector(getAccountBalances);

  const accountBalanceObject = accountBalances[accountNumber];
  return accountBalanceObject ? accountBalanceObject.balance : null;
};

export default useAccountBalance;
