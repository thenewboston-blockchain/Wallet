import {useContext} from 'react';
import {AccountContext} from 'renderer/context';

const useAccountContext = () => {
  return useContext(AccountContext);
};

export default useAccountContext;
