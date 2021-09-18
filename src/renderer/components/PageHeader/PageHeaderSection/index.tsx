import React, {ReactNode} from 'react';
import {SFC} from '@renderer/types';
import * as S from './Styles';

interface PageHeaderSectionProps {
  hasVisibilityToggle?: boolean;
  mainText: ReactNode;
  title: ReactNode;
}

const PageHeaderSection: SFC<PageHeaderSectionProps> = ({
  children,
  className,
  hasVisibilityToggle = false,
  mainText,
  title,
}) => {
  return (
    <S.Container className={className}>
      <S.Title>{title}</S.Title>
      <S.Body>
        <S.MainText $hasVisibilityToggle={hasVisibilityToggle}>{mainText}</S.MainText>
        {children}
      </S.Body>
    </S.Container>
  );
};

export {S as PageHeaderSectionStyles};
export default PageHeaderSection;
