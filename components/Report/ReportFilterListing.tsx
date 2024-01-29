import React from 'react';
import SearchSelectInputField from '../SearchSelectInputField/SearchSelectInputField';

const ReportFilterListing: any = ({
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
}: any) => {
  console.log('@report item voucher number', itemList);
  return (
    <div className=" d-flex justify-content-center mb-2">
      {reportName === 'Item Status Report' && (
        <div className="m-1">
          <label className="text-grey">Item</label>
          <SearchSelectInputField
            karigarData={
              itemList?.length > 0 &&
              itemList !== null &&
              itemList.map((data: any) => ({
                karigar_name: data.name,
              }))
            }
            placeholder="Item"
            className="form-control input-fields custom-input-field line-height"
            style="max-width"
            selectedDropdownValue={searchItem}
            setSelectedDropdownValue={setSearchItem}
            selectDropDownReset={selectDropDownReset}
            setSelectDropDownReset={setSelectDropDownReset}
          />
        </div>
      )}
      <div className="m-1">
        <label className="text-grey">From Date</label>
        <div>
          <input
            type="date"
            name="fromDate"
            className="form-control line-height"
            onChange={HandleSearchInput}
          />
        </div>
      </div>
      <div className="m-1">
        <label className="text-grey">To Date</label>
        <div>
          <input
            type="date"
            name="toDate"
            className="form-control line-height"
            onChange={HandleSearchInput}
          />
        </div>
      </div>
      <div className="m-1">
        <label className="text-grey">Voucher Name</label>
        <SearchSelectInputField
          karigarData={voucherNumber}
          placeholder="Voucher Number"
          className="form-control input-fields custom-input-field line-height"
          style="max-width"
          selectedDropdownValue={searchVoucherNum}
          setSelectedDropdownValue={setSearchVoucherNum}
          selectDropDownReset={selectDropDownReset}
          setSelectDropDownReset={setSelectDropDownReset}
        />
      </div>
    </div>
  );
};

export default ReportFilterListing;
