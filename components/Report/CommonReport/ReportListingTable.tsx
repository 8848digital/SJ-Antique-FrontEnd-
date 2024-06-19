import React from 'react';
import styled from '../../../styles/report.module.css';

const ReportListingTable = ({ headers, reportData }: any) => {
  return (
    <div className="row justify-content-center mt-3">
      <div className={`col table-responsie m-auto ${styled.table_container}`}>
        <table className="table table-hover table-striped cursor ">
          <thead className="sticky-top">
            <tr className="row row-cols-7 justify-content-center">
              <th scope="col" className="thead col-1">
                Sr. No.
              </th>
              {headers?.map((header: string, index: number) => (
                <th key={index} scope="col" className={`thead col`}>
                  {header?.charAt(0)?.toUpperCase() +
                    header?.slice(1)?.replace('_', ' ')}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {reportData
              .slice(0, -1) // Excludes the last row
              .map((data: any, index: any) => {
                const firstKey = Object.keys(data)[0];
                const isTotalRow = data[firstKey] === 'Total';

                return (
                  <tr
                    key={index}
                    className={`row row-cols-7 justify-content-center text-center ${
                      isTotalRow ? 'fw-bold bg-warning ' : ''
                    }`}
                  >
                    <td scope="col" className="col-1 table_row py-1 py-auto">
                      {!isTotalRow && index + 1}
                    </td>
                    {headers.map((header: any, idx: any) => (
                      <td
                        key={idx}
                        scope="col"
                        className={`table_row py-1 py-auto col `}
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
                      className={`table_row py-1 py-auto ${
                        styled.total_row_container
                      } col`}
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
