import React, {memo} from 'react';

import {PAGINATED_RESULTS_LIMIT} from '@renderer/config';
import {SFC} from '@shared/types';
import * as S from './Styles';

export interface PaginationSummaryProps {
  count: number;
  currentPage: number;
}

const PaginationSummary: SFC<PaginationSummaryProps> = ({className, count, currentPage}) => {
  const firstRow = Math.min((currentPage - 1) * PAGINATED_RESULTS_LIMIT + 1, count);
  const lastRow = Math.min(currentPage * PAGINATED_RESULTS_LIMIT, count);
  const summary = `${firstRow}-${lastRow} of ${count}`;

  return <S.Container className={className}>{summary}</S.Container>;
};

export {S as PaginationSummaryStyles};
export default memo(PaginationSummary);
