import { CONSTANTS } from '@/services/config/api-config';
import axios from 'axios';

const GetDetailOfDeliveryNoteAPi = async (request: any) => {
  let response: any;
  const version = 'v1';
  const method = 'get_specific_delivery_note';
  const entity = 'sales';

  const params = `/api/method/sj_antique.sdk.api?version=${version}&method=${method}&entity=${entity}&name=${request.name}`;

  const config = {
    headers: {
      Authorization: request.token,
    },
  };

  await axios
    .get(`${CONSTANTS.API_BASE_URL}${params}`, config)
    .then((res: any) => {
      response = res;
    })
    .catch((err: any) => {
    });
  return response;
};

export default GetDetailOfDeliveryNoteAPi;
