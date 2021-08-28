import React, {forwardRef} from 'react';
import MdiReactIcon from 'mdi-react/PlayIcon';
import IconWrapper from '@renderer/components/Icons/IconWrapper';
import {IconProps} from '@renderer/components/Icons/types';

const PlayIcon = forwardRef<HTMLDivElement, IconProps>(({size = 24, ...props}, ref) => {
  return (
    <IconWrapper {...props} size={size} ref={ref}>
      <MdiReactIcon data-testid="PlayIcon" size={size} />
    </IconWrapper>
  );
});

export default PlayIcon;
