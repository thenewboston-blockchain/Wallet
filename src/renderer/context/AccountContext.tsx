import {createContext, FC, Reducer, useEffect, useMemo, useReducer} from 'react';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {getManagedAccounts, getManagedFriends} from 'renderer/selectors';
import {AccountNumberParams, AccountType, ManagedAccount, ManagedFriend} from 'shared/types';

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
    default:
      return state;
  }
};

export interface AccountState extends ReducerState {
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
        payload: {type: AccountType.managedAccount},
        type: AccountActionType.set,
      });
      return;
    }

    if (managedFriend) {
      dispatch({
        payload: {type: AccountType.managedFriend},
        type: AccountActionType.set,
      });
      return;
    }

    dispatch({
      payload: {type: AccountType.other},
      type: AccountActionType.set,
    });
  }, [managedAccount, managedFriend]);

  const valueToBePassed = useMemo<AccountState>(
    () => ({
      accountNumber,
      managedAccount,
      managedFriend,
      ...state,
    }),
    [accountNumber, managedAccount, managedFriend, state],
  );

  return <AccountContext.Provider value={valueToBePassed}>{children}</AccountContext.Provider>;
};

export {AccountContext, AccountProvider};
