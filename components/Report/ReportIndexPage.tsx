import useReportHook from '@/hooks/Report/item-status-report-hook';
import { useRouter } from 'next/router';
import CommonReport from './CommonReport/CommonReport';
import ItemStatusReport from './ItemStatusReport';

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
    clientNameData,
    karigarNameData,
    categoryData,
  }: any = useReportHook();
  return (
    <>
      {key === 'daily-qty-status' ? (
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
      ) : (
        <CommonReport
          reportData={reportData}
          isLoading={isLoading}
          searchInputValues={searchInputValues}
          handleSearchInput={HandleSearchInput}
          HandleSerachReport={HandleSerachReport}
          setSelectDropDownReset={setSelectDropDownReset}
          clientNameData={clientNameData}
          karigarNameData={karigarNameData}
          itemListData={itemList}
          categoryData={categoryData}
        />
      )}
    </>
  );
};

export default ReportIndexPage;
