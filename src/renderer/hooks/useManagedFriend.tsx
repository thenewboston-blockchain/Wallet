import {useSelector} from 'react-redux';
import {getManagedFriends} from '@renderer/selectors';
import {AccountType, ManagedFriend} from '@renderer/types';
import useAccountContext from './useAccountContext';

const useManagedFriend = (): ManagedFriend | null => {
  const {accountNumber, type} = useAccountContext();

  const managedFriends = useSelector(getManagedFriends);
  const managedFriend = managedFriends[accountNumber] || null;

  if (type !== AccountType.managedFriend) return null;

  return managedFriend;
};

export default useManagedFriend;
