import ReportApi from '@/services/api/report/get-report-data-api';
import { get_access_token } from '@/store/slices/auth/login-slice';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const useItemStatusReportHook = () => {
  // access token
  const loginAcessToken = useSelector(get_access_token);
  const [itemStatusReportState, setItemStatusReportState] = useState<any>();
  const [dailyQtyStatusReport, setDailyQtyStatusReport] = useState<any>();
  const itemStatusReportParams = {
    version: 'v1',
    method: 'get_item_status_report',
    entity: 'report_item_status_api',
    // name: 'DOC-7',
  };
  const dailyQtyStatusReportParams = {
    version: 'v1',
    method: 'get_daily_qty_status_report',
    entity: 'daily_qty_status',
    // name: 'CON',
  };
  useEffect(() => {
    const getStateData: any = async () => {
      const itemReportData: any = await ReportApi(
        loginAcessToken.token,
        itemStatusReportParams
      );
      const dailyQtyReportData: any = await ReportApi(
        loginAcessToken.token,
        dailyQtyStatusReportParams
      );
      console.log(itemReportData, 'itemReportData Master');
      if (itemReportData?.data?.message?.status === 'success') {
        setItemStatusReportState(itemReportData?.data?.message?.data);
      }
      if (dailyQtyReportData?.data?.message?.status === 'success') {
        setDailyQtyStatusReport(dailyQtyReportData?.data?.message?.data);
      }
    };
    getStateData();
  }, []);
  console.log(itemStatusReportState, 'item status report data');
  return {
    itemStatusReportState,
    dailyQtyStatusReport,
  };
};
export default useItemStatusReportHook;
