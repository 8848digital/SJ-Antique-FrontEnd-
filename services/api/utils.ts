import axios from 'axios';
import { headerGenerator } from '../config/api-config';
import { handleApiError } from './general/error-handler';

export const callGetAPI = async (url: string, token: any) => {
  let response: any;
  const getHeaders = headerGenerator(token);
  await axios
    .get(`${url}`, {
      ...getHeaders,
      timeout: 5000,
    })
    .then((res: any) => {
      response = res;
    })
    .catch((err: any) => {
      response = handleApiError(err);
    });

  return response;
};
