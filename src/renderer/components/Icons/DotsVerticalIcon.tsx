/* eslint-disable react/jsx-props-no-spreading */

import {forwardRef} from 'react';
import MdiReactIcon from 'mdi-react/DotsVerticalIcon';
import IconWrapper from 'renderer/components/Icons/IconWrapper';
import {IconProps} from 'renderer/components/Icons/types';

const DotsVerticalIcon = forwardRef<HTMLDivElement, IconProps>(({size = 24, ...props}, ref) => {
  return (
    <IconWrapper {...props} size={size} ref={ref}>
      <MdiReactIcon data-testid="DotsVerticalIcon" size={size} />
    </IconWrapper>
  );
});

export default DotsVerticalIcon;
