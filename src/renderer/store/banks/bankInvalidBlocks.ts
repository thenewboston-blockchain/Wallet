import {createSlice} from '@reduxjs/toolkit';

import {BANK_INVALID_BLOCKS} from '@renderer/constants/actions';
import {setPaginatedResultErrorReducer, setPaginatedResultReducer, unsetDataReducer} from '@renderer/utils/store';
import {DictWithPaginatedResultsAndError, InvalidBlock} from '@shared/types';

const bankInvalidBlocks = createSlice({
  initialState: {} as DictWithPaginatedResultsAndError<InvalidBlock>,
  name: BANK_INVALID_BLOCKS,
  reducers: {
    setBankInvalidBlocks: setPaginatedResultReducer<InvalidBlock>(),
    setBankInvalidBlocksError: setPaginatedResultErrorReducer(),
    unsetBankInvalidBlocks: unsetDataReducer(),
  },
});

export const {setBankInvalidBlocks, setBankInvalidBlocksError, unsetBankInvalidBlocks} = bankInvalidBlocks.actions;

export default bankInvalidBlocks.reducer;
