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
  kunKarigarDropdownReset,
  setKunKarigarDropdownReset,
}: any) => {
  console.log('receipt no list', receiptNoList);
  let ReceiptNumber: any =
    receiptNoList?.length > 0 &&
    receiptNoList !== null &&
    receiptNoList.map((data: any) => ({
      karigar_name: data.custom_number,
    }));
  console.log('receiptt', searchReceiptNumber);
  return (
    <div>
      <div className="row justify-content-center">
        <div className="col-md-2 ">
          <label className="text-grey">Receipt No.</label>
          <div>
            <SearchSelectInputField
              karigarData={ReceiptNumber}
              placeholder={colPlaceholder1}
              className={
                'form-control input-fields custom-input-field line-height'
              }
              style={'max-width'}
              selectedDropdownValue={searchReceiptNumber}
              setSelectedDropdownValue={setSearchReceiptNumber}
              selectDropDownReset={kunKarigarDropdownReset}
              setSelectDropDownReset={setKunKarigarDropdownReset}
            />
          </div>
        </div>

        <div className="col-lg-2 col-md-3 ">
          <label className="text-grey">From Date</label>
          <div>
            <input
              type="date"
              name="from_date"
              className="form-control input-fields custom-input-field line-height "
              onChange={HandleSearchInput}
            />
          </div>
        </div>
        <div className="col-lg-2 col-md-3 ">
          <label className="text-grey">To Date</label>
          <div>
            <input
              type="date"
              name="to_date"
              className="form-control input-fields custom-input-field line-height "
              onChange={HandleSearchInput}
            />
          </div>
        </div>
        <div className="col-md-2">
          <label className="text-grey">Karigar</label>
          <div>
            <SearchSelectInputField
              className={
                'form-control input-fields custom-input-field line-height'
              }
              style={'max-width'}
              placeholder={colPlaceholder2}
              karigarData={karigarData}
              selectedDropdownValue={searchKarigar}
              setSelectedDropdownValue={setSearchKarigar}
              selectDropDownReset={kunKarigarDropdownReset}
              setSelectDropDownReset={setKunKarigarDropdownReset}
            />
          </div>
        </div>

        <div className="col-md-2 ">
          <label className="text-grey">Status</label>
          <div>
            <select
              name="status"
              id="status"
              className="form-select h-100 p-1 px-2 input-fields"
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
    </div>
  );
};

export default FilterKundanReadyReceiptListing;
