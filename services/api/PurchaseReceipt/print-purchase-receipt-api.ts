import { CONSTANTS } from '@/services/config/api-config';
import axios from 'axios';

const PrintPurchaseReceiptApi = async (token: any, name: any) => {
  let response: any;
  const version = 'v1';
  const method = 'get_print_purchase_receipt';
  const entity = 'print_purchase_receipt';

  const params = `/api/method/sj_antique.sdk.api?version=${version}&method=${method}&entity=${entity}&name=${name}`;

  const config = {
    headers: {
      Authorization: token,
    },
  };

  await axios
    .get(`${CONSTANTS.API_BASE_URL}${params}`, config)
    .then((res: any) => {
      response = res.data.message;
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

export default PrintPurchaseReceiptApi;
