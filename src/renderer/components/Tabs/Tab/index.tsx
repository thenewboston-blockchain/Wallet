import React, {useRef} from 'react';
import {useTabsContext} from '@renderer/hooks';
import {SFC} from '@shared/types';
import * as S from './Styles';

interface TabProps {
  value: string;
}

const Tab: SFC<TabProps> = ({children, className, value}) => {
  const {activeValue, onChange} = useTabsContext();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const isActive = activeValue === value;

  const handleClick = (): void => {
    if (isActive) return;

    onChange(value);
    buttonRef.current?.blur();
  };

  return (
    <S.Button className={className} $isActive={isActive} onClick={handleClick} ref={buttonRef}>
      {children}
    </S.Button>
  );
};

export default Tab;
