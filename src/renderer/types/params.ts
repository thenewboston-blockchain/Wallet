import {ProtocolType} from '@renderer/types/network';

export interface AccountNumberParams {
  accountNumber: string;
}

export interface AddressParams {
  ipAddress: string;
  port: string;
  protocol: ProtocolType;
}

export enum AccountSection {
  overview = 'overview',
  transaction = 'transaction',
  vault = 'vault',
}

export enum AccountVaultSection {
  coins = 'coins',
  history = 'history',
  boostHistory = 'boost-history',
  points = 'points',
}

export interface AccountVaultParams {
  vault: AccountVaultSection;
}

export type SectionParams<T> = {
  section: T;
};
