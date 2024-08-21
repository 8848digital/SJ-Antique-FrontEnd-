import axios from 'axios';
import { CONSTANTS, headerGenerator } from '../../config/api-config';
import { callGetAPI } from '../utils';

const getBBCategoryApi = async (get_access_token: any) => {
  let url: any = `${CONSTANTS.API_BASE_URL}/api/method/sj_antique.sdk.api?version=v1&method=get_bb_category&entity=bb_category`;

  const response = await callGetAPI(url, get_access_token);
  return response;
};

export default getBBCategoryApi;
