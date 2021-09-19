import React, {ReactNode, useCallback, useMemo} from 'react';
import noop from 'lodash/noop';
import {SFC} from '@renderer/types';

import * as S from './Styles';

export interface PaginationProps {
  currentPage: number;
  setPage(page: number): () => void;
  totalPages: number;
}

const TOTAL_VISIBLE_PAGES = 11;

const Pagination: SFC<PaginationProps> = ({className, currentPage, setPage, totalPages}) => {
  const nextIsDisabled = useMemo(() => currentPage >= totalPages, [currentPage, totalPages]);
  const prevIsDisabled = useMemo(() => currentPage === 1, [currentPage]);
  const leftEllipsesIsVisible = useMemo(() => currentPage > Math.floor(TOTAL_VISIBLE_PAGES / 2) + 1, [currentPage]);
  const rightEllipsesIsVisible = useMemo(() => currentPage < totalPages - Math.floor(TOTAL_VISIBLE_PAGES / 2), [
    currentPage,
    totalPages,
  ]);

  const renderEllipses = useCallback((key: string): ReactNode => {
    return <S.Ellipse key={key}>...</S.Ellipse>;
  }, []);

  const renderPage = useCallback(
    (page: number): ReactNode => {
      return (
        <S.PageButton $active={page === currentPage} key={page} onClick={setPage(page)}>
          {page}
        </S.PageButton>
      );
    },
    [currentPage, setPage],
  );

  const renderMiddle = useCallback((): ReactNode => {
    if (totalPages <= 1) return null;

    const pageNodes = [renderPage(1)];
    if (leftEllipsesIsVisible) pageNodes.push(renderEllipses('left'));

    const totalMiddleNumbers =
      TOTAL_VISIBLE_PAGES - 2 - (leftEllipsesIsVisible ? 1 : 0) - (rightEllipsesIsVisible ? 1 : 0);

    if (totalMiddleNumbers > 0) {
      const secondNumber = Math.max(currentPage - 3 - (leftEllipsesIsVisible ? 0 : 1), 2);
      const secondLastNumber = Math.min(currentPage + 3 + (rightEllipsesIsVisible ? 0 : 1), totalPages - 1);

      for (let i = secondNumber; i <= secondLastNumber; i += 1) {
        pageNodes.push(renderPage(i));
      }
    }

    if (rightEllipsesIsVisible) pageNodes.push(renderEllipses('right'));
    pageNodes.push(renderPage(totalPages));

    return pageNodes;
  }, [currentPage, leftEllipsesIsVisible, renderEllipses, renderPage, rightEllipsesIsVisible, totalPages]);

  if (totalPages <= 1) return null;
  return (
    <S.Container className={className}>
      <S.ChevronLeftIcon disabled={prevIsDisabled} onClick={prevIsDisabled ? noop : setPage(currentPage - 1)} />
      {renderMiddle()}
      <S.ChevronRightIcon disabled={nextIsDisabled} onClick={nextIsDisabled ? noop : setPage(currentPage + 1)} />
    </S.Container>
  );
};

export {S as PaginationStyles};
export default Pagination;
