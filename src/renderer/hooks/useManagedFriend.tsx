import {useContext} from 'react';
import {useSelector} from 'react-redux';
import {AccountContext} from '@renderer/context';
import {getManagedFriends} from '@renderer/selectors';
import {AccountType, ManagedFriend} from '@renderer/types';

const useManagedFriend = (): ManagedFriend | null => {
  const {accountNumber, type} = useContext(AccountContext);

  const managedFriends = useSelector(getManagedFriends);
  const managedFriend = managedFriends[accountNumber] || null;

  if (type !== AccountType.managedFriend) return null;

  return managedFriend;
};

export default useManagedFriend;
