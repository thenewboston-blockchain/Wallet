import {createSlice} from '@reduxjs/toolkit';
import {ACCOUNT_BALANCES} from 'renderer/constants/actions';
import {setBalanceReducer, unsetBalanceReducer} from 'renderer/utils/store';
import {AccountBalance, Dict} from 'shared/types';

const accountBalances = createSlice({
  initialState: {} as Dict<AccountBalance>,
  name: ACCOUNT_BALANCES,
  reducers: {
    setAccountBalance: setBalanceReducer(),
    unsetAccountBalance: unsetBalanceReducer(),
  },
});

export const {setAccountBalance, unsetAccountBalance} = accountBalances.actions;

export default accountBalances.reducer;
