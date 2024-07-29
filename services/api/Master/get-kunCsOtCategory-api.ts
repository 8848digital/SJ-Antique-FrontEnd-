import { CONSTANTS } from '../../config/api-config';
import { callGetAPI } from '../utils';

const getKunCsOtCategoryApi = async (get_access_token: any) => {
  let url: any = `${CONSTANTS.API_BASE_URL}/api/method/sj_antique.sdk.api?version=v1&method=get_kun_cs_ot_category&entity=kun_cs_ot_category`;

  const response = await callGetAPI(url, get_access_token);
  return response;
};

export default getKunCsOtCategoryApi;
