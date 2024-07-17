import { useRouter } from 'next/router';
import ReportHeader from '../../Header/ReportHeader';
import Loader from '../../General/Loader';
import NoRecord from '../../General/NoRecord';
import CommonFilters from './CommonFilters';
import ReportListingTable from './ReportListingTable';

const CommonReport = ({
  isLoading,
  reportData,
  searchInputValues,
  handleSearchInput,
  HandleSerachReport,
  clientNameData,
  karigarNameData,
  itemListData,
  categoryData,
  handleReportPrint,
}: any) => {
  const { query } = useRouter();

  const headers =
    reportData.length > 0 && reportData[0] ? Object.keys(reportData[0]) : [];

  return (
    <div className="container-lg">
      <ReportHeader />
      {query?.reportId === 'daily-qty-status' && (
        <div className="d-flex justify-content-end ">
          <button
            className="btn btn-outline-primary py-0 px-3"
            onClick={handleReportPrint}
          >
            Print
          </button>
        </div>
      )}
      <CommonFilters
        searchInputValues={searchInputValues}
        handleSearchInput={handleSearchInput}
        handleSearchBtn={HandleSerachReport}
        clientNameData={clientNameData}
        karigarNameData={karigarNameData}
        itemListData={itemListData}
        categoryData={categoryData}
      />
      {isLoading === 0 && <Loader />}
      {isLoading === 2 && <NoRecord title={`No Record Found `} heading="" />}

      {isLoading === 1 && (
        <>
          <div
            className={`p-0 text-gray small text-end ${
              headers?.length <= 4 ? 'report-heading pe-3' : ''
            }`}
          ></div>
          <ReportListingTable headers={headers} reportData={reportData} />
        </>
      )}
      <div className="row">
        <div
          className={`px-0 mx-auto ${headers?.length <= 4 ? 'col-9' : 'col'}`}
        ></div>
      </div>
    </div>
  );
};

export default CommonReport;
