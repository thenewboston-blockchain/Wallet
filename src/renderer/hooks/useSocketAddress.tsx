import {useMemo} from 'react';
import {useParams} from 'react-router-dom';
import {formatAddress} from '@renderer/utils/address';
import {AddressParams} from '@shared/types';

const useSocketAddress = (): string => {
  const {ipAddress, port} = useParams<AddressParams>();
  return useMemo(() => (ipAddress ? formatAddress(ipAddress, port, 'ws') : ''), [ipAddress, port]);
};

export default useSocketAddress;
