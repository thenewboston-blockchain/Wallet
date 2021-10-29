/* eslint-disable react/jsx-props-no-spreading */

import {Fragment, ReactNode} from 'react';
import {SFC} from 'shared/types';

import PageHeaderSection, {PageHeaderSectionStyles} from './PageHeaderSection';
import * as S from './Styles';

interface PageHeaderProps {
  dropdown?: ReactNode;
  rightButtons?: ReactNode | ReactNode[];
}

const PageHeader: SFC<PageHeaderProps> = ({children, className, dropdown, rightButtons}) => {
  const renderRightButtons = (): ReactNode => {
    if (!rightButtons) return null;

    if (Array.isArray(rightButtons)) {
      // eslint-disable-next-line react/no-array-index-key
      return rightButtons.map((rightButton, i) => <Fragment key={i}>{rightButton}</Fragment>);
    }

    return rightButtons;
  };

  const renderRightSection = (): ReactNode => {
    return (
      <S.Right $hasDropdown={!!dropdown}>
        {renderRightButtons()}
        {dropdown || null}
      </S.Right>
    );
  };

  return (
    <S.Container className={className}>
      <S.Left>{children}</S.Left>
      {dropdown || rightButtons ? renderRightSection() : null}
    </S.Container>
  );
};

export {PageHeaderSection, PageHeaderSectionStyles, S as PageHeaderStyles};
export default PageHeader;
