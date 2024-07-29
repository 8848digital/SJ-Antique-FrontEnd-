import { CONSTANTS } from '../../config/api-config';
import { callGetAPI } from '../utils';

const KarigarWiseReportApi = async (get_access_token: any, params: any) => {
  const urlParams: any = [];

  Object?.keys(params).forEach((key: any) => {
    urlParams.push(`${key}=${params[key]}`);
  });

  // Construct the URL based on the URL parameters
  let url: any = `${CONSTANTS.API_BASE_URL}/api/method/sj_antique.sdk.api?version=v1&method=get_karigar_wise_report&entity=report&`;
  if (urlParams.length > 0) {
    url += `${urlParams.join('&')}`;
  }

  // let url: any = `/api/method/sj_antique.sdk.api?version=${params?.version}&method=${params?.method}&entity=${params?.entity}&name=${params?.name}&voucher_no=${params?.voucher_no}&from_date=${params?.from_date}&to_date=${params?.to_date}`;

  const response = await callGetAPI(url, get_access_token);
  return response;
};

export default KarigarWiseReportApi;
