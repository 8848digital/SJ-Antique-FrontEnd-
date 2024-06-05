import { useRouter } from 'next/router';
import React from 'react';
import ItemStatusReport from './ItemStatusReport';
import useItemStatusReportHook from '@/hooks/Report/item-status-report-hook';
import ReportHeader from '../Header/ReportHeader';
import ProductCodeReport from './ProductCodeReport/ProductCodeReport';

const ReportIndexPage = () => {
  const router = useRouter();
  const pathcontent = router?.asPath?.split('/');
  const key = pathcontent[pathcontent?.length - 1];
  const {
    selectDropDownReset,
    setSelectDropDownReset,
    dailyStatusSearchName,
    itemList,
    HandleSearchInput,
    searchInputValues,
    dailyStatusLoading,
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
    handleSearchItemCodeReport,
    handleItemCodeSearchInput,
  }: any = useItemStatusReportHook();
  return (
    <div className="">
      {key === 'daily-qty-status' && (
        <ItemStatusReport
          itemStatusReportState={reportData}
          reportName={'Daily Report'}
          selectDropDownReset={selectDropDownReset}
          setSelectDropDownReset={setSelectDropDownReset}
          itemList={itemList}
          HandleSearchInput={HandleSearchInput}
          searchInputValues={searchInputValues}
          isLoading={dailyStatusLoading}
          scrollableTableRef={scrollableTableRef}
          handleMouseDown={handleMouseDown}
          handleMouseUp={handleMouseUp}
          handleMouseLeave={handleMouseLeave}
          handleMouseMove={handleMouseMove}
          searchName={searchName}
          setSearchName={setSearchName}
          name={dailyStatusSearchName}
          HandleReportPrint={HandleReportPrint}
          HandleSerachReport={HandleSerachReport}
        />
      )}
      {key === 'daily-summary-report' && (
        <ItemStatusReport
          itemStatusReportState={reportData}
          reportName={'Daily Report'}
          selectDropDownReset={selectDropDownReset}
          setSelectDropDownReset={setSelectDropDownReset}
          itemList={itemList}
          HandleSearchInput={HandleSearchInput}
          searchInputValues={searchInputValues}
          isLoading={dailyStatusLoading}
          scrollableTableRef={scrollableTableRef}
          handleMouseDown={handleMouseDown}
          handleMouseUp={handleMouseUp}
          handleMouseLeave={handleMouseLeave}
          handleMouseMove={handleMouseMove}
          searchName={searchName}
          setSearchName={setSearchName}
          name={dailyStatusSearchName}
          HandleReportPrint={HandleReportPrint}
          HandleSerachReport={HandleSerachReport}
        />
      )}
      {key === 'karigar-wise-report' && (
        <ItemStatusReport
          itemStatusReportState={reportData}
          reportName={'Daily Report'}
          selectDropDownReset={selectDropDownReset}
          setSelectDropDownReset={setSelectDropDownReset}
          itemList={itemList}
          HandleSearchInput={HandleSearchInput}
          searchInputValues={searchInputValues}
          isLoading={dailyStatusLoading}
          scrollableTableRef={scrollableTableRef}
          handleMouseDown={handleMouseDown}
          handleMouseUp={handleMouseUp}
          handleMouseLeave={handleMouseLeave}
          handleMouseMove={handleMouseMove}
          searchName={searchName}
          setSearchName={setSearchName}
          name={dailyStatusSearchName}
          HandleReportPrint={HandleReportPrint}
          HandleSerachReport={HandleSerachReport}
        />
      )}
      {key === 'customer-wise-report' && (
        <ItemStatusReport
          itemStatusReportState={reportData}
          reportName={'Daily Report'}
          selectDropDownReset={selectDropDownReset}
          setSelectDropDownReset={setSelectDropDownReset}
          itemList={itemList}
          HandleSearchInput={HandleSearchInput}
          searchInputValues={searchInputValues}
          isLoading={dailyStatusLoading}
          scrollableTableRef={scrollableTableRef}
          handleMouseDown={handleMouseDown}
          handleMouseUp={handleMouseUp}
          handleMouseLeave={handleMouseLeave}
          handleMouseMove={handleMouseMove}
          searchName={searchName}
          setSearchName={setSearchName}
          name={dailyStatusSearchName}
          HandleReportPrint={HandleReportPrint}
          HandleSerachReport={HandleSerachReport}
        />
      )}
      {key === 'item-wise-report' && (
        <ItemStatusReport
          itemStatusReportState={reportData}
          reportName={'Daily Report'}
          selectDropDownReset={selectDropDownReset}
          setSelectDropDownReset={setSelectDropDownReset}
          itemList={itemList}
          HandleSearchInput={HandleSearchInput}
          searchInputValues={searchInputValues}
          isLoading={dailyStatusLoading}
          scrollableTableRef={scrollableTableRef}
          handleMouseDown={handleMouseDown}
          handleMouseUp={handleMouseUp}
          handleMouseLeave={handleMouseLeave}
          handleMouseMove={handleMouseMove}
          searchName={searchName}
          setSearchName={setSearchName}
          name={dailyStatusSearchName}
          HandleReportPrint={HandleReportPrint}
          HandleSerachReport={HandleSerachReport}
        />
      )}
      {key === 'product-code' && (
        <ProductCodeReport
          reportData={reportData}
          reportName={'Product Code Report'}
          HandleItemCodeSearchInput={handleItemCodeSearchInput}
          isLoading={dailyStatusLoading}
          scrollableTableRef={scrollableTableRef}
          handleMouseDown={handleMouseDown}
          handleMouseUp={handleMouseUp}
          handleMouseLeave={handleMouseLeave}
          handleMouseMove={handleMouseMove}
          searchName={searchName}
          setSearchName={setSearchName}
          name={dailyStatusSearchName}
          HandleReportPrint={HandleReportPrint}
          itemCodeSearchValues={itemCodeSearchValues}
          searchInputValues={handleSearchItemCodeReport}
        />
      )}
    </div>
  );
};

export default ReportIndexPage;
