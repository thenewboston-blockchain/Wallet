import {useContext} from 'react';
import {TabsContext} from 'renderer/context';

const useTabsContext = () => {
  return useContext(TabsContext);
};

export default useTabsContext;
