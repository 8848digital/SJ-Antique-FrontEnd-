import axios from 'axios';
import { CONSTANTS, headerGenerator } from '../config/api-config';

const postUploadFile = async (get_access_token: any, val: any) => {
  let response: any;
  const getHeaders = headerGenerator(get_access_token);
  const bodyFormData: any = new FormData();
  bodyFormData.append('file', val);
  await axios
    .post(
      `${CONSTANTS.API_BASE_URL}/api/method/upload_file`,
      bodyFormData,
      getHeaders
    )
    .then((res: any) => {
      console.log('post material', res);
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

export default postUploadFile;