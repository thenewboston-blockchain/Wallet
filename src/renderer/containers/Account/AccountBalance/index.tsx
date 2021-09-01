import React, {useContext, useEffect, useMemo, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {AccountContext} from '@renderer/context';
import {fetchAccountBalance} from '@renderer/dispatchers/balances';
import {getAccountBalances} from '@renderer/selectors';
import {AppDispatch, SFC} from '@renderer/types';
import {displayErrorToast} from '@renderer/utils/toast';
import * as S from './Styles';

const AccountBalance: SFC = ({className}) => {
  const {accountNumber} = useContext(AccountContext);
  const dispatch = useDispatch<AppDispatch>();
  const refreshIconRef = useRef<HTMLDivElement>(null);
  const accountBalances = useSelector(getAccountBalances);
  const [balancedUpdated, setBalanceUpdated] = useState<boolean>(false);
  const [refreshDisabled, setRefreshDisabled] = useState<boolean>(false);

  const accountBalanceObject = accountBalances[accountNumber];
  const balance = accountBalanceObject ? accountBalanceObject.balance : null;

  const balanceStr = useMemo(() => {
    if (balance === null) return '-';
    return `${balance.toLocaleString()}.0000`;
  }, [balance]);

  useEffect(() => {
    (async () => {
      try {
        await dispatch(fetchAccountBalance(accountNumber));
      } catch (error) {
        displayErrorToast(error);
      }
    })();
  }, [accountNumber, dispatch]);

  const handleRefresh = async (): Promise<void> => {
    refreshIconRef.current?.blur();
    try {
      setRefreshDisabled(true);

      await dispatch(fetchAccountBalance(accountNumber));
      setBalanceUpdated(true);
    } catch (error) {
      displayErrorToast(error);
    } finally {
      // setTimeout to prevent multiple clicks
      setTimeout(() => {
        setBalanceUpdated(false);
        setRefreshDisabled(false);
      }, 1000);
    }
  };
  return (
    <S.Container className={className}>
      <S.Balance className={className} $updated={balancedUpdated}>
        {balanceStr}
      </S.Balance>
      <S.RefreshIcon disabled={refreshDisabled} onClick={handleRefresh} ref={refreshIconRef} />
    </S.Container>
  );
};

export default AccountBalance;
