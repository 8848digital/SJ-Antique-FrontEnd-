import { CONSTANTS, headerGenerator } from '@/services/config/api-config';
import axios from 'axios';

const getDeliveryNoteListing = async (get_access_token: any) => {
  let response: any;
  const getHeaders = headerGenerator(get_access_token);
  console.log('inside api call');
  await axios
    .get(
      `${CONSTANTS.API_BASE_URL}/api/method/sj_antique.sdk.api?version=v1&method=get_listening_delivery_note&entity=delivery_note_api`,
      getHeaders
    )
    .then((res: any) => {
      console.log('get dn list', res);
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

export default getDeliveryNoteListing;
