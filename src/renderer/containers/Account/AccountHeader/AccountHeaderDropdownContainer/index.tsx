import React, {useContext, useMemo} from 'react';
import {AccountContext} from '@renderer/context';
import DropdownMenuButton, {DropdownMenuDirection, DropdownMenuOption} from '@renderer/components/DropdownMenuButton';
import {useToggle} from '@renderer/hooks';
import {AccountType, SFC} from '@renderer/types';

import EditAccountNicknameModal from './EditAccountNicknameModal';

const AccountHeaderDropdownContainer: SFC = ({className}) => {
  const [deleteAccountModalIsOpen, toggleDeleteAccountModal] = useToggle(false);
  const [deleteFriendModalIsOpen, toggleDeleteFriendModal] = useToggle(false);
  const [editModalIsOpen, toggleEditModal] = useToggle(false);
  const {type} = useContext(AccountContext);

  const options = useMemo<DropdownMenuOption[]>(() => {
    const editMenuOption: DropdownMenuOption = {
      label: 'Edit Nickname',
      onClick: toggleEditModal,
    };

    if (type === AccountType.managedAccount) {
      return [
        editMenuOption,
        {
          label: 'Delete Account',
          onClick: toggleDeleteAccountModal,
        },
      ];
    }

    if (type === AccountType.managedFriend) {
      return [
        editMenuOption,
        {
          label: 'Remove Friend',
          onClick: toggleDeleteFriendModal,
        },
      ];
    }

    return [];
  }, [toggleDeleteAccountModal, toggleDeleteFriendModal, toggleEditModal, type]);

  return (
    <>
      {options.length ? (
        <DropdownMenuButton className={className} direction={DropdownMenuDirection.left} options={options} />
      ) : null}
      {deleteAccountModalIsOpen ? 'delete' : null}
      {deleteFriendModalIsOpen ? 'delete' : null}
      {editModalIsOpen ? <EditAccountNicknameModal close={toggleEditModal} /> : null}
    </>
  );
};

export default AccountHeaderDropdownContainer;
