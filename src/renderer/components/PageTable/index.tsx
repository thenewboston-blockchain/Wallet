import React, {Fragment, ReactNode} from 'react';

import {GenericVoidFunction, SFC} from '@renderer/types';
import * as S from './Styles';
import {Checkbox} from '@renderer/components/FormElements';

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
}

export interface PageTableProps {
  handleSelectRow?(i: number): GenericVoidFunction;
  items: PageTableItems;
  selectedData?: {[key: string]: any};
}

const PageTable: SFC<PageTableProps> = ({className, handleSelectRow, items, selectedData}) => {
  const {headers, data, orderedKeys} = items;
  const hasCheckbox = !!handleSelectRow && !!selectedData;
  const numOfColumns = orderedKeys.length + (hasCheckbox ? 1 : 0);

  return (
    <S.Grid className={className} $numOfCols={numOfColumns}>
      {orderedKeys.map((key) => (
        <S.Cell key={key} $isHeader={true} $numOfCols={numOfColumns}>
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
            <S.Cell $numOfCols={numOfColumns}>{item[key] || '-'}</S.Cell>
          </Fragment>
        )),
      )}
    </S.Grid>
  );
};

export default PageTable;
