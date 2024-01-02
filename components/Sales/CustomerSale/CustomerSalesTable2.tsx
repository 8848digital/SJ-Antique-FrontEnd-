const CustomerSalesTable2 = ({
  kunCsOtCategoryListData,
  BBCategoryListData,
  selectedCategory,
  setSeletedCategory,
  handleSelectChange,
}: any) => {
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
                name="KunCategory"
                id=""
                className=" form-select form-select-sm border-secondary p-0 px-2 "
                onChange={handleSelectChange}
              >
                <option selected></option>
                {kunCsOtCategoryListData?.length > 0 &&
                  kunCsOtCategoryListData !== null &&
                  kunCsOtCategoryListData.map((categoryData: any) => (
                    <option>{categoryData.name1}</option>
                  ))}
              </select>
            </td>
            <td className="table_row w-25" scope="row">
              <select
                name="CsCategory"
                id=""
                className=" form-select form-select-sm border-secondary  p-0 px-2 "
                onChange={handleSelectChange}
              >
                <option selected></option>
                {kunCsOtCategoryListData?.length > 0 &&
                  kunCsOtCategoryListData !== null &&
                  kunCsOtCategoryListData.map((categoryData: any) => (
                    <option>{categoryData.name1}</option>
                  ))}
              </select>
            </td>

            <td className="table_row w-25" scope="row">
              <select
                name="BBCategory"
                id=""
                className=" form-select form-select-sm border-secondary  p-0 px-2 "
                onChange={handleSelectChange}
              >
                <option selected></option>
                {BBCategoryListData?.length > 0 &&
                  BBCategoryListData !== null &&
                  BBCategoryListData.map((BBCategoryData: any) => (
                    <option>{BBCategoryData.name1}</option>
                  ))}
              </select>
            </td>
            <td className="table_row w-25" scope="row">
              <select
                name="OtCategory"
                id=""
                className=" form-select form-select-sm border-secondary  p-0 px-2 "
                onChange={handleSelectChange}
              >
                <option selected></option>
                {kunCsOtCategoryListData?.length > 0 &&
                  kunCsOtCategoryListData !== null &&
                  kunCsOtCategoryListData.map((categoryData: any) => (
                    <option>{categoryData.name1}</option>
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
