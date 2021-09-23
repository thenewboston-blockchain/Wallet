import React from 'react';

import {ButtonVariant} from '@renderer/components/FormElements';
import PageHeader, {PageHeaderButton, PageHeaderSection} from '@renderer/components/PageHeader';
import {useNodeContext, useToggle} from '@renderer/hooks';
import {SFC} from '@renderer/types';

import NodeHeaderDropdownContainer from './NodeHeaderDropdownContainer';

const NodeHeader: SFC = ({className}) => {
  const [isBoosted, toggleIsBoosted] = useToggle(false);
  const {ipAddress, managedNode} = useNodeContext();

  return (
    <PageHeader
      className={className}
      dropdown={<NodeHeaderDropdownContainer />}
      rightButton={
        <PageHeaderButton
          onClick={toggleIsBoosted}
          variant={isBoosted ? ButtonVariant.outlined : ButtonVariant.contained}
        >
          {isBoosted ? 'Boost' : 'Unboost'}
        </PageHeaderButton>
      }
    >
      <PageHeaderSection mainText={managedNode?.nickname || '-'} title="Nickname" />
      <PageHeaderSection mainText={ipAddress} title="IP Address" />
    </PageHeader>
  );
};

export default NodeHeader;
