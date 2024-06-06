import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from '../../../styles/readyReceipts.module.css';
import styled from '../../../styles/report.module.css';
import ReportHeader from '../../Header/ReportHeader';
import LoadMoreTableDataInMaster from '../../Master/LoadMoreTableDataInMaster';
import Loader from '../../NoRecord/Loader';
import NoRecord from '../../NoRecord/NoRecord';
import CommonFilters from './CommonFilters';

const CommonReport = ({
  isLoading,
  reportData,
  searchInputValues,
  handleSearchInput,
  HandleSerachReport,
  clientNameData,
  karigarNameData,
}: any) => {
  const [tableViewData, setTableViewData] = useState<any>(20);

  const HandleTableViewRows: any = (data: any) => {
    if (data !== 5) {
      setTableViewData(data);
    }
  };
  const headers =
    reportData.length > 0 && reportData[0] ? Object.keys(reportData[0]) : [];
  return (
    <div className="container-lg">
      <ReportHeader />
      <CommonFilters
        searchInputValues={searchInputValues}
        handleSearchInput={handleSearchInput}
        handleSearchBtn={HandleSerachReport}
        clientNameData={clientNameData}
        karigarNameData={karigarNameData}
      />
      {isLoading === 0 && <Loader />}
      {isLoading === 2 && (
        <NoRecord
          title={`No Record Found `}
          heading=""
        />
      )}

      {isLoading === 1 && (
        <>
          <div className="text-end pe-3 p-0 text-gray small report-heading ">
            {reportData?.length > 0 && (
              <>
                {reportData?.slice(0, tableViewData)?.length} of{' '}
                {reportData?.length < 10
                  ? '0' + reportData?.length
                  : reportData?.length}
              </>
            )}
          </div>
          <div className="row justify-content-center">
            <div
              className={`col table-responsie m-auto ${styled.table_container}`}
            >
              <table className="table table-hover table-striped cursor ">
                <thead className="sticky-top">
                  <tr className="row justify-content-center ">
                    <th scope="col" className="thead col-1 ">
                      Sr. No.
                    </th>
                    {headers?.map((header: string, index: number) => (
                      <th
                        key={index}
                        scope="col"
                        className={`thead ${
                          headers?.length <= 4 ? 'col-2' : 'col'
                        }`}
                      >
                        {header.replace('_', ' ')}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {reportData?.length > 0 &&
                    reportData
                      .slice(0, tableViewData)
                      .map((data: any, index: any) => {
                        return (
                          <tr
                            key={index}
                            className={`row justify-content-center text-center ${styles.table_row} `}
                          >
                            <td
                              scope="col"
                              className="col-1 table_row py-1 py-auto"
                            >
                              {index + 1}
                            </td>
                            {headers.map((header, idx) => (
                              <td
                                key={idx}
                                scope="col"
                                className={`table_row py-1 py-auto ${
                                  headers?.length <= 4 ? 'col-2' : 'col'
                                }`}
                              >
                                {data[header]}
                              </td>
                            ))}
                          </tr>
                        );
                      })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
      <div className="row">
        <div className="col-9 px-0 mx-auto">
          {reportData?.length > 20 && reportData !== null && (
            <LoadMoreTableDataInMaster
              HandleTableViewRows={HandleTableViewRows}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CommonReport;
