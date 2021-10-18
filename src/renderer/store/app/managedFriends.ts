import {createSlice} from '@reduxjs/toolkit';

import {MANAGED_FRIENDS} from '@renderer/constants/actions';
import localStore from '@renderer/store/local';
import {
  clearLocalAndStateReducer,
  getStateName,
  setLocalAndAccountReducer,
  unsetLocalAndAccountReducer,
} from '@renderer/utils/store';
import {Dict, ManagedFriend} from '@shared/types';

const managedFriends = createSlice({
  initialState: (localStore.get(getStateName(MANAGED_FRIENDS)) || {}) as Dict<ManagedFriend>,
  name: MANAGED_FRIENDS,
  reducers: {
    clearManagedFriends: clearLocalAndStateReducer(),
    setManagedFriend: setLocalAndAccountReducer<ManagedFriend>(MANAGED_FRIENDS),
    unsetManagedFriend: unsetLocalAndAccountReducer(MANAGED_FRIENDS),
  },
});

export const {clearManagedFriends, setManagedFriend, unsetManagedFriend} = managedFriends.actions;

export default managedFriends.reducer;
