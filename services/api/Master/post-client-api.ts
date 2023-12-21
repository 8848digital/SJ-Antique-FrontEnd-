import axios from 'axios';
import { CONSTANTS, headerGenerator } from '../../config/api-config';

const postClientApi = async (get_access_token: any, val: any) => {
  let response: any;
  const getHeaders = headerGenerator(get_access_token);
  console.log(getHeaders, 'getHeaders');
  await axios
    .post(
      `${CONSTANTS.API_BASE_URL}/api/method/sj_antique.sdk.api?version=v1&method=create_material&entity=material_post_api`,
      val,
      getHeaders
    )
    .then((res: any) => {
      console.log('post client', res);
      response = res?.data?.message;
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

export default postClientApi;
