import {createSlice} from '@reduxjs/toolkit';

import {MANAGED_BANKS} from '@renderer/constants/actions';
import localStore from '@renderer/store/local';
import {
  changeActiveNodeReducer,
  clearLocalAndStateReducer,
  getStateName,
  setLocalAndAddressReducer,
  unsetLocalAndAddressReducer,
} from '@renderer/utils/store';
import {Dict, ManagedNode} from '@shared/types';

const managedBanks = createSlice({
  initialState: (localStore.get(getStateName(MANAGED_BANKS)) || {}) as Dict<ManagedNode>,
  name: MANAGED_BANKS,
  reducers: {
    changeActiveBank: changeActiveNodeReducer<Omit<ManagedNode, 'is_default'>>(MANAGED_BANKS),
    clearManagedBanks: clearLocalAndStateReducer(),
    setManagedBank: setLocalAndAddressReducer<Omit<ManagedNode, 'is_default'>>(MANAGED_BANKS),
    unsetManagedBank: unsetLocalAndAddressReducer(MANAGED_BANKS),
  },
});

export const {clearManagedBanks, setManagedBank, changeActiveBank, unsetManagedBank} = managedBanks.actions;

export default managedBanks.reducer;
