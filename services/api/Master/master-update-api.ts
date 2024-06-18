import { CONSTANTS, headerGenerator } from '@/services/config/api-config';
import axios from 'axios';

const MasterUpdateApi: any = async (
  token: any,
  body:any,
) => {
  let response: any;
  const getHeaders = headerGenerator(token);
  await axios
    .put(`${CONSTANTS.API_BASE_URL}/api/method/sj_antique.sdk.api`, body, getHeaders)
    .then((res: any) => {
      response = res;
      console.log(response,'response')
    })
    .catch((err: any) => {
      if (err.code === 'ECONNABORTED') {
        response = 'Request timed out';
      } else if (err.code === 'ERR_BAD_REQUEST') {
        response = 'Bad Request';
      } else if (err.code === 'ERR_INVALID_URL') {
        response = 'Invalid URL';
      } else {
        response = err;
      }
    });
  return response;
};

export default MasterUpdateApi;
