import {ProtocolType} from './network';

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
  transactions = 'transactions',
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

export interface NodeParams {
  section: NodeSection;
}

export enum NodeSection {
  overview = 'overview',
  accounts = 'accounts',
  transactions = 'transactions',
  blocks = 'blocks',
  confirmations = 'confirmations',
  invalidBlocks = 'invalid-blocks',
  nodes = 'nodes',
}

export type SectionParams<T> = {
  section: T;
};
