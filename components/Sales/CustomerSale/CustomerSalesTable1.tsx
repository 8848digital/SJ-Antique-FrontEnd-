import CurrentDate from '@/components/CurrentDate';
import SearchSelectInputField from '@/components/SearchSelectInputField/SearchSelectInputField';
import React from 'react';

const CustomerSalesTable1 = () => {
  return (
    <div className="table-responsive mt-2">
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th className="thead" scope="col">
              Chitti No.
            </th>
            <th className="thead" scope="col">
              Transaction Date
            </th>
            <th className="thead" scope="col">
              Client
            </th>
            <th className="thead" scope="col">
              Remarks
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="table_row" scope="row">
              <input
                className="form-control input-sm border border-secondary"
                type="text"
                name="remarks"
                autoComplete="off"
              />
            </td>
            <td className="table_row">
              <CurrentDate />
            </td>
            <td className="table_row">
              <SearchSelectInputField
                className={'form-control input-sm border border-secondary'}
                placeholder={'Client Name'}
              />
            </td>
            <td className="table_row">
              <input
                className="form-control input-sm border border-secondary"
                type="text"
                name="remarks"
                autoComplete="off"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CustomerSalesTable1;
