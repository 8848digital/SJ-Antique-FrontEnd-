import SearchSelectInputField from '@/components/InputDropdown/SearchSelectInputField';
import { useRouter } from 'next/router';
import React from 'react';

const CommonFilters = ({
  searchInputValues,
  HandleSearchInput,
  HandleSerachReport,
  setSelectDropDownReset
}: any) => {
  const { query } = useRouter();
  return (
    <div className="container">
      <div className="d-flex justify-content-center">
        <div className="col-sm-2 p-0 mx-1">
          <label className="text-grey">From Date</label>
          <div>
            <input
              type="date"
              name="from_date"
              value={searchInputValues.from_date}
              className="form-control input-fields custom-input-field line-height bg-primary bg-opacity-10 "
              onChange={HandleSearchInput}
            />
          </div>
        </div>
        <div className="col-sm-2 p-0 mx-1">
          <label className="text-grey">To Date</label>
          <div>
            <input
              type="date"
              name="to_date"
              value={searchInputValues.to_date}
              className="form-control input-fields custom-input-field line-height bg-primary bg-opacity-10"
              onChange={HandleSearchInput}
            />
          </div>
        </div>
        {/* {(query?.reportId === 'daily-summary-report' || query?.reportId === 'item-wise-report')&&(
            <div className="col-sm-2 p-0 mx-1">
            <label className="text-grey">Item Name</label>
            <SearchSelectInputField
            //   karigarData={voucherNumber}
              placeholder="Voucher Number"
              className="form-control input-fields custom-input-field line-height"
              style={'max-width'}
              selectedDropdownValue={searchInputValues.Item_Name}
              setSelectedDropdownValue={setSearchVoucherNum}
              selectDropDownReset={selectDropDownReset}
              setSelectDropDownReset={setSelectDropDownReset}
            />
          </div>
        ) } */}
        <div className="mt-4 mb-1 ms-2 d-flex justify-content-start">
          <button
            className="btn btn-primary m-0 p-1 px-2"
            onClick={HandleSerachReport}
          >
            <i className="fa-solid fa-magnifying-glass pe-2"></i>
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommonFilters;
