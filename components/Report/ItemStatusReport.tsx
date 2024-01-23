import { useState } from 'react';
import styles from '../../styles/readyReceipts.module.css';
import ReportHeader from '../Header/ReportHeader';
import LoadMoreTableDataInMaster from '../Master/LoadMoreTableDataInMaster';
import ReportFilterListing from './ReportFilterListing';

const ItemStatusReport: any = ({ itemStatusReportState, reportName }: any) => {
  const [tableViewData, setTableViewData] = useState<any>(20);

  const HandleTableViewRows: any = (data: any) => {
    setTableViewData(data);
  };
  return (
    <div className="container-lg">
      <ReportHeader />
      <div className="d-flex justify-content-between">
        <h4>{reportName}</h4>
        <button
          type="submit"
          // onClick={handleEmptyDeliveryNote}
          className=" btn btn-outline-primary px-2 py-0 form-submit-button"
        >
          Print
        </button>
      </div>
      <ReportFilterListing reportName={reportName} />
      <div className="table-responsive">
        {itemStatusReportState?.length > 0 && (
          <div className="text-end pe-3 p-0 text-gray small ">
            {itemStatusReportState?.slice(0, tableViewData)?.length} of{' '}
            {itemStatusReportState?.length < 10
              ? '0' + itemStatusReportState?.length
              : itemStatusReportState?.length}
          </div>
        )}
        <table className="table table-hover table-bordered table-striped">
          <thead>
            <th className="thead" scope="col">
              Sr.No.
            </th>
            {itemStatusReportState?.length > 0 &&
              itemStatusReportState !== null &&
              Object.keys(itemStatusReportState[0]).map((key) => (
                <th className="thead" scope="col" key={key}>
                  {key}
                </th>
              ))}
          </thead>
          <tbody>
            {itemStatusReportState?.length > 0 &&
              itemStatusReportState !== null &&
              itemStatusReportState.map((item: any, index: number) => (
                <tr key={index} className={`${styles.table_row}`}>
                  <td className="table_row" scope="row">
                    {index + 1}
                  </td>
                  {Object.values(item).map((value: any, innerIndex: number) => (
                    <td key={innerIndex} className="table_row">
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            {itemStatusReportState?.length > 20 &&
              itemStatusReportState !== null && (
                <LoadMoreTableDataInMaster
                  HandleTableViewRows={HandleTableViewRows}
                />
              )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ItemStatusReport;
