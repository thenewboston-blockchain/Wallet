import {combineReducers} from '@reduxjs/toolkit';

import managedAccountsReducer, {
  clearManagedAccounts,
  setManagedAccount,
  setManagedAccounts,
  unsetManagedAccount,
} from './managedAccounts';
import managedBanksReducer, {
  changeActiveBank,
  clearManagedBanks,
  setManagedBank,
  setManagedBanks,
  unsetManagedBank,
} from './managedBanks';
import managedFriendsReducer, {
  clearManagedFriends,
  setManagedFriend,
  setManagedFriends,
  unsetManagedFriend,
} from './managedFriends';
import managedValidatorsReducer, {
  changeActivePrimaryValidator,
  clearManagedValidators,
  setManagedValidator,
  setManagedValidators,
  unsetManagedValidator,
} from './managedValidators';

export {
  changeActiveBank,
  changeActivePrimaryValidator,
  clearManagedAccounts,
  clearManagedBanks,
  clearManagedFriends,
  clearManagedValidators,
  setManagedAccount,
  setManagedAccounts,
  setManagedBank,
  setManagedBanks,
  setManagedFriend,
  setManagedFriends,
  setManagedValidator,
  setManagedValidators,
  unsetManagedAccount,
  unsetManagedBank,
  unsetManagedFriend,
  unsetManagedValidator,
};

const appReducers = combineReducers({
  managedAccounts: managedAccountsReducer,
  managedBanks: managedBanksReducer,
  managedFriends: managedFriendsReducer,
  managedValidators: managedValidatorsReducer,
});

export default appReducers;
