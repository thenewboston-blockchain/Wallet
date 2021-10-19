import {createSlice} from '@reduxjs/toolkit';

import {BANK_BLOCKS} from '@renderer/constants/actions';
import {setPaginatedResultErrorReducer, setPaginatedResultReducer, unsetDataReducer} from '@renderer/utils/store';
import {BlockResponse, DictWithPaginatedResultsAndError} from '@shared/types';

const bankBlocks = createSlice({
  initialState: {} as DictWithPaginatedResultsAndError<BlockResponse>,
  name: BANK_BLOCKS,
  reducers: {
    setBankBlocks: setPaginatedResultReducer<BlockResponse>(),
    setBankBlocksError: setPaginatedResultErrorReducer(),
    unsetBankBlocks: unsetDataReducer(),
  },
});

export const {setBankBlocks, setBankBlocksError, unsetBankBlocks} = bankBlocks.actions;

export default bankBlocks.reducer;
