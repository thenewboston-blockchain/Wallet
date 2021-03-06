import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';

import AccountLink from 'renderer/components/AccountLink';
import ExpandableText from 'renderer/components/ExpandableText';
import PaginatedTable, {PageTableData, PageTableItems} from 'renderer/components/PaginatedTable';
import {BANK_BANK_TRANSACTIONS} from 'renderer/constants/actions';
import {useToggle, usePaginatedNetworkDataFetcher} from 'renderer/hooks';
import {getActiveBankConfig} from 'renderer/selectors';
import {formatAddressFromNode} from 'renderer/utils/address';
import {formatDate} from 'renderer/utils/dates';
import {AccountNumberParams, BankTransaction, SFC} from 'shared/types';

import AccountTransactionsHeader from './AccountTransactionsHeader';
import * as S from './Styles';

enum TableKeys {
  senderAccountNumber,
  recipientAccountNumber,
  amount,
  memo,
  balanceKey,
  signature,
  dateCreated,
}

const AccountTransactions: SFC = ({className}) => {
  const [expanded, toggleExpanded] = useToggle(false);
  const [showFees, toggleShowFees] = useToggle(false);
  const {accountNumber} = useParams<AccountNumberParams>();
  const activeBank = useSelector(getActiveBankConfig)!;
  const activeBankAddress = formatAddressFromNode(activeBank);
  const {
    count,
    currentPage,
    loading,
    results: bankTransactions,
    setPage,
    totalPages,
  } = usePaginatedNetworkDataFetcher<BankTransaction>(BANK_BANK_TRANSACTIONS, activeBankAddress, {
    account_number: accountNumber,
  });

  const bankTransactionsTableData = useMemo<PageTableData[]>(
    () =>
      bankTransactions.map((bankTransaction) => ({
        key: bankTransaction.id,
        [TableKeys.amount]: bankTransaction.amount,
        [TableKeys.balanceKey]: <ExpandableText expanded={expanded} text={bankTransaction.block.balance_key} />,
        [TableKeys.dateCreated]: formatDate(bankTransaction.block.created_date),
        [TableKeys.memo]: <ExpandableText expanded={expanded} text={bankTransaction.memo || '-'} />,
        [TableKeys.recipientAccountNumber]: (
          <AccountLink accountNumber={bankTransaction.recipient} expanded={expanded} />
        ),
        [TableKeys.senderAccountNumber]: (
          <AccountLink accountNumber={bankTransaction.block.sender} expanded={expanded} />
        ),
        [TableKeys.signature]: <ExpandableText expanded={expanded} text={bankTransaction.block.signature} />,
      })) || [],
    [bankTransactions, expanded],
  );

  const pageTableItems = useMemo<PageTableItems>(
    () => ({
      data: bankTransactionsTableData,
      headers: {
        [TableKeys.amount]: 'Amount',
        [TableKeys.balanceKey]: 'Balance Key',
        [TableKeys.dateCreated]: 'Date Created',
        [TableKeys.memo]: 'Memo',
        [TableKeys.recipientAccountNumber]: 'Recipient',
        [TableKeys.senderAccountNumber]: 'Sender',
        [TableKeys.signature]: 'Signature',
      },
      orderedKeys: [
        TableKeys.senderAccountNumber,
        TableKeys.recipientAccountNumber,
        TableKeys.amount,
        TableKeys.memo,
        TableKeys.balanceKey,
        TableKeys.signature,
        TableKeys.dateCreated,
      ],
    }),
    [bankTransactionsTableData],
  );

  return (
    <div className={className}>
      <AccountTransactionsHeader />
      <S.TableCard>
        <PaginatedTable
          count={count}
          currentPage={currentPage}
          expanded={expanded}
          items={pageTableItems}
          loading={loading}
          showFees={showFees}
          setPage={setPage}
          toggleExpanded={toggleExpanded}
          toggleShowFees={toggleShowFees}
          totalPages={totalPages}
        />
      </S.TableCard>
    </div>
  );
};

export default AccountTransactions;
