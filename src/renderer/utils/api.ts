import {formatQueryParams} from 'renderer/utils/address';
import axios from 'renderer/utils/axios';
import {SetError, SetResults} from 'renderer/utils/store';
import {
  AppDispatch,
  BankConfig,
  PaginatedQueryParams,
  PaginatedResults,
  PrimaryValidatorConfig,
  RawBankConfig,
  RawPrimaryValidatorConfig,
} from 'shared/types';

export async function fetchPaginatedResults<T>(
  address: string,
  urlParam: string,
  queryParams: PaginatedQueryParams,
  dispatch: AppDispatch,
  setResults: SetResults<T>,
  setError: SetError,
) {
  try {
    const {data: rawData} = await axios.get<PaginatedResults<T>>(
      `${address}/${urlParam}${formatQueryParams(queryParams)}`,
    );

    const data: PaginatedResults<T> = {
      ...rawData,
      results: rawData.results.map((result: any) => {
        if (!result.port) {
          return {
            ...result,
            port: replaceNullPortFieldWithDefaultValue(result.port),
          };
        }
        return result;
      }),
    };

    dispatch(setResults({address, ...data}));
    return data.results;
  } catch (error: any) {
    if (!error.response) {
      throw error;
    }
    dispatch(setError({address, error: error.response.data}));
    return;
  }
}

const replaceNullPortFieldWithDefaultValue = (port: number | null): number => {
  if (port === null) {
    return 80;
  }
  return port;
};

export const sanitizePortFieldFromRawBankConfig = (data: RawBankConfig): BankConfig => {
  return {
    ...data,
    port: replaceNullPortFieldWithDefaultValue(data.port),
    primary_validator: sanitizePortFieldFromRawPrimaryValidatorConfig(data.primary_validator),
  };
};

export const sanitizePortFieldFromRawPrimaryValidatorConfig = (
  data: RawPrimaryValidatorConfig,
): PrimaryValidatorConfig => {
  return {
    ...data,
    port: replaceNullPortFieldWithDefaultValue(data.port),
  };
};
