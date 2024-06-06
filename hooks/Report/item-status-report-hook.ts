import getItemListInSalesApi from '@/services/api/Sales/get-item-list-api';
// import ReportApi from '@/services/api/report/get-daily-status-report-data-api';
import DailyStatusReportApi from '@/services/api/report/get-daily-status-report-data-api';
import ProductCodeReportApi from '@/services/api/report/get-product-code-report';
import ReportPrintApi from '@/services/api/report/report-print-api';
import { get_access_token } from '@/store/slices/auth/login-slice';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import UseScrollbarHook from './report-table-scrollbar-hook';
import CustomerWiseReportApi from '@/services/api/report/get-customer-wise-report-api';
import DailySummaryReportApi from '@/services/api/report/get-daily-summary-report-api';
import KarigarWiseReportApi from '@/services/api/report/get-karigar-wise-report-api';
import ItemWiseReportApi from '@/services/api/report/get-item-wise-report-api';
import summaryReport from '@/services/api/report/get-summary-report-api';

const useItemStatusReportHook = () => {
  const {
    scrollableTableRef,
    handleMouseDown,
    handleMouseUp,
    handleMouseLeave,
    handleMouseMove,
  }: any = UseScrollbarHook();

  // access token
  const loginAccessToken: any = useSelector(get_access_token);
  // filter states
  const [searchItem, setSearchItem] = useState<string>('');
  const [searchVoucherNum, setSearchVoucherNum] = useState<string>('');
  const [searchName, setSearchName] = useState('');
  const [selectDropDownReset, setSelectDropDownReset] = useState<string>('');
  const todayDate: any = new Date()?.toISOString()?.split('T')[0];

  const [searchInputValues, setSearchInputValues] = useState({
    Item_Name: '',
    Client_Name:'',
    Karigar_Name:'',
    Category:'',
    Sub_Category:'',
    from_date: todayDate,
    to_date: todayDate,
  });

  const [itemCodeSearchValues, setItemCodeSearchValues] = useState<any>({
    name: '',
    karigar: '',
  });

  // report data states
  const [reportData, setReportData] = useState<any>([]);
  const [itemList, setItemList] = useState<any>();

  // loader state
  const [isLoading, setIsLoading] = useState<number>(0);

  const router = useRouter();
  const { query } = useRouter();

  const HandleRefresh = () => {
    router.reload();
  };
  // API Params
  const dailyQtyStatusReportParams = {
    from_date: searchInputValues.from_date,
    to_date: searchInputValues.to_date,
  };
  const dailySummaryReportParams = {
    from_date: '',
    to_date: ''
  };
  const customerReportParams = {
    client_name: searchInputValues.Client_Name,
    from_date: '',
    to_date: ''
  };
  const karigarReportParams = {
    karigar_name:'',
    from_date: '',
    to_date: ''
  }
  const itemReportParams = {
    category:'',
    sub_category:'',
    from_date: '',
    to_date: ''
  }
  const summaryReportParams = {
    category:'',
    from_date: '',
    to_date: ''
  }
  const getStateData = async () => {
    let reportData;
    if (query?.reportId === 'daily-qty-status') {
      reportData = await DailyStatusReportApi(
        loginAccessToken.token,
        dailyQtyStatusReportParams
      );
    } else if (query?.reportId === 'product-code') {
      reportData = await ProductCodeReportApi(loginAccessToken.token);
      const itemListData = await getItemListInSalesApi(loginAccessToken.token);
    if (itemListData?.data?.data?.length > 0) {
      setItemList(itemListData?.data?.data);
    }
    }
    else if (query?.reportId === 'daily-summary-report') {
      reportData = await DailySummaryReportApi(
        loginAccessToken.token,
        dailySummaryReportParams
      );
    }
    else if (query?.reportId === 'customer-wise-report') {
      reportData = await CustomerWiseReportApi(
        loginAccessToken.token,
        customerReportParams
      );
    }
    else if (query?.reportId === 'karigar-wise-report') {
      reportData = await KarigarWiseReportApi(
        loginAccessToken.token,
        karigarReportParams
      );
    }
    else if (query?.reportId === 'item-wise-report') {
      reportData = await ItemWiseReportApi(
        loginAccessToken.token,
        itemReportParams
      );
    }
    else if (query?.reportId === 'summary-report') {
      reportData = await summaryReport(
        loginAccessToken.token,
        summaryReportParams
      );
    }

    if (reportData?.data?.message?.status === 'success') {
      setReportData(reportData?.data?.message?.data);
      if (reportData?.data?.message?.data?.length > 0) {
        setIsLoading(1);
      } else {
        setIsLoading(2);
      }
    }

    
  };
  useEffect(() => {
    getStateData();
  }, [query]);
  const dailyStatusSearchName: any =
    reportData?.length > 0 &&
    reportData !== null &&
    reportData.map((data: any) => ({
      karigar_name: data.name,
    }));

  const HandleReportPrint: any = async () => {
    const reqParams: any = {
      version: 'v1',
      method: 'print_report_daily_qty_status',
      entity: 'report',
      from_date: searchInputValues.from_date,
      to_date: searchInputValues.to_date,
    };

    let reportPrintApi: any = await ReportPrintApi(reqParams);

    if (reportPrintApi?.data?.message?.status === 'success') {
      window.open(reportPrintApi?.data?.message?.data?.print_url);
    } else if (reportPrintApi?.status === 'error') {
      toast.error(reportPrintApi?.message);
    }
  };
  const HandleSearchInput: any = (e: any) => {
    const { name, value } = e.target;
    setSearchInputValues({
      ...searchInputValues,
      [name]: value,
    });
  };
  const handleItemCodeSearchInput: any = (e: any) => {
    const { name, value } = e.target;
    setItemCodeSearchValues({
      ...itemCodeSearchValues,
      [name]: value,
    });
  };

  const handleSearchItemCodeReport: any = () => {};

  const HandleSerachReport = async () => {
    getStateData()
    
  };

  return {
    setSearchItem,
    searchItem,
    selectDropDownReset,
    setSelectDropDownReset,
    searchVoucherNum,
    setSearchVoucherNum,
    dailyStatusSearchName,
    itemList,
    HandleSearchInput,
    searchInputValues,
    HandleRefresh,
    isLoading,
    scrollableTableRef,
    handleMouseDown,
    handleMouseUp,
    handleMouseLeave,
    handleMouseMove,
    searchName,
    setSearchName,
    HandleReportPrint,
    HandleSerachReport,
    reportData,
    itemCodeSearchValues,
    setItemCodeSearchValues,
    handleItemCodeSearchInput,
    handleSearchItemCodeReport,
  };
};
export default useItemStatusReportHook;
