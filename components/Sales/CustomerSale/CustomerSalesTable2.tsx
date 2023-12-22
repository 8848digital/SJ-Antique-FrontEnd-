import React from 'react';

const CustomerSalesTable2 = ({
  kunCsOtCategoryListData,
  BBCategoryListData,
}: any) => {
  console.log('kunCsOtCategoryListData first', BBCategoryListData);
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
                {kunCsOtCategoryListData?.length > 0 &&
                  kunCsOtCategoryListData !== null &&
                  kunCsOtCategoryListData.map((categoryData: any) => (
                    <option selected>{categoryData.name1}</option>
                  ))}
              </select>
            </td>
            <td className="table_row w-25" scope="row">
              <select
                name=""
                id=""
                className=" form-select form-select-sm border-secondary  p-0 px-2 "
              >
                {kunCsOtCategoryListData?.length > 0 &&
                  kunCsOtCategoryListData !== null &&
                  kunCsOtCategoryListData.map((categoryData: any) => (
                    <option selected>{categoryData.name1}</option>
                  ))}
              </select>
            </td>

            <td className="table_row w-25" scope="row">
              <select
                name=""
                id=""
                className=" form-select form-select-sm border-secondary  p-0 px-2 "
              >
                {BBCategoryListData?.length > 0 &&
                  BBCategoryListData !== null &&
                  BBCategoryListData.map((BBCategoryData: any) => (
                    <option selected>{BBCategoryData.name1}</option>
                  ))}
              </select>
            </td>
            <td className="table_row w-25" scope="row">
              <select
                name=""
                id=""
                className=" form-select form-select-sm border-secondary  p-0 px-2 "
              >
                {kunCsOtCategoryListData?.length > 0 &&
                  kunCsOtCategoryListData !== null &&
                  kunCsOtCategoryListData.map((categoryData: any) => (
                    <option selected>{categoryData.name1}</option>
                  ))}
              </select>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CustomerSalesTable2;
