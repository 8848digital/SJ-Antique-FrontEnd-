import React from 'react';
import SearchSelectInputField from '../SearchSelectInputField/SearchSelectInputField';

const BarcodeFilterListing: any = ({
  karigarList,
  searchKarigar,
  setSearchKarigar,
  selectDropDownReset,
  setSelectDropDownReset,
  handleSearchBarcodeItemCodeDetails,
  handleSearchBtn,
}: any) => {
  return (
    <div>
      <div className="d-flex flex-wrap justifay-space-between">
        <div className="d-flex flex-wrap justify-content-center">
          <div className="text-center">
            <label>Date</label>

            <input
              type="date"
              className="form-control line-height bg-primary bg-opacity-10"
              onChange={(e: any) =>
                handleSearchBarcodeItemCodeDetails(e, 'date')
              }
            />
          </div>
          <div className="text-center p-0">
            <label>Karigar</label>

            <SearchSelectInputField
              karigarData={karigarList}
              placeholder="Karigar"
              className={
                'form-control line-height text-center bg-primary bg-opacity-10'
              }
              style="max-width"
              selectedDropdownValue={searchKarigar}
              setSelectedDropdownValue={setSearchKarigar}
              selectDropDownReset={selectDropDownReset}
              setSelectDropDownReset={setSelectDropDownReset}
            />
          </div>
          <div className="text-center">
            <label>Item Group</label>
            <input
              type="text"
              className="form-control line-height bg-primary bg-opacity-10 text-center"
              onChange={(e: any) =>
                handleSearchBarcodeItemCodeDetails(e, 'item_group')
              }
            />
          </div>
          <div className="text-center">
            <label>Sr.No.From</label>
            <input
              type="text"
              className="form-control line-height bg-primary bg-opacity-10 text-center"
              onChange={(e: any) =>
                handleSearchBarcodeItemCodeDetails(e, 'sr_no_from')
              }
            />
          </div>
          <div className="text-center">
            <label>Sr.No.To</label>

            <input
              type="text"
              className="form-control line-height bg-primary bg-opacity-10 text-center"
              onChange={(e: any) =>
                handleSearchBarcodeItemCodeDetails(e, 'sr_no_to')
              }
            />
          </div>
          <div className="p-0">
            <label>Stock</label>

            <select
              className="form-control line-height bg-primary bg-opacity-10"
              aria-label="Default select example"
              onChange={(e: any) =>
                handleSearchBarcodeItemCodeDetails(e, 'stock')
              }
            >
              <option selected></option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="p-0">
            <label>Barcode Created?</label>

            <select
              className="form-control line-height text-center bg-primary bg-opacity-10"
              aria-label="Default select example"
              onChange={(e: any) =>
                handleSearchBarcodeItemCodeDetails(e, 'barcode_created')
              }
            >
              <option selected></option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>
        <div className="p-0 mt-2 mx-2">
          <button className="btn btn-primary p-1 " onClick={handleSearchBtn}>
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default BarcodeFilterListing;
