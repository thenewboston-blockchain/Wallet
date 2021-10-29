import {createSlice} from '@reduxjs/toolkit';

import {BANK_BANKS} from 'renderer/constants/actions';
import {setPaginatedResultErrorReducer, setPaginatedResultReducer, unsetDataReducer} from 'renderer/utils/store';
import {DictWithPaginatedResultsAndError, Node} from 'shared/types';

const bankBanks = createSlice({
  initialState: {} as DictWithPaginatedResultsAndError<Node>,
  name: BANK_BANKS,
  reducers: {
    setBankBanks: setPaginatedResultReducer<Node>(),
    setBankBanksError: setPaginatedResultErrorReducer(),
    unsetBankBanks: unsetDataReducer(),
  },
});

export const {setBankBanks, setBankBanksError, unsetBankBanks} = bankBanks.actions;

export default bankBanks.reducer;
