import SearchSelectInputField from '../SearchSelectInputField/SearchSelectInputField';

const FilterKundanReadyReceiptListing = ({
  HandleSearchInput,
  receiptNoList,
  setSearchReceiptNumber,
  searchReceiptNumber,
  searchInputValues,
  karigarData,
  searchKarigar,
  setSearchKarigar,
  colPlaceholder1,
  colPlaceholder2,
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
            placeholder={colPlaceholder1}
            className={
              'form-control input-fields custom-input-field line-height'
            }
            style={'max-width'}
            selectedDropdownValue={searchReceiptNumber}
            setSelectedDropdownValue={setSearchReceiptNumber}
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
          <SearchSelectInputField
            className={
              'form-control input-fields custom-input-field line-height'
            }
            style={'max-width'}
            placeholder={colPlaceholder2}
            karigarData={karigarData}
            selectedDropdownValue={searchKarigar}
            setSelectedDropdownValue={setSearchKarigar}
          />
        </div>

        <div className="col-md-2 ">
          <select
            name="status"
            id="status"
            className="form-select h-100 p-0 px-2 input-fields"
            aria-label="Default select example"
            value={searchInputValues?.status}
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
