import { useRouter } from 'next/router';
import React from 'react';
import ItemStatusReport from './ItemStatusReport';
import useItemStatusReportHook from '@/hooks/Report/item-status-report-hook';

const ReportIndexPage = () => {
  const router = useRouter();
  const pathcontent = router?.asPath?.split('/');
  console.log(pathcontent, 'pathcontent index');
  const key = pathcontent[pathcontent?.length - 1];
  const {
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
    dailyStatusLoading,
  }: any = useItemStatusReportHook();
  return (
    <div>
      {key === 'itemStatusReport' && (
        <ItemStatusReport
          itemStatusReportState={itemStatusReportState}
          reportName={'Item Status Report'}
          voucherNumber={itemVoucherNumber}
          selectDropDownReset={selectDropDownReset}
          setSelectDropDownReset={setSelectDropDownReset}
          searchVoucherNum={searchVoucherNum}
          setSearchVoucherNum={setSearchVoucherNum}
          itemList={itemList}
          setSearchItem={setSearchItem}
          searchItem={searchItem}
          HandleSearchInput={HandleSearchInput}
          searchInputValues={searchInputValues}
          isLoading={isLoading}
          HandleRefresh={HandleRefresh}
        />
      )}
      {key === 'dailyQtyStatus' && (
        <ItemStatusReport
          itemStatusReportState={dailyQtyStatusReport}
          reportName={'Daily Quantity Status Report'}
          voucherNumber={dailyStatusVoucherNumber}
          setSearchItem={setSearchItem}
          searchItem={searchItem}
          selectDropDownReset={selectDropDownReset}
          setSelectDropDownReset={setSelectDropDownReset}
          itemList={itemList}
          HandleSearchInput={HandleSearchInput}
          searchInputValues={searchInputValues}
          isLoading={dailyStatusLoading}
        />
      )}
    </div>
  );
};

export default ReportIndexPage;
