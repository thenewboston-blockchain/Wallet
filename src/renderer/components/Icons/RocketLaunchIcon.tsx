import React, {forwardRef} from 'react';
import MdiReactIcon from 'mdi-react/RocketLaunchIcon';
import IconWrapper from '@renderer/components/Icons/IconWrapper';
import {IconProps} from '@renderer/components/Icons/types';

const RocketLaunchIcon = forwardRef<HTMLDivElement, IconProps>(({size = 24, ...props}, ref) => {
  return (
    <IconWrapper {...props} size={size} ref={ref}>
      <MdiReactIcon data-testid="RocketLaunchIcon" size={size} />
    </IconWrapper>
  );
});

export default RocketLaunchIcon;