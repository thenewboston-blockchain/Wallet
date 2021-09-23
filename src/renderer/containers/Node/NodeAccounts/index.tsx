import React, {useMemo} from 'react';

import AccountLink from '@renderer/components/AccountLink';
import ExpandableText from '@renderer/components/ExpandableText';
import PaginatedTable, {PageTableData, PageTableItems} from '@renderer/components/PaginatedTable';
import {VALIDATOR_ACCOUNTS} from '@renderer/constants/actions';
import {useNodeContext, usePaginatedNetworkDataFetcher, useToggle} from '@renderer/hooks';
import {SFC, ValidatorAccount} from '@renderer/types';
import * as S from './Styles';

enum TableKeys {
  accountNumber,
  balance,
  balanceLock,
}

const NodeAccounts: SFC = ({className}) => {
  const {address} = useNodeContext();
  const [expanded, toggleExpanded] = useToggle(false);
  const {
    count,
    currentPage,
    loading,
    results: nodeAccounts,
    setPage,
    totalPages,
  } = usePaginatedNetworkDataFetcher<ValidatorAccount>(VALIDATOR_ACCOUNTS, address);

  const tableData = useMemo<PageTableData[]>(
    () =>
      nodeAccounts.map((account) => ({
        key: account.id,
        [TableKeys.accountNumber]: <AccountLink accountNumber={account.account_number} expanded={expanded} />,
        [TableKeys.balanceLock]: <ExpandableText expanded={expanded} text={account.balance_lock} />,
        [TableKeys.balance]: account.balance,
      })) || [],
    [expanded, nodeAccounts],
  );

  const pageTableItems = useMemo<PageTableItems>(
    () => ({
      data: tableData,
      headers: {
        [TableKeys.accountNumber]: 'Account Number',
        [TableKeys.balanceLock]: 'Balance Lock',
        [TableKeys.balance]: 'Balance',
      },
      meta: {
        align: {
          [TableKeys.balance]: 'right',
          [TableKeys.balanceLock]: 'right',
        },
        gridTemplateColumns: 'minmax(max-content, 1fr) minmax(max-content, 1fr) minmax(max-content, 1fr)',
      },
      orderedKeys: [TableKeys.accountNumber, TableKeys.balance, TableKeys.balanceLock],
    }),
    [tableData],
  );

  return (
    <S.Card className={className}>
      <PaginatedTable
        count={count}
        currentPage={currentPage}
        items={pageTableItems}
        loading={loading}
        setPage={setPage}
        toggleExpanded={toggleExpanded}
        totalPages={totalPages}
      />
    </S.Card>
  );
};

export default NodeAccounts;
