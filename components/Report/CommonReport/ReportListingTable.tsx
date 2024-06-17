import React from 'react';
import styled from '../../../styles/report.module.css';

const ReportListingTable = ({ headers, reportData, tableViewData }: any) => {
  console.log('report data', reportData, headers);
  return (
    <div className="row justify-content-center">
      <div className={`col table-responsie m-auto ${styled.table_container}`}>
        <table className="table table-hover table-striped cursor ">
          <thead className="sticky-top">
            <tr className="row row-cols-7 justify-content-center">
              <th scope="col" className="thead col-1">
                Sr. No.
              </th>
              {headers?.map((header: string, index: number) => (
                <th
                  key={index}
                  scope="col"
                  className={`thead ${headers?.length <= 4 ? 'col-2' : 'col'}`}
                >
                  {header?.charAt(0)?.toUpperCase() +
                    header?.slice(1)?.replace('_', ' ')}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {reportData
              .slice(0, -1) // Excludes the last row
              .slice(0, tableViewData) // Still consider tableViewData limit
              .map((data: any, index: any) => {
                const firstKey = Object.keys(data)[0];
                const isTotalRow = data[firstKey] === 'Total';

                return (
                  <tr
                    key={index}
                    className={`row row-cols-7 justify-content-center text-center ${isTotalRow ? 'fw-bold bg-warning ' : ''
                      }`}
                  >
                    <td scope="col" className="col-1 table_row py-1 py-auto">
                      {!isTotalRow && index + 1}
                    </td>
                    {headers.map((header: any, idx: any) => (
                      <td
                        key={idx}
                        scope="col"
                        className={`table_row py-1 py-auto ${headers?.length <= 4 ? 'col-2' : 'col'
                          }`}
                      >
                        {data[header]}
                      </td>
                    ))}
                  </tr>
                );
              })}
            {/* Render the last row separately */}
          </tbody>
        </table>
        {reportData.length > 0 && (
          <div className={`sticky-bottom `}>
            <table className={`table table-hover table-striped cursor`}>
              <tbody>
                <tr className="row row-cols-7 justify-content-center text-center fw-bold">

                  {headers.map((header: any, idx: any) => (
                    <td
                      key={idx}
                      scope="col"
                      className={`table_row py-1 py-auto ${styled.total_row_container}   ${headers?.length <= 4 ? 'col-2' : 'col'}`}
                    >
                      {reportData[reportData.length - 1][header]}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportListingTable;