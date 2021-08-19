import React, {forwardRef} from 'react';
import MdiReactIcon from 'mdi-react/CheckCircleIcon';
import IconWrapper from '@renderer/components/Icons/IconWrapper';
import {IconProps} from '@renderer/components/Icons/types';

const CheckCircleIcon = forwardRef<HTMLDivElement, IconProps>(({size = 24, ...props}, ref) => {
  return (
    <IconWrapper {...props} size={size} ref={ref}>
      <MdiReactIcon data-testid="CheckCircleIcon" size={size} />
    </IconWrapper>
  );
});

export default CheckCircleIcon;