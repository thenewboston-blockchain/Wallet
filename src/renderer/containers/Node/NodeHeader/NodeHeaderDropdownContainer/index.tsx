import React, {useMemo} from 'react';

import {SFC} from '@renderer/types';
import {useToggle} from '@renderer/hooks';
import DropdownMenuButton, {DropdownMenuDirection, DropdownMenuOption} from '@renderer/components/DropdownMenuButton';

import EditNodeNicknameModal from './EditNodeNicknameModal';
import RemoveNodeModal from './RemoveNodeModal';

const NodeHeaderDropdownContainer: SFC = ({className}) => {
  const [editModalIsOpen, toggleEditModal] = useToggle(false);
  const [removeModalIsOpen, toggleRemoveModal] = useToggle(false);

  const options = useMemo<DropdownMenuOption[]>(() => {
    return [
      {label: 'Edit Nickname', onClick: toggleEditModal},
      {label: 'Remove Node', onClick: toggleRemoveModal},
    ];
  }, [toggleEditModal, toggleRemoveModal]);

  return (
    <>
      <DropdownMenuButton className={className} direction={DropdownMenuDirection.left} options={options} />
      {editModalIsOpen ? <EditNodeNicknameModal close={toggleEditModal} /> : null}
      {removeModalIsOpen ? <RemoveNodeModal close={toggleRemoveModal} /> : null}
    </>
  );
};

export default NodeHeaderDropdownContainer;
