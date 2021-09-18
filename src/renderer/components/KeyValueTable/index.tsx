import React, {ReactNode} from 'react';
import {SFC} from '@renderer/types';
import * as S from './Styles';

const KeyValueTable: SFC = ({className, children}) => {
  return <S.Container className={className}>{children}</S.Container>;
};

interface RowProps {
  isSummary?: boolean;
  label: ReactNode;
  value: ReactNode;
}

const Row: SFC<RowProps> = ({className, isSummary = false, label, value}) => {
  return (
    <S.Row $isSummary={isSummary} className={className}>
      <S.Label>{label}</S.Label>
      <S.Value>{value}</S.Value>
    </S.Row>
  );
};

export {Row, RowProps, S as KeyValueTableStyles};
export default KeyValueTable;
