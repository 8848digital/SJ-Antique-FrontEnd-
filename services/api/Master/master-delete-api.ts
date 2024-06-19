import { CONSTANTS, headerGenerator } from '@/services/config/api-config';
import axios from 'axios';

const MasterDeleteApi = async (
  token: any,
  doctype:any,
  name:any
) => {
    console.log(token,doctype,name)
  let response: any;
  const headers = headerGenerator(token)

  await axios
    .delete(`${CONSTANTS.API_BASE_URL}/api/resource/${doctype}/${name}`, headers)
    .then((res: any) => {
      response = res;
    })
    .catch((err: any) => {
        response= err
    });
  return response;
};

export default MasterDeleteApi;
