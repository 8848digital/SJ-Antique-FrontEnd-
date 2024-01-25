import React from 'react';
import SearchSelectInputField from '../SearchSelectInputField/SearchSelectInputField';

const ReportFilterListing: any = ({
  reportName,
  itemVoucherNumber,
  setSearchItem,
  searchItem,
}: any) => {
  return (
    <div className=" d-flex justify-content-center mb-2">
      {reportName === 'Item Status Report' && (
        <div className="m-1">
          <label className="text-grey">item</label>
          <SearchSelectInputField
          // karigarData={ReceiptNumber}
          // placeholder={colPlaceholder1}
          // className={
          //   'form-control input-fields custom-input-field line-height'
          // }
          // style={'max-width'}
          // selectedDropdownValue={searchReceiptNumber}
          // setSelectedDropdownValue={setSearchReceiptNumber}
          // selectDropDownReset={kunKarigarDropdownReset}
          // setSelectDropDownReset={setKunKarigarDropdownReset}
          />
        </div>
      )}
      <div className="m-1">
        <label className="text-grey">From Date</label>
        <SearchSelectInputField />
      </div>
      <div className="m-1">
        <label className="text-grey">To Date</label>
        <SearchSelectInputField />
      </div>
      <div className="m-1">
        <label className="text-grey">Voucher Name</label>
        <SearchSelectInputField
          karigarData={itemVoucherNumber}
          placeholder="Voucher Number"
          className={'form-control input-fields custom-input-field line-height'}
          style={'max-width'}
          selectedDropdownValue={searchItem}
          setSelectedDropdownValue={setSearchItem}
          // selectDropDownReset={kunKarigarDropdownReset}
          // setSelectDropDownReset={setKunKarigarDropdownReset}
        />
      </div>
    </div>
  );
};

export default ReportFilterListing;
