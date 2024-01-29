import getItemListInSalesApi from '@/services/api/Sales/get-item-list-api';
import ReportApi from '@/services/api/report/get-report-data-api';
import { get_access_token } from '@/store/slices/auth/login-slice';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const useItemStatusReportHook = () => {
  // access token
  const loginAcessToken = useSelector(get_access_token);
  // filter states
  const [searchItem, setSearchItem] = useState<string>('');
  const [searchVoucherNum, setSearchVoucherNum] = useState<string>('');
  const [selectDropDownReset, setSelectDropDownReset] = useState<string>('');
  const [searchInputValues, setSearchInputValues] = useState({
    fromDate: '',
    toDate: '',
  });

  // report data states
  const [itemStatusReportState, setItemStatusReportState] = useState<any>();
  const [dailyQtyStatusReport, setDailyQtyStatusReport] = useState<any>();
  const [itemList, setItemList] = useState<any>();

  // loader state
  const [isLoading, setIsLoading] = useState<number>(0);

  const router = useRouter();

  const HandleRefresh = () => {
    router.reload();
  };
  const itemStatusReportParams = {
    version: 'v1',
    method: 'get_item_status_report',
    entity: 'report_item_status_api',
    name: searchItem === undefined ? '' : searchItem,
    voucher_no: searchVoucherNum === undefined ? '' : searchVoucherNum,
    from_date:
      searchInputValues.fromDate === undefined
        ? ''
        : searchInputValues.fromDate,
    to_date:
      searchInputValues.toDate === undefined ? '' : searchInputValues.toDate,
  };
  const dailyQtyStatusReportParams = {
    version: 'v1',
    method: 'get_daily_qty_status_report',
    entity: 'daily_qty_status',
    voucher_no: searchVoucherNum,
    from_date: searchInputValues.fromDate,
    to_date: searchInputValues.toDate,
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
      const itemListData: any = await getItemListInSalesApi(
        loginAcessToken.token
      );

      if (itemReportData?.data?.message?.status === 'success') {
        setItemStatusReportState(itemReportData?.data?.message?.data);
        if (itemReportData?.data?.message?.data?.length > 0) {
          setIsLoading(1);
        } else setIsLoading(2);
      }
      if (dailyQtyReportData?.data?.message?.status === 'success') {
        setDailyQtyStatusReport(dailyQtyReportData?.data?.message?.data);
        // if (dailyQtyReportData?.data?.message?.data?.length > 0) {
        //   setIsLoading(true);
        // }
      }
      if (itemListData?.data?.data?.length > 0) {
        setItemList(itemListData?.data?.data);
      }
    };
    getStateData();
  }, []);

  useEffect(() => {
    if (
      (searchItem !== '' &&
        searchItem !== undefined &&
        searchItem.length > 4) ||
      (searchVoucherNum !== undefined && searchVoucherNum.length > 16)
    ) {
      const itemReportDataFun = async () => {
        try {
          let itemReportApi = await ReportApi(
            loginAcessToken?.token,
            itemStatusReportParams
          );

          console.log('getItemCodeDetails api res', itemReportApi);
          if (itemReportApi?.data?.message?.status === 'success') {
            setItemStatusReportState(itemReportApi?.data?.message?.data);
            if (itemReportApi?.data?.message?.data?.length > 0) {
              setIsLoading(1);
            } else {
              setIsLoading(2);
            }
          }
        } catch (error) {
          console.error('Error fetching item status report:', error);
        }
      };
      itemReportDataFun();
    }
  }, [searchItem, searchInputValues, searchVoucherNum]);

  const itemVoucherNumber: any =
    itemStatusReportState?.length > 0 &&
    itemStatusReportState !== null &&
    itemStatusReportState.map((data: any) => ({
      karigar_name: data.voucher_no,
    }));

  const dailyStatusVoucherNumber: any =
    dailyQtyStatusReport?.length > 0 &&
    dailyQtyStatusReport !== null &&
    dailyQtyStatusReport.map((data: any) => ({
      karigar_name: data.voucher_no,
    }));
  console.log(searchItem, '@report selected item');

  const HandleSearchInput: any = (e: any) => {
    const { name, value } = e.target;
    setSearchInputValues({
      ...searchInputValues,
      [name]: value,
    });
  };

  return {
    itemStatusReportState,
    dailyQtyStatusReport,
    itemVoucherNumber,
    setSearchItem,
    searchItem,
    selectDropDownReset,
    setSelectDropDownReset,
    searchVoucherNum,
    setSearchVoucherNum,
    dailyStatusVoucherNumber,
    itemList,
    HandleSearchInput,
    searchInputValues,
    isLoading,
    HandleRefresh,
  };
};
export default useItemStatusReportHook;
