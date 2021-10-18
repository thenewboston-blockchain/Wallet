import {createSlice} from '@reduxjs/toolkit';

import {BANK_VALIDATORS} from '@renderer/constants/actions';
import {setPaginatedResultErrorReducer, setPaginatedResultReducer, unsetDataReducer} from '@renderer/utils/store';
import {BaseValidator, DictWithPaginatedResultsAndError} from '@shared/types';

const bankValidators = createSlice({
  initialState: {} as DictWithPaginatedResultsAndError<BaseValidator>,
  name: BANK_VALIDATORS,
  reducers: {
    setBankValidators: setPaginatedResultReducer<BaseValidator>(),
    setBankValidatorsError: setPaginatedResultErrorReducer(),
    unsetBankValidators: unsetDataReducer(),
  },
});

export const {setBankValidators, setBankValidatorsError, unsetBankValidators} = bankValidators.actions;

export default bankValidators.reducer;
