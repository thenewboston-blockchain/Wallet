import {ReactNode, useMemo} from 'react';

import {useFormContext2} from 'renderer/hooks/useFormContext';
import {SFC} from 'shared/types';
import {HelperTextType} from './types';
import * as S from './Styles';

export interface HelperTextProps {
  name?: string;
  type?: HelperTextType;
}

const HelperText: SFC<HelperTextProps> = ({children, className, name, type}) => {
  const {errors, touched} = useFormContext2();
  const error = name ? errors?.[name] || null : null;
  const isTouched = name ? touched?.[name] || null : null;
  const errorMessage = error && isTouched ? error : null;
  const helperTextType = type || (errorMessage && HelperTextType.error) || HelperTextType.default;

  const icon = useMemo<ReactNode>(() => {
    if (helperTextType === HelperTextType.success) {
      return <S.CheckCircleIcon $type={helperTextType} />;
    }
    if (helperTextType === HelperTextType.error) {
      return <S.AlertIcon $type={helperTextType} />;
    }

    return null;
  }, [helperTextType]);

  if (!children && !errorMessage) return null;
  return (
    <S.Container className={className} $type={helperTextType}>
      {icon}
      {children}
      {errorMessage}
    </S.Container>
  );
};

export {HelperTextType, S as HelperTextStyles};
export default HelperText;
