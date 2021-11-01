import {createSlice} from '@reduxjs/toolkit';

import {MANAGED_FRIENDS} from 'renderer/constants/actions';
import {
  clearLocalAndStateReducer,
  setLocalAndAccountReducer,
  setStateReducer,
  unsetLocalAndAccountReducer,
} from 'renderer/utils/store';
import {Dict, ManagedFriend} from 'shared/types';

const managedFriends = createSlice({
  initialState: {} as Dict<ManagedFriend>,
  name: MANAGED_FRIENDS,
  reducers: {
    clearManagedFriends: clearLocalAndStateReducer(),
    setManagedFriend: setLocalAndAccountReducer<ManagedFriend>(MANAGED_FRIENDS),
    setManagedFriends: setStateReducer<Dict<ManagedFriend>>(),
    unsetManagedFriend: unsetLocalAndAccountReducer(MANAGED_FRIENDS),
  },
});

export const {clearManagedFriends, setManagedFriend, setManagedFriends, unsetManagedFriend} = managedFriends.actions;

export default managedFriends.reducer;
