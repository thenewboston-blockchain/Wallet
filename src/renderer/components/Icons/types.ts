import React, {HTMLAttributes} from 'react';

export interface SvgIconProps {
  size: number;
}

export interface IconProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  dataTestId?: string;
  disabled?: boolean;
  onClick?(e?: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
  onKeyDown?(e?: React.KeyboardEvent<HTMLDivElement>): void;
  size?: number;
  totalSize?: number | 'unset';
  unfocusable?: boolean;
}
