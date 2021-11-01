import {createSlice} from '@reduxjs/toolkit';

import {MANAGED_VALIDATORS} from 'renderer/constants/actions';
import {
  changeActiveNodeReducer,
  clearLocalAndStateReducer,
  setLocalAndAddressReducer,
  setStateReducer,
  unsetLocalAndAddressReducer,
} from 'renderer/utils/store';
import {Dict, ManagedNode} from 'shared/types';

const managedValidators = createSlice({
  initialState: {} as Dict<ManagedNode>,
  name: MANAGED_VALIDATORS,
  reducers: {
    changeActivePrimaryValidator: changeActiveNodeReducer<Omit<ManagedNode, 'is_default'>>(MANAGED_VALIDATORS),
    clearManagedValidators: clearLocalAndStateReducer(),
    setManagedValidator: setLocalAndAddressReducer<Omit<ManagedNode, 'is_default'>>(MANAGED_VALIDATORS),
    setManagedValidators: setStateReducer<Dict<ManagedNode>>(),
    unsetManagedValidator: unsetLocalAndAddressReducer(MANAGED_VALIDATORS),
  },
});

export const {
  changeActivePrimaryValidator,
  clearManagedValidators,
  setManagedValidator,
  setManagedValidators,
  unsetManagedValidator,
} = managedValidators.actions;

export default managedValidators.reducer;
