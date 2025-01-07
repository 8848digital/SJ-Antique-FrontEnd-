import { get_detail_delivery_note_data } from '@/store/slices/Sales/getDetailOfDeliveryNoteApi';
import { useSelector } from 'react-redux';

const CustomerSalesTable2 = ({
  kunCsOtCategoryListData,
  BBCategoryListData,
  selectedCategory,
  setSeletedCategory,
  handleSelectChange,
  readOnlyFields,
  keyValue,
}: any) => {


  const DetailOfDeliveryNoteFromStore: any = useSelector(
    get_detail_delivery_note_data
  );

  return (
    <div className="m-0">
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
                className="form-select form-select-sm border-secondary p-0 px-2"
                onChange={handleSelectChange}
                disabled={readOnlyFields}
                value={
                  keyValue === "edit" && selectedCategory?.KunCategory === ""
                    ? DetailOfDeliveryNoteFromStore?.data?.custom_kun_category
                    : selectedCategory?.KunCategory || ""
                }
              >
                <option value="" disabled>
                  Select a Category
                </option>
                {kunCsOtCategoryListData?.length > 0 && kunCsOtCategoryListData?.map((categoryData: any, index: number) => (
                  <option value={categoryData.name1} key={index}>
                    {categoryData.name1}
                  </option>
                ))}
              </select>

            </td>

            <td className="table_row w-25" scope="row">
              <select
                name="CsCategory"
                id=""
                className=" form-select form-select-sm border-secondary  p-0 px-2 "
                onChange={handleSelectChange}
                disabled={readOnlyFields}
                value={
                  keyValue === "edit" && selectedCategory?.CsCategory === ""
                    ? DetailOfDeliveryNoteFromStore?.data?.custom_cs_category
                    : selectedCategory?.CsCategory || ""
                }
              >
                <option value="" disabled>Select a Category</option>
                {kunCsOtCategoryListData?.length > 0 &&
                  kunCsOtCategoryListData !== null &&
                  kunCsOtCategoryListData.map(
                    (categoryData: any, index: any) => (
                      <option key={index}>{categoryData.name1} </option>
                    )
                  )}
              </select>
            </td>

            <td className="table_row w-25" scope="row">
              <select
                name="BBCategory"
                id=""
                className=" form-select form-select-sm border-secondary  p-0 px-2 "
                onChange={handleSelectChange}
                disabled={readOnlyFields}
                value={
                  keyValue === "edit" && selectedCategory?.BBCategory === ""
                    ? DetailOfDeliveryNoteFromStore?.data?.custom_bb_category
                    : selectedCategory?.BBCategory || ""
                }

              >
                <option value="" disabled>Select a Category</option>
                {BBCategoryListData?.length > 0 &&
                  BBCategoryListData !== null &&
                  BBCategoryListData.map((BBCategoryData: any, index: any) => (
                    <option key={index}>{BBCategoryData.name1}</option>
                  ))}
              </select>
            </td>
            <td className="table_row w-25" scope="row">
              <select
                name="OtCategory"
                id="OtCategory"
                className="form-select form-select-sm border-secondary  p-0 px-2 "
                onChange={handleSelectChange}
                disabled={readOnlyFields}
                value={
                  keyValue === "edit" && selectedCategory?.OtCategory === ""
                    ? DetailOfDeliveryNoteFromStore?.data?.custom_ot_category
                    : selectedCategory?.OtCategory || ""
                }

              >
                <option value="" disabled>Select a Category</option>
                {kunCsOtCategoryListData?.length > 0 &&
                  kunCsOtCategoryListData !== null &&
                  kunCsOtCategoryListData.map(
                    (categoryData: any, index: any) => (
                      <option key={index}>{categoryData.name1}</option>
                    )
                  )}
              </select>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CustomerSalesTable2;
