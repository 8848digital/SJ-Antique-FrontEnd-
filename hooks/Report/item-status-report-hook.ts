import getItemStatusReportApi from '@/services/api/report/get-item-status-report-api';
import { get_access_token } from '@/store/slices/auth/login-slice';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const useItemStatusReportHook = () => {
  // access token
  const loginAcessToken = useSelector(get_access_token);
  const [itemStatusReportState, setItemStatusReportState] = useState<any>();
  useEffect(() => {
    const getStateData: any = async () => {
      const reportData: any = await getItemStatusReportApi(
        loginAcessToken.token
      );
      console.log(reportData, 'reportData Master');
      if (reportData?.data?.message?.status === 'success') {
        setItemStatusReportState(reportData?.data?.message?.data);
      }
    };
    getStateData();
  }, []);
  console.log(itemStatusReportState, 'item status report data');
  return {
    itemStatusReportState,
  };
};
export default useItemStatusReportHook;
