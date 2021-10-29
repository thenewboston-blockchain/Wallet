import {defaultPaginatedQueryParam} from 'renderer/config';
import {ACCOUNTS, BANKS, VALIDATORS} from 'renderer/constants/actions';
import {
  setValidatorAccounts,
  setValidatorAccountsError,
  setValidatorBanks,
  setValidatorBanksError,
  setValidatorConfig,
  setValidatorConfigError,
  setValidatorValidators,
  setValidatorValidatorsError,
} from 'renderer/store/validators';
import {fetchPaginatedResults, sanitizePortFieldFromRawPrimaryValidatorConfig} from 'renderer/utils/api';
import axios from 'renderer/utils/axios';
import {
  AppDispatch,
  BaseValidator,
  NodeType,
  PaginatedQueryParams,
  RawPrimaryValidatorConfig,
  ValidatorAccount,
  ValidatorBank,
  ValidatorConfig,
} from 'shared/types';

export const fetchValidatorAccounts =
  (address: string, params: PaginatedQueryParams = defaultPaginatedQueryParam) =>
  async (dispatch: AppDispatch) => {
    return fetchPaginatedResults<ValidatorAccount>(
      address,
      ACCOUNTS,
      params,
      dispatch,
      setValidatorAccounts,
      setValidatorAccountsError,
    );
  };

export const fetchValidatorBanks =
  (address: string, params: PaginatedQueryParams = defaultPaginatedQueryParam) =>
  async (dispatch: AppDispatch) => {
    return fetchPaginatedResults<ValidatorBank>(
      address,
      BANKS,
      params,
      dispatch,
      setValidatorBanks,
      setValidatorBanksError,
    );
  };

export const fetchValidatorConfig =
  (address: string) =>
  async (dispatch: AppDispatch): Promise<{address: string; data?: ValidatorConfig; error?: any}> => {
    try {
      const {data: rawData} = await axios.get<RawPrimaryValidatorConfig>(`${address}/config`);
      const data = sanitizePortFieldFromRawPrimaryValidatorConfig(rawData);

      if (data.node_type !== NodeType.primaryValidator && data.node_type !== NodeType.confirmationValidator) {
        const errorObject = {address, error: 'Node not a validator'};
        dispatch(setValidatorConfigError(errorObject));
        return errorObject;
      }

      dispatch(setValidatorConfig({address, data}));
      return {address, data};
    } catch (error: any) {
      if (error.message) {
        const errorObject = {address, error: error.message};
        dispatch(setValidatorConfigError(errorObject));
        return errorObject;
      }
      if (error.response) {
        const errorObject = {address, error: error.response.data};
        dispatch(setValidatorConfigError(errorObject));
        return errorObject;
      }
      throw error;
    }
  };

export const fetchValidatorValidators =
  (address: string, params: PaginatedQueryParams = defaultPaginatedQueryParam) =>
  async (dispatch: AppDispatch) => {
    return fetchPaginatedResults<BaseValidator>(
      address,
      VALIDATORS,
      params,
      dispatch,
      setValidatorValidators,
      setValidatorValidatorsError,
    );
  };
