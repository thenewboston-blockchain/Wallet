import axios, {AxiosResponse} from 'axios';

const AXIOS_TIMEOUT_MS = 10_000;

export type {AxiosResponse};

export default axios.create({
  timeout: AXIOS_TIMEOUT_MS,
});
