import React, {forwardRef} from 'react';
import MdiReactIcon from 'mdi-react/AlertCircleOutlineIcon';
import IconWrapper from '@renderer/components/Icons/IconWrapper';
import {IconProps} from '@renderer/components/Icons/types';

const AlertCircleOutlineIcon = forwardRef<HTMLDivElement, IconProps>(({size = 24, ...props}, ref) => {
  return (
    <IconWrapper {...props} size={size} ref={ref}>
      <MdiReactIcon data-testid="AlertCircleOutlineIcon" size={size} />
    </IconWrapper>
  );
});

export default AlertCircleOutlineIcon;
