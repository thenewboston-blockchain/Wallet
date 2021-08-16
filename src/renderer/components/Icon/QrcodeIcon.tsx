import React, {forwardRef} from 'react';
import MdiReactIcon from 'mdi-react/QrcodeIcon';
import IconWrapper from '@renderer/components/Icon/IconWrapper';
import {IconProps} from '@renderer/components/Icon/types';

const QrcodeIcon = forwardRef<HTMLDivElement, IconProps>(({size = 24, ...props}, ref) => {
  return (
    <IconWrapper {...props} size={size} ref={ref}>
      <MdiReactIcon data-testid="QrcodeIcon" size={size} />
    </IconWrapper>
  );
});

export default QrcodeIcon;
