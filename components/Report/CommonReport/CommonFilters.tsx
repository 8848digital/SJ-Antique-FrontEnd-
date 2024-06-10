import AutoCompleteInput from '@/components/InputDropdown/AutoCompleteInput';
import { useRouter } from 'next/router';
import React from 'react';

const CommonFilters = ({
  searchInputValues,
  handleSearchInput,
  handleSearchBtn,
  clientNameData,
  karigarNameData,
  itemListData,
  categoryData,
}: any) => {
  const { query } = useRouter();

  const categoryListData: any = {
    fieldname: 'Category',
    fieldtype: 'Link',
    link_data:
      categoryData?.length > 0 &&
      categoryData.map((data: any) => data.category),
  };
  const subCategoryListData: any = {
    fieldname: 'Sub_Category',
    fieldtype: 'Link',
    link_data:
      categoryData?.length > 0 &&
      categoryData.map((data: any) => data.subcategory),
  };
  const clientNameList: any = {
    fieldname: 'Client_Name',
    fieldtype: 'Link',
    link_data: clientNameData,
  };
  const karigarNameListData: any = {
    fieldname: 'Karigar_Name',
    fieldtype: 'Link',
    link_data: karigarNameData,
  };
  const productCodeData: any = {
    fieldname: 'product_code',
    fieldtype: 'Link',
    link_data: itemListData,
  };

  return (
    <div className="container mt-2">
      <div className="d-flex justify-content-center">
        {
          query?.reportId !== 'product-code' && (
            <div className="col-sm-2 p-0 mx-1">
              <label className="text-grey">From Date</label>
              <input
                type="date"
                name="from_date"
                value={searchInputValues.from_date}
                className="form-control bg-primary bg-opacity-10 "
                onChange={(e: any) =>
                  handleSearchInput(e.target.value, 'from_date')
                }
              />
            </div>
          )
        }
        {
          query?.reportId !== 'product-code' && (
            <div className="col-sm-2 p-0 mx-1">
              <label className="text-grey">To Date</label>
              <input
                type="date"
                name="to_date"
                value={searchInputValues.to_date}
                className="form-control bg-primary bg-opacity-10"
                onChange={(e: any) => handleSearchInput(e.target.value, 'to_date')}
              />
            </div>
          )
        }

        {query?.reportId === 'product-code' && (
          <div className="col-sm-2 p-0 mx-1">
            <label className="text-grey">Product Code</label>
            <AutoCompleteInput
              data={productCodeData}
              handleSearchInput={(value: any, fieldName: any) =>
                handleSearchInput(value, fieldName)
              }
              value={searchInputValues?.product_code}
            />
          </div>
        )}

        {(query?.reportId === 'item-wise-report' ||
          query?.reportId === 'summary-report' || query?.reportId === "product-code") && (
            <>
              <div className="col-sm-2 p-0 mx-1">
                <label className="text-grey">Category</label>
                <AutoCompleteInput
                  data={categoryListData}
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
              data={subCategoryListData}
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
        {(query?.reportId === 'karigar-wise-report' || query?.reportId === "product-code") && (
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
