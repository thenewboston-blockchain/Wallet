/* eslint-disable react/jsx-props-no-spreading */

import React, {forwardRef} from 'react';
import MdiReactIcon from 'mdi-react/ChevronRightIcon';
import IconWrapper from '@renderer/components/Icons/IconWrapper';
import {IconProps} from '@renderer/components/Icons/types';

const ChevronRightIcon = forwardRef<HTMLDivElement, IconProps>(({size = 24, ...props}, ref) => {
  return (
    <IconWrapper {...props} size={size} ref={ref}>
      <MdiReactIcon data-testid="ChevronRightIcon" size={size} />
    </IconWrapper>
  );
});

export default ChevronRightIcon;
