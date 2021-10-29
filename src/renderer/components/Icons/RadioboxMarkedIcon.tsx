/* eslint-disable react/jsx-props-no-spreading */

import {forwardRef} from 'react';
import MdiReactIcon from 'mdi-react/RadioboxMarkedIcon';
import IconWrapper from 'renderer/components/Icons/IconWrapper';
import {IconProps} from 'renderer/components/Icons/types';

const RadioboxMarkedIcon = forwardRef<HTMLDivElement, IconProps>(({size = 24, ...props}, ref) => {
  return (
    <IconWrapper {...props} size={size} ref={ref}>
      <MdiReactIcon data-testid="RadioboxMarkedIcon" size={size} />
    </IconWrapper>
  );
});

export default RadioboxMarkedIcon;
