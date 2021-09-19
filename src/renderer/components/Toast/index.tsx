import React, {FC, ReactNode, useCallback} from 'react';
import {ToastType} from '@renderer/types/toast';

import * as S from './Styles';

interface ComponentProps {
  className?: string;
  type: ToastType;
}

const Toast: FC<ComponentProps> = ({children, className, type = ToastType.error}) => {
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
