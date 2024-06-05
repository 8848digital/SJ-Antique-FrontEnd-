import axios from 'axios';
import { CONSTANTS, headerGenerator } from '../../config/api-config';

const ProductCodeReportApi = async (get_access_token: any) => {
  let response: any;
  const getHeaders = headerGenerator(get_access_token);

  // Construct the URL based on the URL parameters
  let url: any = '/api/method/sj_antique.sdk.api?version=v1&method=product_code_report&entity=report';

  // let url: any = `/api/method/sj_antique.sdk.api?version=${params?.version}&method=${params?.method}&entity=${params?.entity}&name=${params?.name}&voucher_no=${params?.voucher_no}&from_date=${params?.from_date}&to_date=${params?.to_date}`;

  await axios
    .get(`${CONSTANTS.API_BASE_URL}${url}`, getHeaders)
    .then((res: any) => {
      response = res;
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

export default ProductCodeReportApi;
