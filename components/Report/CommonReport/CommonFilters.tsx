import AutoCompleteInput from '@/components/InputDropdown/AutoCompleteInput';
import { useRouter } from 'next/router';
import React from 'react';

const CommonFilters = ({
  searchInputValues,
  handleSearchInput,
  handleSearchBtn,
  clientNameData,
  karigarNameData,
}: any) => {
  const { query } = useRouter();
  const categoryList: any = ['category1', 'category2', 'category3'];
  const categoryData: any = {
    fieldname: 'category',
    fieldtype: 'Link',
    link_data: categoryList,
  };
  const subCategoryData: any = {
    fieldname: 'sub_category',
    fieldtype: 'Link',
    link_data: categoryList,
  };
  const clientNameList: any = {
    fieldname: 'client_name',
    fieldtype: 'Link',
    link_data: clientNameData,
  };
  const karigarNameListData: any = {
    fieldname: 'karigar_name',
    fieldtype: 'Link',
    link_data: karigarNameData,
  };

  // console.log('query for report', query);
  return (
    <div className="container mt-2">
      <div className="d-flex justify-content-center">
        <div className="col-sm-2 p-0 mx-1">
          <label className="text-grey">From Date</label>
          <div>
            <input
              type="date"
              name="from_date"
              value={searchInputValues.from_date}
              className="form-control input-fields custom-input-field line-height bg-primary bg-opacity-10 "
              onChange={(e: any) =>
                handleSearchInput(e.target.value, 'from_date')
              }
            />
          </div>
        </div>
        <div className="col-sm-2 p-0 mx-1">
          <label className="text-grey">To Date</label>
          <input
            type="date"
            name="to_date"
            value={searchInputValues.to_date}
            className="form-control"
            onChange={(e: any) => handleSearchInput(e.target.value, 'to_date')}
          />
        </div>
        {(query?.reportId === 'item-wise-report' ||
          query?.reportId === 'summary-report') && (
          <>
            <div className="col-sm-2 p-0 mx-1">
              <label className="text-grey">Category</label>
              <AutoCompleteInput
                data={categoryData}
                handleSearchInput={(value: any, fieldName: any) =>
                  handleSearchInput(value, fieldName)
                }
                value={searchInputValues?.category}
              />
            </div>
          </>
        )}
        {query?.reportId === 'item-wise-report' && (
          <div className="col-sm-2 p-0 mx-1">
            <label className="text-grey">Sub Category</label>
            <AutoCompleteInput
              data={subCategoryData}
              handleSearchInput={(value: any, fieldName: any) =>
                handleSearchInput(value, fieldName)
              }
              value={searchInputValues?.sub_category}
            />
          </div>
        )}
        {query?.reportId === 'customer-wise-report' && (
          <div className="col-sm-2 p-0 mx-1">
            <label className="text-grey">Client Name</label>
            <AutoCompleteInput
              data={clientNameList}
              handleSearchInput={(value: any, fieldName: any) =>
                handleSearchInput(value, fieldName)
              }
              value={searchInputValues?.client_name}
            />
          </div>
        )}
        {query?.reportId === 'karigar-wise-report' && (
          <div className="col-sm-2 p-0 mx-1">
            <label className="text-grey">Karigar Name</label>
            <AutoCompleteInput
              data={karigarNameListData}
              handleSearchInput={(value: any, fieldName: any) =>
                handleSearchInput(value, fieldName)
              }
              value={searchInputValues?.karigar_name}
            />
          </div>
        )}

        <div className="mt-4 mb-1 ms-2 d-flex justify-content-start">
          <button
            className="btn btn-primary m-0 p-1 px-2"
            onClick={handleSearchBtn}
          >
            <i className="fa-solid fa-magnifying-glass pe-2"></i>
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommonFilters;
