import useItemStatusReportHook from '@/hooks/Report/item-status-report-hook';
import { useRouter } from 'next/router';
import CommonReport from './CommonReport/CommonReport';
import ItemStatusReport from './ItemStatusReport';
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
    isLoading,
    searchName,
    setSearchName,
    HandleReportPrint,
    HandleSerachReport,
    reportData,
    itemCodeSearchValues,
    handleSearchItemCodeReport,
    handleItemCodeSearchInput,
    clientNameData,
    karigarNameData,
  }: any = useItemStatusReportHook();
  return (
    <>
      {key === 'daily-qty-status' && (
        <ItemStatusReport
          itemStatusReportState={reportData}
          reportName={'Daily Report'}
          selectDropDownReset={selectDropDownReset}
          setSelectDropDownReset={setSelectDropDownReset}
          itemList={itemList}
          HandleSearchInput={HandleSearchInput}
          searchInputValues={searchInputValues}
          isLoading={isLoading}
          searchName={searchName}
          setSearchName={setSearchName}
          name={dailyStatusSearchName}
          HandleReportPrint={HandleReportPrint}
          HandleSerachReport={HandleSerachReport}
        />
      )}
      {(key === 'daily-summary-report' ||
        key === 'karigar-wise-report' ||
        key === 'customer-wise-report' ||
        key === 'item-wise-report' ||
        key === 'summary-report') && (
        <CommonReport
          reportData={reportData}
          isLoading={isLoading}
          searchInputValues={searchInputValues}
          handleSearchInput={HandleSearchInput}
          handleSearchReport={HandleSerachReport}
          setSelectDropDownReset={setSelectDropDownReset}
          clientNameData={clientNameData}
          karigarNameData={karigarNameData}
        />
      )}
      {key === 'product-code' && (
        <ProductCodeReport
          reportData={reportData}
          reportName={'Product Code Report'}
          HandleItemCodeSearchInput={handleItemCodeSearchInput}
          isLoading={isLoading}
          searchName={searchName}
          setSearchName={setSearchName}
          name={dailyStatusSearchName}
          HandleReportPrint={HandleReportPrint}
          itemCodeSearchValues={itemCodeSearchValues}
          searchInputValues={handleSearchItemCodeReport}
        />
      )}
    </>
  );
};

export default ReportIndexPage;
