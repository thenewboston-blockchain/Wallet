import React, {forwardRef} from 'react';
import MdiReactIcon from 'mdi-react/DownloadIcon';
import IconWrapper from '@renderer/components/Icon/IconWrapper';
import {IconProps} from '@renderer/components/Icon/types';

const DownloadIcon = forwardRef<HTMLDivElement, IconProps>(({size = 24, ...props}, ref) => {
  return (
    <IconWrapper {...props} size={size} ref={ref}>
      <MdiReactIcon data-testid="DownloadIcon" size={size} />
    </IconWrapper>
  );
});

export default DownloadIcon;
