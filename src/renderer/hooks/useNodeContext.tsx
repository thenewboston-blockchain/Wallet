import {useContext} from 'react';
import {NodeContext} from '@renderer/context';

const useNodeContext = () => {
  return useContext(NodeContext);
};

export default useNodeContext;
