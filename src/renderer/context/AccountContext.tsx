import React, {createContext, FC, Reducer, useEffect, useReducer} from 'react';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {getManagedAccounts, getManagedFriends} from '@renderer/selectors';
import {AccountNumberParams, AccountType, ManagedAccount, ManagedFriend} from '@renderer/types';

enum AccountActionType {
  set = 'set',
}

interface SetAccountAction {
  type: AccountActionType.set;
  payload: ReducerState;
}

type AccountAction = SetAccountAction;

type ReducerState = {
  type: AccountType;
};

const defaultReducerValue: ReducerState = {
  type: AccountType.other,
};

const accountReducer: Reducer<ReducerState, AccountAction> = (state, action) => {
  switch (action.type) {
    case AccountActionType.set:
      return action.payload;
  }
};

interface AccountState extends ReducerState {
  accountNumber: string;
  managedAccount: ManagedAccount | null;
  managedFriend: ManagedFriend | null;
}

const defaultContextValue: AccountState = {
  ...defaultReducerValue,
  accountNumber: '',
  managedAccount: null,
  managedFriend: null,
};

const AccountContext = createContext<AccountState>(defaultContextValue);

const AccountProvider: FC = ({children}) => {
  const [state, dispatch] = useReducer(accountReducer, defaultReducerValue);
  const {accountNumber} = useParams<AccountNumberParams>();
  const managedAccounts = useSelector(getManagedAccounts);
  const managedFriends = useSelector(getManagedFriends);
  const managedAccount = managedAccounts[accountNumber] || null;
  const managedFriend = managedFriends[accountNumber] || null;

  useEffect(() => {
    if (managedAccount) {
      dispatch({
        type: AccountActionType.set,
        payload: {type: AccountType.managedAccount},
      });
      return;
    }

    if (managedFriend) {
      dispatch({
        type: AccountActionType.set,
        payload: {type: AccountType.managedFriend},
      });
      return;
    }

    dispatch({
      type: AccountActionType.set,
      payload: {type: AccountType.other},
    });
    return;
  }, [managedAccount, managedFriend]);

  return (
    <AccountContext.Provider
      value={{
        accountNumber,
        managedAccount,
        managedFriend,
        ...state,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export {AccountContext, AccountProvider};
