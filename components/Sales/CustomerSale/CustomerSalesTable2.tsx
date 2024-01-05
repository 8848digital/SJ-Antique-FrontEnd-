import { get_detail_delivery_note_data } from '@/store/slices/Sales/getDetailOfDeliveryNoteApi';
import { useSelector } from 'react-redux';

const CustomerSalesTable2 = ({
  kunCsOtCategoryListData,
  BBCategoryListData,
  selectedCategory,
  handleSelectChange,
  readOnlyFields,
  key,
}: any) => {
  console.log(key, 'key in details page');
  const DetailOfDeliveryNoteFromStore: any = useSelector(
    get_detail_delivery_note_data
  );
  console.log(
    'DetailOfDeliveryNote from store in tsx',
    DetailOfDeliveryNoteFromStore
  );
  console.log('selected category in tsx', selectedCategory);

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
                className="form-select form-select-sm border-secondary p-0 px-2 "
                onChange={handleSelectChange}
                disabled={readOnlyFields}
                defaultValue={
                  key === 'edit'
                    ? DetailOfDeliveryNoteFromStore.data.custom_kun_category
                    : ''
                }
                // value={
                //   selectedCategory.KunCategory
                //     ? selectedCategory.KunCategory.name1
                //     : ''
                // }
              >
                <option
                  selected
                  value={
                    DetailOfDeliveryNoteFromStore?.data?.custom_kun_category
                  }
                >
                  {key === 'edit'
                    ? DetailOfDeliveryNoteFromStore.data.custom_kun_category
                    : ''}
                </option>
                {kunCsOtCategoryListData?.length > 0 &&
                  kunCsOtCategoryListData !== null &&
                  kunCsOtCategoryListData.map(
                    (categoryData: any, index: any) => (
                      <option value={categoryData.name1} key={index}>
                        {categoryData.name1}
                      </option>
                    )
                  )}
              </select>
            </td>
            <td className="table_row w-25" scope="row">
              <select
                name="CsCategory"
                id=""
                className=" form-select form-select-sm border-secondary  p-0 px-2 "
                onChange={handleSelectChange}
                disabled={readOnlyFields}
              >
                <option selected>
                  {key === 'edit'
                    ? DetailOfDeliveryNoteFromStore?.data?.custom_kun_category
                    : ''}
                </option>
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
              >
                <option selected>
                  {key === 'edit'
                    ? DetailOfDeliveryNoteFromStore?.data?.custom_kun_category
                    : ''}
                </option>
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
                id=""
                className="form-select form-select-sm border-secondary  p-0 px-2 "
                onChange={handleSelectChange}
                disabled={readOnlyFields}
              >
                <option selected>
                  {key === 'edit'
                    ? DetailOfDeliveryNoteFromStore?.data?.custom_kun_category
                    : ''}
                </option>
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
