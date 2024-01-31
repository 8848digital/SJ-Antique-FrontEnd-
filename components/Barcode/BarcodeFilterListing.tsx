import React from 'react';
import SearchSelectInputField from '../SearchSelectInputField/SearchSelectInputField';

const BarcodeFilterListing: any = ({
  karigarList,
  searchKarigar,
  setSearchKarigar,
  selectDropDownReset,
  setSelectDropDownReset,
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
          <th className="thead" scope="col"></th>
        </thead>
        <tbody>
          <tr>
            <td className="table_row" scope="row">
              <input type="date" className="form-control line-height" />
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
              <input type="text" className="form-control line-height" />
            </td>
            <td className="table_row" scope="row">
              <input type="text" className="form-control line-height" />
            </td>
            <td className="table_row" scope="row">
              <input type="text" className="form-control line-height" />
            </td>
            <td className="p-0">
              <select
                name=""
                className="form-control form-select line-height"
              ></select>
            </td>
            <td className="p-0">
              <select
                name=""
                className="form-control form-select line-height"
              ></select>
            </td>
            <td className="p-0 ">
              <button className="btn   p-1">Search</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BarcodeFilterListing;
