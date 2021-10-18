import {createSlice} from '@reduxjs/toolkit';

import {VALIDATOR_CONFIGS} from '@renderer/constants/actions';
import {setDataErrorReducer, setDataReducer} from '@renderer/utils/store';
import {DictWithDataAndError, ValidatorConfig} from '@shared/types';

const validatorConfigs = createSlice({
  initialState: {} as DictWithDataAndError<ValidatorConfig>,
  name: VALIDATOR_CONFIGS,
  reducers: {
    setValidatorConfig: setDataReducer<ValidatorConfig>(),
    setValidatorConfigError: setDataErrorReducer(),
  },
});

export const {setValidatorConfig, setValidatorConfigError} = validatorConfigs.actions;

export default validatorConfigs.reducer;
