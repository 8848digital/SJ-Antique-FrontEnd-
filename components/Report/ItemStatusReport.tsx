import { useState } from 'react';
import styles from '../../styles/readyReceipts.module.css';
import ReportHeader from '../Header/ReportHeader';
import LoadMoreTableDataInMaster from '../Master/LoadMoreTableDataInMaster';
import ReportFilterListing from './ReportFilterListing';
import Loader from '../NoRecord/Loader';
import NoRecord from '../NoRecord/NoRecord';
import { useRouter } from 'next/router';

const ItemStatusReport: any = ({
  itemStatusReportState,
  reportName,
  voucherNumber,
  setSearchItem,
  searchItem,
  selectDropDownReset,
  setSelectDropDownReset,
  searchVoucherNum,
  setSearchVoucherNum,
  itemList,
  HandleSearchInput,
  searchInputValues,
  isLoading,
  HandleRefresh,
}: any) => {
  const router = useRouter();
  const [tableViewData, setTableViewData] = useState<any>(20);

  const HandleTableViewRows: any = (data: any) => {
    console.log('inside load more', data);
    setTableViewData(data);
  };
  console.log('@report daily qty status', itemStatusReportState);

  // const filteredList =
  //   itemStatusReportState?.length > 0 &&
  //   itemStatusReportState !== null &&
  //   searchVoucherNum
  //     ? itemStatusReportState.filter((item: any) => {
  //         const voucherNumberMatch = searchVoucherNum
  //           ? item?.voucher_no
  //               ?.toLowerCase()
  //               .includes(searchVoucherNum.toString().toLowerCase())
  //           : true;
  //         const dateMatch =
  //           searchInputValues.fromDate && searchInputValues.toDate
  //             ? item?.posting_date >= searchInputValues.fromDate &&
  //               item?.posting_date <= searchInputValues.toDate
  //             : true;
  //         return voucherNumberMatch || dateMatch;
  //       })
  //     : itemStatusReportState;
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
      <ReportFilterListing
        reportName={reportName}
        voucherNumber={voucherNumber}
        setSearchItem={setSearchItem}
        searchItem={searchItem}
        selectDropDownReset={selectDropDownReset}
        setSelectDropDownReset={setSelectDropDownReset}
        searchVoucherNum={searchVoucherNum}
        setSearchVoucherNum={setSearchVoucherNum}
        itemList={itemList}
        HandleSearchInput={HandleSearchInput}
      />
      {isLoading === 0 && <Loader />}
      {isLoading === 2 && (
        <NoRecord
          title={`No Record Found 😥`}
          heading=""
          HandleRefresh={HandleRefresh}
        />
      )}
      {isLoading === 1 && (
        <>
          {itemStatusReportState?.length > 0 && (
            <div className="text-end pe-3 p-0 text-gray small ">
              {itemStatusReportState?.slice(0, tableViewData)?.length} of{' '}
              {itemStatusReportState?.length < 10
                ? '0' + itemStatusReportState?.length
                : itemStatusReportState?.length}
            </div>
          )}
          <div className="table-responsive">
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
                  itemStatusReportState
                    .slice(0, tableViewData)
                    .map((item: any, index: number) => (
                      <tr key={index} className={`${styles.table_row}`}>
                        <td className="table_row report-table-row" scope="row">
                          {index + 1}
                        </td>
                        {Object.values(item).map(
                          (value: any, innerIndex: number) => (
                            <td
                              key={innerIndex}
                              className="table_row report-table-row"
                              scope="row"
                            >
                              {value}
                            </td>
                          )
                        )}
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
        </>
      )}
    </div>
  );
};

export default ItemStatusReport;
