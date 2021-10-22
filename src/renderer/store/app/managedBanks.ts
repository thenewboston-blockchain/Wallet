import {createSlice} from '@reduxjs/toolkit';

import {MANAGED_BANKS} from '@renderer/constants/actions';
import {
  changeActiveNodeReducer,
  clearLocalAndStateReducer,
  setLocalAndAddressReducer,
  setStateReducer,
  unsetLocalAndAddressReducer,
} from '@renderer/utils/store';
import {Dict, ManagedNode} from '@shared/types';

const managedBanks = createSlice({
  initialState: {} as Dict<ManagedNode>,
  name: MANAGED_BANKS,
  reducers: {
    changeActiveBank: changeActiveNodeReducer<Omit<ManagedNode, 'is_default'>>(MANAGED_BANKS),
    clearManagedBanks: clearLocalAndStateReducer(),
    setManagedBank: setLocalAndAddressReducer<Omit<ManagedNode, 'is_default'>>(MANAGED_BANKS),
    setManagedBanks: setStateReducer<Dict<ManagedNode>>(),
    unsetManagedBank: unsetLocalAndAddressReducer(MANAGED_BANKS),
  },
});

export const {clearManagedBanks, setManagedBank, setManagedBanks, changeActiveBank, unsetManagedBank} =
  managedBanks.actions;

export default managedBanks.reducer;
