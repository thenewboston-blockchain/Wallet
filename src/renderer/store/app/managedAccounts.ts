import {createSlice} from '@reduxjs/toolkit';

import {MANAGED_ACCOUNTS} from 'renderer/constants/actions';
import {
  clearLocalAndStateReducer,
  setLocalAndAccountReducer,
  setStateReducer,
  unsetLocalAndAccountReducer,
} from 'renderer/utils/store';
import {Dict, ManagedAccount} from 'shared/types';

const managedAccounts = createSlice({
  initialState: {} as Dict<ManagedAccount>,
  name: MANAGED_ACCOUNTS,
  reducers: {
    clearManagedAccounts: clearLocalAndStateReducer(),
    setManagedAccount: setLocalAndAccountReducer<ManagedAccount>(MANAGED_ACCOUNTS),
    setManagedAccounts: setStateReducer<Dict<ManagedAccount>>(),
    unsetManagedAccount: unsetLocalAndAccountReducer(MANAGED_ACCOUNTS),
  },
});

export const {clearManagedAccounts, setManagedAccount, setManagedAccounts, unsetManagedAccount} =
  managedAccounts.actions;

export default managedAccounts.reducer;
