import React from 'react';

const CustomerSalesTable2 = () => {
  return (
    <div className="table-responsive">
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th className="thead">Kun Category</th>
            <th className="thead">Cs Category</th>
            <th className="thead">BB Category</th>
            <th className="thead">OT Category</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="table_row w-25" scope="row">
              <select
                name=""
                id=""
                className=" form-select form-select-sm border-secondary  p-0 px-2 "
              >
                <option selected></option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </td>
            <td className="table_row w-25" scope="row">
              <select
                name=""
                id=""
                className="form-select form-select-sm border-secondary p-0 px-2"
              >
                {' '}
                <option selected></option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </td>
            <td className="table_row w-25" scope="row">
              <select
                name=""
                id=""
                className="form-select form-select-sm border-secondary p-0 px-2"
              >
                {' '}
                <option selected></option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </td>
            <td className="table_row w-25" scope="row">
              <select
                name=""
                id=""
                className="form-select form-select-sm border-secondary p-0 px-2"
              >
                {' '}
                <option selected></option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CustomerSalesTable2;
