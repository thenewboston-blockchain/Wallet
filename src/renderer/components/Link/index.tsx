/* eslint-disable react/jsx-props-no-spreading */

import {LinkProps as RRLinkProps} from 'react-router-dom';
import {SFC} from 'shared/types';
import * as S from './Styles';

interface LinkProps extends RRLinkProps {
  disabled?: boolean;
  textStyled?: boolean;
  withChevron?: boolean;
}

const Link: SFC<LinkProps> = ({
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
