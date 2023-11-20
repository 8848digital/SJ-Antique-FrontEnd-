import React from 'react';
import SelectInputKunKarigar from '../SearchSelectInputField/SelectInputKunKarigar';
import SearchSelectInputField from '../SearchSelectInputField/SearchSelectInputField';

const FilterKundanReadyReceiptListing = ({
  HandleSearchInput,
  receiptNoList,
  setSearchReceiptNumber,
  searchReceiptNumber,
  searchInputValues,
}: any) => {
  console.log('receipt no list', receiptNoList);
  let ReceiptNumber: any =
    receiptNoList?.length > 0 &&
    receiptNoList !== null &&
    receiptNoList.map((data: any) => ({
      karigar_name: data.name,
    }));
  console.log('receiptt', searchReceiptNumber);
  return (
    <div>
      <div className="row justify-content-center">
        <div className="col-md-2 ">
          <SearchSelectInputField
            karigarData={ReceiptNumber}
            placeholder={'Receipt No'}
            className={
              'form-control input-fields custom-input-field line-height'
            }
            // setRecipitData={setRecipitData}
            selectedDropdownValue={searchReceiptNumber}
            setSelectedDropdownValue={setSearchReceiptNumber}
            // setStateForDocStatus={setStateForDocStatus}
          />
        </div>

        <div className="col-lg-2 col-md-3 ">
          {/* <label className="text-secondary">Current Date</label> */}
          <input
            type="date"
            name="transaction_date"
            id="transaction_date"
            className="form-control input-fields custom-input-field line-height "
            value={searchInputValues?.transaction_date}
            onChange={HandleSearchInput}
          />
        </div>
        <div className="col-md-2">
          {/* <label className="text-secondary">Chitti no</label> */}
          <input
            type="text"
            name="karigar"
            id="karigar"
            className="form-control input-fields custom-input-field line-height "
            aria-describedby="emailHelp"
            placeholder="Karigar"
            onChange={HandleSearchInput}
          />
        </div>

        <div className="col-md-2 my-lg-0 mb-lg-0 mb-3">
          {/* <label className="text-secondary">Status</label> */}
          <select
            name="status"
            id="status"
            className="form-select h-100 p-0 px-2 input-fields line-height"
            aria-label="Default select example"
            onChange={HandleSearchInput}
          >
            <option>status</option>
            <option>Draft</option>
            <option>Submitted</option>
            <option>Cancel</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterKundanReadyReceiptListing;
