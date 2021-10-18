import {createSlice} from '@reduxjs/toolkit';

import {VALIDATOR_BANKS} from '@renderer/constants/actions';
import {setPaginatedResultErrorReducer, setPaginatedResultReducer, unsetDataReducer} from '@renderer/utils/store';
import {DictWithPaginatedResultsAndError, ValidatorBank} from '@shared/types';

const validatorBanks = createSlice({
  initialState: {} as DictWithPaginatedResultsAndError<ValidatorBank>,
  name: VALIDATOR_BANKS,
  reducers: {
    setValidatorBanks: setPaginatedResultReducer<ValidatorBank>(),
    setValidatorBanksError: setPaginatedResultErrorReducer(),
    unsetValidatorBanks: unsetDataReducer(),
  },
});

export const {setValidatorBanks, setValidatorBanksError, unsetValidatorBanks} = validatorBanks.actions;

export default validatorBanks.reducer;
