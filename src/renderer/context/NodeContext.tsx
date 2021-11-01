import {createContext, FC, Reducer, useEffect, useMemo, useReducer} from 'react';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';

import {useAddress} from 'renderer/hooks';
import {getManagedValidators} from 'renderer/selectors';
import {AddressParams, ManagedNode, ProtocolType} from 'shared/types';

enum NodeActionType {
  set = 'set',
}

interface SetNodeAction {
  type: NodeActionType.set;
  payload: ReducerState;
}

type NodeAction = SetNodeAction;

type ReducerState = Record<string, any>;

const defaultReducerValue: ReducerState = {};

const nodeReducer: Reducer<ReducerState, NodeAction> = (state, action) => {
  switch (action.type) {
    case NodeActionType.set:
      return action.payload;
    default:
      return state;
  }
};

export interface NodeState extends ReducerState {
  address: string;
  ipAddress: string;
  isAuthenticated: boolean;
  managedNode: ManagedNode | null;
  port: string;
  protocol: ProtocolType;
}

const defaultContextValue: NodeState = {
  ...defaultReducerValue,
  address: '',
  ipAddress: '',
  isAuthenticated: false,
  managedNode: null,
  port: '',
  protocol: 'http',
};

const NodeContext = createContext<NodeState>(defaultContextValue);

const NodeProvider: FC = ({children}) => {
  const [state, dispatch] = useReducer(nodeReducer, defaultReducerValue);
  const {ipAddress, port, protocol} = useParams<AddressParams>();
  const address = useAddress();
  const managedValidators = useSelector(getManagedValidators);
  const managedValidator = managedValidators[address];

  const isAuthenticated = useMemo((): boolean => {
    return !!managedValidator?.account_signing_key && !!managedValidator?.nid_signing_key;
  }, [managedValidator]);

  useEffect(() => {
    dispatch({
      payload: {
        address,
        ipAddress,
        isAuthenticated,
        managedNode: managedValidator,
        port,
        protocol,
      },
      type: NodeActionType.set,
    });
  }, [address, ipAddress, isAuthenticated, managedValidator, port, protocol]);

  const valueToBePassed = useMemo<NodeState>(
    () => ({
      address,
      ipAddress,
      isAuthenticated,
      managedNode: managedValidator,
      port,
      protocol,
      ...state,
    }),
    [address, ipAddress, isAuthenticated, managedValidator, port, protocol, state],
  );

  return <NodeContext.Provider value={valueToBePassed}>{children}</NodeContext.Provider>;
};

export {NodeContext, NodeProvider};
