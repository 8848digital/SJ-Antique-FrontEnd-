import React from 'react';
import SearchSelectInputField from '../SearchSelectInputField/SearchSelectInputField';

const BarcodeFilterListing: any = ({
  karigarList,
  searchKarigar,
  setSearchKarigar,
  selectDropDownReset,
  setSelectDropDownReset,
  handleSearchBarcodeItemCodeDetails,
  handleSearchBtn
}: any) => {
  return (
    <div>
      <table className="table table-hover">
        <thead>
          <th className="thead" scope="col">
            Date
          </th>
          <th className="thead" scope="col">
            Karigar
          </th>
          <th className="thead" scope="col">
            Item Group
          </th>
          <th className="thead" scope="col">
            Sr. No. From
          </th>
          <th className="thead" scope="col">
            Sr. No. To
          </th>
          <th className="thead" scope="col">
            Stock
          </th>
          <th className="thead" scope="col">
            Barcode Created?
          </th>
          <th className="thead " scope="col"></th>
        </thead>
        <tbody>
          <tr>
            <td className="table_row" scope="row">
              <input type="date" className="form-control line-height"
                onChange={(e: any) => handleSearchBarcodeItemCodeDetails(e, "date")}
              />
            </td>
            <td className="table_row" scope="row">
              <SearchSelectInputField
                karigarData={karigarList}
                placeholder="Karigar"
                className={
                  'form-control input-fields custom-input-field line-height text-center'
                }
                selectedDropdownValue={searchKarigar}
                setSelectedDropdownValue={setSearchKarigar}
                selectDropDownReset={selectDropDownReset}
                setSelectDropDownReset={setSelectDropDownReset}
              />
            </td>
            <td className="table_row" scope="row">
              <input type="text" className="form-control line-height" onChange={(e: any) => handleSearchBarcodeItemCodeDetails(e, "item_group")} />
            </td>
            <td className="table_row" scope="row">
              <input type="text" className="form-control line-height" onChange={(e: any) => handleSearchBarcodeItemCodeDetails(e, "sr_no_from")} />
            </td>
            <td className="table_row" scope="row">
              <input type="text" className="form-control line-height" onChange={(e: any) => handleSearchBarcodeItemCodeDetails(e, "sr_no_to")} />
            </td>
            <td className="p-0">
              <select className="form-select" aria-label="Default select example" onChange={(e: any) => handleSearchBarcodeItemCodeDetails(e, "stock")}>
                <option selected></option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </td>
            <td className="p-0">
              <select className="form-select" aria-label="Default select example" onChange={(e: any) => handleSearchBarcodeItemCodeDetails(e, "barcode_created")}>
                <option selected></option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>

            </td>
            <td className="p-0 ">
              <button className="btn p-1 " onClick={handleSearchBtn}>Search</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BarcodeFilterListing;
