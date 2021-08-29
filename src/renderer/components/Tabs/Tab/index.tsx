import React, {useContext, useRef} from 'react';
import {TabsContext} from '@renderer/context';
import {SFC} from '@renderer/types';
import * as S from './Styles';

interface TabProps {
  value: string;
}

const Tab: SFC<TabProps> = ({children, className, value}) => {
  const {activeValue, onChange} = useContext(TabsContext);
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
