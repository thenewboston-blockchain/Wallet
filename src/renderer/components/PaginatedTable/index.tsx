import React from 'react';
import clsx from 'clsx';
import {bemify} from '@thenewboston/utils';

import {PageTableItems, PageTableData, PageTableProps} from '@renderer/components/PageTable';
import {Loader} from '@renderer/components/FormElements';
import {SFC} from '@renderer/types';

import Pagination, {PaginationProps} from './Pagination';
import PaginationSummary, {PaginationSummaryProps} from './PaginationSummary';
import * as S from './Styles';

interface PaginatedTableProps extends PageTableProps, PaginationProps, PaginationSummaryProps {
  expanded?: boolean;
  loading: boolean;
  showFees?: boolean;
  toggleExpanded?(): void;
  toggleShowFees?(): void;
}

const PaginatedTable: SFC<PaginatedTableProps> = ({
  className,
  count,
  currentPage,
  expanded,
  handleSelectRow,
  items,
  loading,
  selectedData,
  setPage,
  showFees,
  toggleExpanded,
  toggleShowFees,
  totalPages,
}) => {
  return (
    <div className={className}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <S.Header>
            <PaginationSummary count={count} currentPage={currentPage} />
            <S.HeaderRight>
              {expanded !== undefined && !!toggleExpanded && (
                <S.Switch checked={expanded} label="Show full info" onChange={toggleExpanded} />
              )}
              {showFees !== undefined && !!toggleShowFees && (
                <S.Switch checked={showFees} label="Show fees" onChange={toggleShowFees} />
              )}
            </S.HeaderRight>
          </S.Header>
          <S.PageTable handleSelectRow={handleSelectRow} items={items} selectedData={selectedData} />
        </>
      )}
      <Pagination
        className={clsx('PaginatedTable__Pagination', {...bemify(className, '__Pagination')})}
        currentPage={currentPage}
        setPage={setPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export {PageTableData, PageTableItems};

export default PaginatedTable;
