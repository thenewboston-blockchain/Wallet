/* eslint-disable react/jsx-props-no-spreading */

import {forwardRef} from 'react';
import MdiReactIcon from 'mdi-react/CloseIcon';
import IconWrapper from 'renderer/components/Icons/IconWrapper';
import {IconProps} from 'renderer/components/Icons/types';

const CloseIcon = forwardRef<HTMLDivElement, IconProps>(({size = 24, ...props}, ref) => {
  return (
    <IconWrapper {...props} size={size} ref={ref}>
      <MdiReactIcon data-testid="CloseIcon" size={size} />
    </IconWrapper>
  );
});

export default CloseIcon;
