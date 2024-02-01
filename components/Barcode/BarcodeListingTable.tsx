import { useState } from 'react';
import styles from '../../styles/readyReceiptTableListing.module.css';
import SearchSelectInputField from '../SearchSelectInputField/SearchSelectInputField';

const BarcodeListingTable: any = ({ BarcodeListData, multipleRecordsForPrint, handleCheckboxForBarcodePrint, handleBarcodePrint, handleMultipleBarcodePrint, setSearchItemCode, searchItemCode }: any) => {
  console.log(BarcodeListData, '@Barcode list');
  const [kunKarigarDropdownReset, setKunKarigarDropdownReset] =
    useState<any>(false);
  return (
    <div>
      <div className='d-flex justify-content-between mb-2'>
        <SearchSelectInputField
          karigarData={BarcodeListData?.map((data: any) => ({
            karigar_name: data.item_code,
          }))}
          placeholder={"Item code"}
          className={
            'form-control input-fields custom-input-field line-height'
          }
          style={'max-width'}
          selectedDropdownValue={searchItemCode}
          setSelectedDropdownValue={setSearchItemCode}
          selectDropDownReset={kunKarigarDropdownReset}
          setSelectDropDownReset={setKunKarigarDropdownReset}
        />
        <div className="text-end">
          <button type="button" className="btn btn-primary px-3 py-1 mb-1 mx-3"
            onClick={handleMultipleBarcodePrint}
          >
            Print
          </button>
        </div>
      </div>
      <table className="table table-hover table-bordered">
        <thead>
          <th className="thead" scope="col">
            Sr. No
          </th>
          <th className="thead" scope="col">
            Item code
          </th>
          <th className="thead w-25" scope="col"></th>
          <th className="thead" scope="col">Print</th>
          <th className="thead" scope="col"></th>
        </thead>
        <tbody>
          {BarcodeListData?.length > 0 &&
            BarcodeListData !== null &&
            BarcodeListData.map((item: any, index: number) =>
            (
              <tr key={index - 1} className=''>
                <td className="table_row py-1">{index + 1}</td>
                <td className="table_row">{item?.item_code}</td>
                <td className="table_row w-25"></td>
                <td className="table_row">
                  <a
                    onClick={() => handleBarcodePrint(item.item_code)}
                    className={`button-section-text mx-auto text-info ${styles.cursor_pointer}`}
                  >
                    print
                  </a>
                </td>
                <td className="table_row ">

                  <input className="mt-1 " type="checkbox"
                    checked={multipleRecordsForPrint?.some(
                      (checkedItem: any) => checkedItem.id === item.idx
                    )}
                    onChange={() => handleCheckboxForBarcodePrint(item.idx, item.item_code)}
                  />

                </td>
              </tr>
            )
            )}
        </tbody>
      </table>
    </div>
  );
};

export default BarcodeListingTable;
