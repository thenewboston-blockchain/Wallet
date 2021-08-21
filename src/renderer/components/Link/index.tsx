import React, {FC} from 'react';
import {LinkProps as RRLinkProps} from 'react-router-dom';
import * as S from './Styles';

interface LinkProps extends RRLinkProps {
  className?: string;
  disabled?: boolean;
  withChevron?: boolean;
}

const Link: FC<LinkProps> = ({children, className, disabled = false, withChevron = false, ...rrLinkProps}) => {
  return (
    <S.Link className={className} disabled={disabled} showRightChevron={withChevron} {...rrLinkProps}>
      {children}
      {withChevron && <S.ChevronRightIcon unfocusable />}
    </S.Link>
  );
};

export default Link;
