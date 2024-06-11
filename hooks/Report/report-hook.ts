import getItemListInSalesApi from '@/services/api/Sales/get-item-list-api';
import CustomerWiseReportApi from '@/services/api/report/get-customer-wise-report-api';
import DailyStatusReportApi from '@/services/api/report/get-daily-status-report-data-api';
import DailySummaryReportApi from '@/services/api/report/get-daily-summary-report-api';
import ItemWiseReportApi from '@/services/api/report/get-item-wise-report-api';
import KarigarWiseReportApi from '@/services/api/report/get-karigar-wise-report-api';
import ProductCodeReportApi from '@/services/api/report/get-product-code-report';
import { readyStockSummaryApi0_20, readyStockSummaryApi100_150, readyStockSummaryApi20_50, readyStockSummaryApi50_100 } from '@/services/api/report/get-ready-stock-summary-report-api';
import summaryReport from '@/services/api/report/get-summary-report-api';
import ReportPrintApi from '@/services/api/report/report-print-api';
import { get_client_name_data } from '@/store/slices/Master/get-client-name-slice';
import { get_sub_category_data } from '@/store/slices/Master/get-sub-category-slice';
import { get_karigar_name_data } from '@/store/slices/Master/karigar-name-slice';
import { get_access_token } from '@/store/slices/auth/login-slice';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const useReportHook = () => {
  const router = useRouter();
  const { query } = useRouter();

  // access token
  const loginAccessToken: any = useSelector(get_access_token);
  // filter states
  const [searchItem, setSearchItem] = useState<string>('');
  const [searchVoucherNum, setSearchVoucherNum] = useState<string>('');
  const [searchName, setSearchName] = useState('');
  const [selectDropDownReset, setSelectDropDownReset] = useState<string>('');
  const todayDate: any = new Date()?.toISOString()?.split('T')[0];

  const [searchInputValues, setSearchInputValues] = useState({
    Client_Name: '',
    Karigar_Name: '',
    product_code: '',
    Category: '',
    Sub_Category: '',
    from_date: query?.reportId === 'daily-qty-status' ? todayDate : '',
    to_date: query?.reportId === 'daily-qty-status' ? todayDate : '',
  });
  const [itemCodeSearchValues, setItemCodeSearchValues] = useState<any>({
    name: '',
    karigar: '',
  });

  // report data states
  const [reportData, setReportData] = useState<any>([]);
  const [readyStockSummaryReportData, setReadyStockSummaryReportData] = useState<any>({
    zeroToTwenty: [],
    twentyToFifty: [],
    fiftyToHundred: [],
    hundredToOnefifty: []
  });
  const clientNameData = useSelector(get_client_name_data).data
  let karigarNameData = useSelector(get_karigar_name_data).data
  const categoryData = useSelector(get_sub_category_data).data

  const [itemList, setItemList] = useState<any>();

  // loader state
  const [isLoading, setIsLoading] = useState<number>(0);

  const HandleRefresh = () => {
    router.reload();
  };
  // API Params
  const dailyQtyStatusReportParams = {
    from_date: searchInputValues.from_date,
    to_date: searchInputValues.to_date,
  };
  const dailySummaryReportParams = {
    from_date: searchInputValues.from_date,
    to_date: searchInputValues.to_date,
  };
  const customerReportParams = {
    client_name: searchInputValues.Client_Name,
    from_date: searchInputValues.from_date,
    to_date: searchInputValues.to_date,
  };
  const karigarReportParams = {
    karigar_name: searchInputValues.Karigar_Name,
    from_date: searchInputValues.from_date,
    to_date: searchInputValues.to_date,
  };
  const itemReportParams = {
    category: searchInputValues.Category,
    sub_category: searchInputValues.Sub_Category,
    from_date: searchInputValues.from_date,
    to_date: searchInputValues.to_date,
  };
  const summaryReportParams = {
    category: searchInputValues.Category,
    from_date: searchInputValues.from_date,
    to_date: searchInputValues.to_date,
  };
  const readySummaryReportParams = {
    from_date: searchInputValues.from_date,
    to_date: searchInputValues.to_date,
    category: searchInputValues.Category,
    sub_category: searchInputValues.Sub_Category,
  };
  const productCodeParams = {
    name: searchInputValues.product_code,
    from_date: searchInputValues.from_date,
    to_date: searchInputValues.to_date,
    custom_karigar: searchInputValues.Karigar_Name,
    custom_category: searchInputValues.Category
  };
  const getStateData = async () => {
    let reportData;
    if (query?.reportId === 'daily-qty-status') {
      reportData = await DailyStatusReportApi(
        loginAccessToken.token,
        dailyQtyStatusReportParams
      );
    } else if (query?.reportId === 'product-code') {
      reportData = await ProductCodeReportApi(
        loginAccessToken.token,
        productCodeParams
      );
      const itemListData = await getItemListInSalesApi(loginAccessToken.token);
      if (itemListData?.data?.data?.length > 0) {
        let itemList: any = itemListData?.data?.data.map(
          (items: any) => items.name
        );
        setItemList(itemList);
      }
    } else if (query?.reportId === 'daily-summary-report') {
      reportData = await DailySummaryReportApi(
        loginAccessToken.token,
        dailySummaryReportParams
      );
    } else if (query?.reportId === 'customer-wise-report') {
      reportData = await CustomerWiseReportApi(
        loginAccessToken.token,
        customerReportParams
      );
    } else if (query?.reportId === 'karigar-wise-report') {
      reportData = await KarigarWiseReportApi(
        loginAccessToken.token,
        karigarReportParams
      );

    } else if (query?.reportId === 'item-wise-report') {
      reportData = await ItemWiseReportApi(
        loginAccessToken.token,
        itemReportParams
      );
    } else if (query?.reportId === 'summary-report') {
      reportData = await summaryReport(
        loginAccessToken.token,
        summaryReportParams
      );
    }
    else if (query?.reportId === "ready-stock-summary-report") {
      fetchReadyStockSummaryReportData()
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

  const fetchReadyStockSummaryReportData = async () => {
    try {
      const [readyStockData1, readyStockData2, readyStockData3, readyStockData4] = await Promise.all([
        readyStockSummaryApi0_20(loginAccessToken.token, readySummaryReportParams),
        readyStockSummaryApi20_50(loginAccessToken.token, readySummaryReportParams),
        readyStockSummaryApi50_100(loginAccessToken.token, readySummaryReportParams),
        readyStockSummaryApi100_150(loginAccessToken.token, readySummaryReportParams)
      ]);
      setReadyStockSummaryReportData({
        zeroToTwenty: readyStockData1?.data?.message?.status === "success" ? readyStockData1?.data?.message?.data : [],
        twentyToFifty: readyStockData2?.data?.message?.status === "success" ? readyStockData2?.data?.message?.data : [],
        fiftyToHundred: readyStockData3?.data?.message?.status === "success" ? readyStockData3?.data?.message?.data : [],
        hundredToOnefifty: readyStockData4?.data?.message?.status === "success" ? readyStockData4?.data?.message?.data : []
      });
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      await getStateData();
      setSearchInputValues({
        Client_Name: '',
        Karigar_Name: '',
        product_code: '',
        Category: '',
        Sub_Category: '',
        from_date: query?.reportId === 'daily-qty-status' ? todayDate : '',
        to_date: query?.reportId === 'daily-qty-status' ? todayDate : '',
      });
    };
    fetchData();
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
  const HandleSearchInput: any = (value: any, fieldName: any) => {
    setSearchInputValues((prevState: any) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };
  const handleItemCodeSearchInput: any = (e: any) => {
    const { name, value } = e.target;
    setItemCodeSearchValues({
      ...itemCodeSearchValues,
      [name]: value,
    });
  };

  const HandleSerachReport = async () => {
    getStateData();
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
    searchName,
    setSearchName,
    HandleReportPrint,
    HandleSerachReport,
    reportData,
    itemCodeSearchValues,
    setItemCodeSearchValues,
    handleItemCodeSearchInput,
    clientNameData,
    karigarNameData,
    categoryData,
    readyStockSummaryReportData
  };
};
export default useReportHook;
