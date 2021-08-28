import React, {forwardRef} from 'react';
import MdiReactIcon from 'mdi-react/ChevronLeftIcon';
import IconWrapper from '@renderer/components/Icons/IconWrapper';
import {IconProps} from '@renderer/components/Icons/types';

const ChevronLeftIcon = forwardRef<HTMLDivElement, IconProps>(({size = 24, ...props}, ref) => {
  return (
    <IconWrapper {...props} size={size} ref={ref}>
      <MdiReactIcon data-testid="ChevronLeftIcon" size={size} />
    </IconWrapper>
  );
});

export default ChevronLeftIcon;
