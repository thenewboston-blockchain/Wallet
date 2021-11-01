import {createContext, FC} from 'react';
import noop from 'lodash/noop';

export interface TabsState {
  activeValue: string;
  onChange(newValue: string): void;
}

const TabsContext = createContext<TabsState>({activeValue: '', onChange: noop});

const TabsProvider: FC<TabsState> = ({activeValue, children, onChange}) => {
  return <TabsContext.Provider value={{activeValue, onChange}}>{children}</TabsContext.Provider>;
};

export {TabsContext, TabsProvider};
