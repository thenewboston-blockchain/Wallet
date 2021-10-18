import React, {Fragment, ReactNode} from 'react';

import {Checkbox} from '@renderer/components/FormElements';
import {GenericVoidFunction, SFC} from '@shared/types';
import * as S from './Styles';

interface Header {
  [tableKey: string]: ReactNode;
}

export interface PageTableData {
  key: string;
  [tableKey: string]: ReactNode;
}

export interface PageTableItems {
  orderedKeys: number[];
  headers: Header;
  data: PageTableData[];
  meta?: {
    align?: {[tableKey: string]: 'left' | 'center' | 'right'};
    gridTemplateColumns?: string;
  };
}

export interface PageTableProps {
  handleSelectRow?(i: number): GenericVoidFunction;
  items: PageTableItems;
  selectedData?: {[key: string]: any};
}

const PageTable: SFC<PageTableProps> = ({className, handleSelectRow, items, selectedData}) => {
  const {headers, data, meta, orderedKeys} = items;
  const align = meta?.align || undefined;
  const gridTemplateColumns = meta?.gridTemplateColumns || undefined;
  const hasCheckbox = !!handleSelectRow && !!selectedData;
  const numOfColumns = orderedKeys.length + (hasCheckbox ? 1 : 0);

  return (
    <S.Grid className={className} $gridTemplateColumns={gridTemplateColumns} $numOfCols={numOfColumns}>
      {orderedKeys.map((key) => (
        <S.Cell key={key} $isHeader $numOfCols={numOfColumns} $align={align?.[key]}>
          {headers[key]}
        </S.Cell>
      ))}
      {data.map((item, dataIndex) =>
        orderedKeys.map((key) => (
          <Fragment key={key}>
            {hasCheckbox ? (
              <Checkbox
                checked={selectedData![item.key] !== undefined}
                onClick={handleSelectRow!(dataIndex)}
                value={item.key}
              />
            ) : null}
            <S.Cell $align={align?.[key]} $numOfCols={numOfColumns}>
              {item[key]}
            </S.Cell>
          </Fragment>
        )),
      )}
    </S.Grid>
  );
};

export {S as PageTableStyles};
export default PageTable;
