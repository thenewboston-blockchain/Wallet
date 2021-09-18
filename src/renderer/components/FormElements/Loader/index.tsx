import React from 'react';
import {IconProps} from '@renderer/components/Icons';
import {SFC} from '@renderer/types';
import * as S from './Styles';

type LoaderProps = Pick<IconProps, 'size'>;

const Loader: SFC<LoaderProps> = ({className, size}) => {
  return (
    <S.Container className={className}>
      <S.LoadingIcon size={size} totalSize="unset" />
    </S.Container>
  );
};

export {S as LoaderStyles};
export default Loader;
