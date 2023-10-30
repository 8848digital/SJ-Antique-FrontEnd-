import axios from 'axios';
import { CONSTANTS, headerGenerator } from '../config/api-config';

const purchaseReceiptApi = async (get_access_token: any) => {
  let response: any;
  const getHeaders = headerGenerator(get_access_token);
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: get_access_token,
    },
  };
  const body = {};
  await axios
    .post(
      `${CONSTANTS.API_BASE_URL}/api/method/sj_antique.sdk.api?version=v1&method=create_purchase_receipt&entity=purchase_receipt`,
      body,
      getHeaders
    )
    .then((res: any) => {
      console.log('post purchase receipt', res);
      response = res?.data?.message?.data;
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

export default purchaseReceiptApi;
