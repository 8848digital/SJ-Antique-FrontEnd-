import CurrentDate from '@/components/CurrentDate';
import SearchSelectInputField from '@/components/SearchSelectInputField/SearchSelectInputField';
import { get_detail_delivery_note_data } from '@/store/slices/Sales/getDetailOfDeliveryNoteApi';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

const CustomerSalesTable1 = ({
  clientNameListData,
  selectedClient,
  setSelectedClient,
  handleSelectClientGroup,
  clientGroupList,
  readOnlyFields,
  setStateForDocStatus,
  defaultSalesDate,
}: any) => {
  const { query } = useRouter();
  // console.log('client name list', clientNameListData);
  const DetailOfDeliveryNoteFromStore: any = useSelector(
    get_detail_delivery_note_data
  );
  console.log(
    'DetailOfDeliveryNote from store in tsx',
    DetailOfDeliveryNoteFromStore?.data?.custom_client_name,
    query
  );
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
            {/* <th className="thead " scope="col">
              Remarks
            </th> */}
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
                value={query?.deliveryNoteId}
                readOnly
              />
            </td>
            <td className="table_row">
              <CurrentDate defaultSalesDate={defaultSalesDate} />
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
                defaultValue={
                  DetailOfDeliveryNoteFromStore?.data?.custom_client_name
                }
                placeholder={'Client Name'}
                className={'form-control input-sm border border-secondary'}
                clientGroupList={clientGroupList}
                readOnlyFields={readOnlyFields}
                setStateForDocStatus={setStateForDocStatus}
                handleSelectClientGroup={handleSelectClientGroup}
              />
            </td>
            {/* <td className="table_row">
              <input
                className="form-control input-sm border border-secondary"
                type="text"
                name="remarks"
                autoComplete="off"
              />
            </td> */}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CustomerSalesTable1;
