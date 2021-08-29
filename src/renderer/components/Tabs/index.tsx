import React from 'react';
import {TabsProvider} from '@renderer/context';
import {SFC} from '@renderer/types';

import Tab from './Tab';
import * as S from './Styles';

interface TabsProps {
  onChange(newValue: string): void;
  value: string;
}

const Tabs: SFC<TabsProps> = ({children, className, onChange, value}) => {
  return (
    <TabsProvider activeValue={value} onChange={onChange}>
      <S.Container className={className}>{children}</S.Container>
    </TabsProvider>
  );
};

export {Tab};
export default Tabs;
