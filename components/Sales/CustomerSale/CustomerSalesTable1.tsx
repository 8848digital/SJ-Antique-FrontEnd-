import CurrentDate from '@/components/CurrentDate';
import SearchSelectInputField from '@/components/SearchSelectInputField/SearchSelectInputField';
import SelectInputKunKarigar from '@/components/SearchSelectInputField/SelectInputKunKarigar';
import React from 'react';

const CustomerSalesTable1 = ({
  clientNameListData,
  selectedClient,
  setSelectedClient,
  handleSelectClientGroup,
  clientGroupList,
}: any) => {
  // console.log('client name list', clientNameListData);
  return (
    <div className=" mt-2">
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th className="thead " scope="col">
              Chitti No.
            </th>
            <th className="thead" scope="col">
              Transaction Date
            </th>
            <th className="thead" scope="col">
              Client
            </th>
            <th className="thead " scope="col">
              Remarks
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="table_row " scope="row">
              <input
                className=" form-control input-sm border border-secondary light-background"
                type="text"
                name="remarks"
                autoComplete="off"
                readOnly
              />
            </td>
            <td className="table_row">
              <CurrentDate />
            </td>
            <td className="table_row">
              <SearchSelectInputField
                karigarData={
                  clientNameListData?.length > 0 &&
                  clientNameListData !== null &&
                  clientNameListData.map((data: any) => ({
                    karigar_name: data.client_name,
                  }))
                }
                setSelectedDropdownValue={setSelectedClient}
                selectedDropdownValue={selectedClient}
                placeholder={'Client Name'}
                className={'form-control input-sm border border-secondary'}
                handleSelectClientGroup={handleSelectClientGroup}
                clientGroupList={clientGroupList}
                // readOnlyFields={readOnlyFields}
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
