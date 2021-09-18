/* eslint-disable react/jsx-props-no-spreading */

import React, {FC} from 'react';
import {LinkProps as RRLinkProps} from 'react-router-dom';
import * as S from './Styles';

interface LinkProps extends RRLinkProps {
  className?: string;
  disabled?: boolean;
  textStyled?: boolean;
  withChevron?: boolean;
}

const Link: FC<LinkProps> = ({
  children,
  className,
  disabled = false,
  textStyled = false,
  withChevron = false,
  ...rrLinkProps
}) => {
  return (
    <S.Link className={className} $disabled={disabled} $textStyled={textStyled} {...rrLinkProps}>
      {children}
      {withChevron && !textStyled && <S.ChevronRightIcon unfocusable />}
    </S.Link>
  );
};

export {S as LinkStyles};
export default Link;
