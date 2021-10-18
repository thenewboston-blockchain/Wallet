import React from 'react';
import {SFC} from '@shared/types';
import {NODE_FEE, PV_FEE, USERNAME_FEE} from '../constants';
import * as S from './Styles';

const TOTAL_FEES = NODE_FEE + PV_FEE + USERNAME_FEE;

const RegisterWalletModalTable: SFC = ({className}) => {
  return (
    <S.Table className={className}>
      <S.Row
        label={
          <>
            Username Fee
            <S.InfoIcon />
          </>
        }
        value={`${USERNAME_FEE.toLocaleString()}.0000`}
      />
      <S.Row
        label={
          <>
            Active Node Fee
            <S.InfoIcon />
          </>
        }
        value={`${NODE_FEE.toLocaleString()}.0000`}
      />
      <S.Row
        label={
          <>
            PV Fee
            <S.InfoIcon />
          </>
        }
        value={`${PV_FEE.toLocaleString()}.0000`}
      />
      <S.Row isSummary label="TOTAL" value={`${TOTAL_FEES.toLocaleString()}.0000`} />
    </S.Table>
  );
};

export default RegisterWalletModalTable;
