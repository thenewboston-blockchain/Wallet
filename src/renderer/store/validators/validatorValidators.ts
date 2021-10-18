import {createSlice} from '@reduxjs/toolkit';

import {VALIDATOR_VALIDATORS} from '@renderer/constants/actions';
import {setPaginatedResultErrorReducer, setPaginatedResultReducer, unsetDataReducer} from '@renderer/utils/store';
import {BaseValidator, DictWithPaginatedResultsAndError} from '@shared/types';

const validatorValidators = createSlice({
  initialState: {} as DictWithPaginatedResultsAndError<BaseValidator>,
  name: VALIDATOR_VALIDATORS,
  reducers: {
    setValidatorValidators: setPaginatedResultReducer<BaseValidator>(),
    setValidatorValidatorsError: setPaginatedResultErrorReducer(),
    unsetValidatorValidators: unsetDataReducer(),
  },
});

export const {setValidatorValidators, setValidatorValidatorsError, unsetValidatorValidators} =
  validatorValidators.actions;

export default validatorValidators.reducer;
