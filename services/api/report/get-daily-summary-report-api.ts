import { CONSTANTS } from '../../config/api-config';
import { callGetAPI } from '../utils';

const DailySummaryReportApi = async (get_access_token: any, params: any) => {
  const urlParams: any = [];

  Object?.keys(params).forEach((key: any) => {
    urlParams.push(`${key}=${params[key]}`);
  });

  // Construct the URL based on the URL parameters
  let url: any = `${CONSTANTS.API_BASE_URL}/api/method/sj_antique.sdk.api?version=v1&method=get_daily_summary_report&entity=report&`;
  if (urlParams.length > 0) {
    url += `${urlParams.join('&')}`;
  }

  const response = await callGetAPI(url, get_access_token);
  return response;
};

export default DailySummaryReportApi;
