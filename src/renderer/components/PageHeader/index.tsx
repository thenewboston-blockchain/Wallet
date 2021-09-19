/* eslint-disable react/jsx-props-no-spreading */

import React, {ReactNode} from 'react';
import {SFC} from '@renderer/types';
import {ButtonProps} from '@renderer/components/FormElements';

import PageHeaderSection, {PageHeaderSectionStyles} from './PageHeaderSection';
import * as S from './Styles';

interface PageHeaderProps {
  dropdown: ReactNode;
  rightButton: ReactNode;
}

const PageHeader: SFC<PageHeaderProps> = ({children, className, dropdown, rightButton}) => {
  const renderRightSection = (): ReactNode => {
    return (
      <S.Right>
        {rightButton || null}
        {dropdown || null}
      </S.Right>
    );
  };

  return (
    <S.Container className={className}>
      <S.Left>{children}</S.Left>
      {dropdown || rightButton ? renderRightSection() : null}
    </S.Container>
  );
};

const PageHeaderButton: SFC<ButtonProps> = ({children, className, ...props}) => {
  return (
    <S.RightButton className={className} {...props}>
      {children}
    </S.RightButton>
  );
};

export {PageHeaderButton, PageHeaderSection, PageHeaderSectionStyles, S as PageHeaderStyles};
export default PageHeader;
