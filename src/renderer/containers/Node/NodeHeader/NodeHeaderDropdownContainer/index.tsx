import React, {useMemo} from 'react';

import {SFC} from '@renderer/types';
import {useToggle} from '@renderer/hooks';
import DropdownMenuButton, {DropdownMenuDirection, DropdownMenuOption} from '@renderer/components/DropdownMenuButton';

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
      {editModalIsOpen ? 'edit' : null}
      {removeModalIsOpen ? 'remove' : null}
    </>
  );
};

export default NodeHeaderDropdownContainer;
