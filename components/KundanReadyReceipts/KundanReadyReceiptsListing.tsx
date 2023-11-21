import { useEffect } from 'react';
import PrintPurchaseReceiptApi from '@/services/api/PurchaseReceipt/print-purchase-receipt-api';
import UpdateDocStatusApi from '@/services/api/general/update-docStatus-api';
import getPurchasreceiptListApi from '@/services/api/get-purchase-recipts-list-api';
import { getSpecificReceipt } from '@/store/PurchaseReceipt/getSpecificPurchaseReceipt-slice';
import { get_access_token } from '@/store/slices/auth/login-slice';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../styles/readyReceiptTableListing.module.css';
import FilterKundanReadyReceiptListing from './FilterKundanReadyReceiptListing';
import LoadMoreTableDataInMaster from '../Master/LoadMoreTableDataInMaster';

const KundanListing = ({
  kundanListing,
  setKundanListing,
  HandleDeleteReceipt,
  karigarData,
}: any) => {
  const router = useRouter();
  const pathParts = router.asPath.split('/');
  const lastPartOfURL = pathParts[pathParts.length - 1];
  const { query } = useRouter();
  const dispatch = useDispatch();
  const [tableViewData, setTableViewData] = useState<any>(20);

  const HandleTableViewRows: any = (data: any) => {
    setTableViewData(data);
  };

  console.log('router query', query);
  let url: any = router?.query?.receipt;
  const loginAcessToken = useSelector(get_access_token);

  const [searchReceiptNumber, setSearchReceiptNumber] = useState<any>('');
  const [searchKarigar, setSearchKarigar] = useState<any>('');

  const todayDate: any = new Date()?.toISOString()?.split('T')[0];
  const [searchInputValues, setSearchInputValues] = useState({
    transaction_date: todayDate,
    status: '',
  });

  const HandleSearchInput: any = (e: any) => {
    console.log('event', e.target.name, e.target.value);
    const { name, value } = e.target;

    setSearchInputValues({
      ...searchInputValues,
      [name]: value,
    });
  };

  useEffect(() => {
    setSearchInputValues({
      transaction_date: todayDate,
      status: '',
    });
    setSearchReceiptNumber('');
    setSearchKarigar('');
  }, [query.receipt]);

  const filteredList =
    kundanListing?.length > 0 &&
    kundanListing !== null &&
    (searchInputValues.transaction_date ||
      searchKarigar ||
      searchReceiptNumber ||
      searchInputValues.status)
      ? kundanListing.filter((item: any) => {
          const submittedDateMatch = searchInputValues.transaction_date
            ? item?.posting_date?.includes(searchInputValues.transaction_date)
            : true;
          // const currentDateMatch = searchInputValues.current_date
          //   ? item?.date?.includes(searchInputValues.current_date)
          //   : true;
          console.log(searchKarigar, 'searchKarigar');
          console.log(item.custom_karigar, 'item33');
          const karigarMatch = searchKarigar
            ? item?.custom_karigar
                ?.toLowerCase()
                ?.includes(searchKarigar?.toLowerCase())
            : true;
          console.log(searchReceiptNumber, 'searchReceipt');
          const receiptNumberMatch = searchReceiptNumber
            ? item?.name
                ?.toLowerCase()
                .includes(searchReceiptNumber.toLowerCase())
            : true;

          if (searchInputValues.status === 'Draft') {
            return (
              item?.docstatus === 0 &&
              submittedDateMatch &&
              karigarMatch &&
              receiptNumberMatch
            );
          } else if (searchInputValues.status === 'Submitted') {
            return (
              item?.docstatus === 1 &&
              submittedDateMatch &&
              karigarMatch &&
              receiptNumberMatch
            );
          } else if (searchInputValues.status === 'Cancel') {
            return (
              item?.docstatus === 2 &&
              submittedDateMatch &&
              karigarMatch &&
              receiptNumberMatch
            );
          }

          return submittedDateMatch && karigarMatch && receiptNumberMatch;
        })
      : kundanListing;

  const HandleCancelReceipt: any = async (name: any) => {
    console.log('name', name);
    let cancelReceipt: any = await UpdateDocStatusApi(
      loginAcessToken?.token,
      '2',
      name
    );
    if (cancelReceipt?.hasOwnProperty('data')) {
      console.log('canclereciept api inn', cancelReceipt);
      const capitalizeFirstLetter = (str: any) => {
        return str?.charAt(0)?.toUpperCase() + str?.slice(1);
      };

      let updatedData: any = await getPurchasreceiptListApi(
        loginAcessToken,
        capitalizeFirstLetter(lastPartOfURL)
      );

      console.log('updated data', updatedData);

      setKundanListing(updatedData?.data?.message?.data);
      const params: any = {
        token: loginAcessToken?.token,
        name: query?.receiptId,
      };
      dispatch(getSpecificReceipt(params));
    }
  };

  const HandlePrintApi: any = async (name: any) => {
    let printApiRes: any = await PrintPurchaseReceiptApi(
      loginAcessToken?.token,
      name
    );
    if (printApiRes?.status === 'success') {
      if (printApiRes?.data?.data?.length > 0) {
        window.open(printApiRes?.data?.data[0]?.print_url);
      }
    }
  };

  return (
    <div className=" table">
      <FilterKundanReadyReceiptListing
        HandleSearchInput={HandleSearchInput}
        receiptNoList={kundanListing}
        setSearchReceiptNumber={setSearchReceiptNumber}
        searchReceiptNumber={searchReceiptNumber}
        searchKarigar={searchKarigar}
        setSearchKarigar={setSearchKarigar}
        searchInputValues={searchInputValues}
        karigarData={karigarData}
      />
      {filteredList?.length > 0 && (
        <div className="text-end pe-3 p-0 text-gray small ">
          {filteredList?.slice(0, tableViewData)?.length} of{' '}
          {filteredList?.length < 10
            ? '0' + filteredList?.length
            : filteredList?.length}
        </div>
      )}
      <table className="table table-striped table-hover table-bordered">
        <thead>
          <tr>
            <th className="thead" scope="col">
              Receipt No.
            </th>
            <th className="thead" scope="col">
              Transaction Date
            </th>
            <th className="thead" scope="col">
              Karigar
            </th>
            <th className="thead" scope="col">
              Status
            </th>
            <th className="thead" scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {filteredList?.length > 0 &&
            filteredList !== null &&
            filteredList.slice(0, tableViewData).map((item: any, i: any) => (
              <tr key={i} className={`${styles.receipt_listing_table_row} `}>
                <td
                  className={`table_row ${styles.receipt_listing_table_data}`}
                >
                  {item.name}
                </td>
                <td
                  className={`table_row ${styles.receipt_listing_table_data}`}
                >
                  {item.posting_date}
                </td>
                <td
                  className={`table_row ${styles.receipt_listing_table_data}`}
                >
                  {item.custom_karigar}
                </td>
                <td
                  className={`table_row ${styles.receipt_listing_table_data}`}
                >
                  {item.docstatus === 0 ? (
                    <span>Draft</span>
                  ) : item.docstatus === 1 ? (
                    <span>Submitted</span>
                  ) : item.docstatus === 2 ? (
                    <span>Cancelled</span>
                  ) : (
                    ''
                  )}
                </td>
                {item.docstatus === 0 && (
                  <>
                    <td
                      className={` button-section-td border-0 text-center ${styles.receipt_listing_table_data}`}
                    >
                      <div className="row justify-content-center gx-0">
                        <div className="col-lg-3">
                          <Link
                            href={`${url}/${item.name}`}
                            className="button-section-text text-info "
                          >
                            Edit
                          </Link>
                        </div>
                        <div className="col-lg-3">
                          <a
                            onClick={() => HandleDeleteReceipt(item.name)}
                            className={`button-section-text text-danger ${styles.cursor_pointer}`}
                          >
                            Delete
                          </a>
                        </div>
                        <div className="col-lg-3">
                          <Link
                            href={`${url}/${item.name}`}
                            className="button-section-text text-info "
                          >
                            View
                          </Link>
                        </div>
                      </div>
                    </td>
                  </>
                )}
                {item.docstatus === 1 && (
                  <>
                    <td
                      className={` button-section-td border-0 text-center ${styles.receipt_listing_table_data}`}
                    >
                      <div className="row justify-content-center gx-0">
                        <div className="col-lg-3">
                          <a
                            onClick={() => HandlePrintApi(item.name)}
                            className="button-section-text text-info "
                          >
                            print
                          </a>
                        </div>
                        <div className="col-lg-3">
                          <a
                            // href="#"
                            onClick={() => HandleCancelReceipt(item.name)}
                            className={`button-section-text text-danger ${styles.cursor_pointer}`}
                          >
                            Cancel
                          </a>
                        </div>
                        <div className="col-lg-3">
                          <Link
                            href={`${url}/${item.name}`}
                            className="button-section-text text-info "
                          >
                            View
                          </Link>
                        </div>
                      </div>
                    </td>
                  </>
                )}
                {item.docstatus === 2 && (
                  <>
                    <td
                      className={` button-section-td border-0 text-center ${styles.receipt_listing_table_data}`}
                    >
                      <div className="row justify-content-center gx-0">
                        <div className="col-lg-3">
                          {item?.posting_date ===
                            new Date()?.toISOString()?.split('T')[0] && (
                            <>
                              <Link
                                href={`${url}/${item.name}`}
                                className="button-section-text text-info "
                              >
                                Amend
                              </Link>
                            </>
                          )}
                        </div>

                        <div className="col-lg-3">
                          <a
                            // href=""
                            onClick={() => HandleDeleteReceipt(item.name)}
                            className={`button-section-text text-danger ${styles.cursor_pointer}`}
                          >
                            Delete
                          </a>
                        </div>
                        <div className="col-lg-3">
                          <Link
                            href={`${url}/${item.name}`}
                            className="button-section-text text-info "
                          >
                            View
                          </Link>
                        </div>
                      </div>
                    </td>
                  </>
                )}
              </tr>
            ))}
          {filteredList?.length > 20 && filteredList !== null && (
            <LoadMoreTableDataInMaster
              HandleTableViewRows={HandleTableViewRows}
            />
          )}
        </tbody>
      </table>
    </div>
  );
};

export default KundanListing;
