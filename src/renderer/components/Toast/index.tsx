import React, {ReactNode, useCallback} from 'react';
import {SFC, ToastType} from '@renderer/types';

import * as S from './Styles';

interface ComponentProps {
  type: ToastType;
}

const Toast: SFC<ComponentProps> = ({children, className, type = ToastType.error}) => {
  const renderIcon = useCallback((): ReactNode => {
    switch (type) {
      case ToastType.success:
        return <S.CheckCircleIcon />;
      default:
        return <S.AlertCircleOutlineIcon />;
    }
  }, [type]);

  return (
    <S.Container className={className} type={type}>
      {renderIcon()}
      <S.Text>{children}</S.Text>
    </S.Container>
  );
};

export {S as ToastStyles};
export default Toast;
