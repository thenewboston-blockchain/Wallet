import React from 'react';
import {SFC} from '@renderer/types';
import {NODE_FEE, PV_FEE, USERNAME_FEE} from '../constants';
import * as S from './Styles';

const TOTAL_FEES = NODE_FEE + PV_FEE + USERNAME_FEE;

const RegisterWalletModalTable: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <S.Row>
        <S.RowLeft>
          Username Fee
          <S.InfoIcon />
        </S.RowLeft>
        <S.RowRight>{USERNAME_FEE.toLocaleString()}.0000</S.RowRight>
      </S.Row>
      <S.Row>
        <S.RowLeft>
          Active Node Fee
          <S.InfoIcon />
        </S.RowLeft>
        <S.RowRight>{NODE_FEE.toLocaleString()}.0000</S.RowRight>
      </S.Row>
      <S.Row>
        <S.RowLeft>
          PV Fee
          <S.InfoIcon />
        </S.RowLeft>
        <S.RowRight>{PV_FEE.toLocaleString()}.0000</S.RowRight>
      </S.Row>
      <S.RowSummary>
        <S.RowLeft>TOTAL</S.RowLeft>
        <S.RowRight>{TOTAL_FEES.toLocaleString()}.0000</S.RowRight>
      </S.RowSummary>
    </S.Container>
  );
};

export default RegisterWalletModalTable;
