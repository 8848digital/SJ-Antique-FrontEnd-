import CurrentDate from '@/components/CurrentDate';
import SearchSelectInputField from '@/components/SearchSelectInputField/SearchSelectInputField';

const CustomerSalesTable1 = ({
  clientList,
  setSearchClient,
  searchClient,
}: any) => {
  let clientData: any =
    clientList?.length > 0 &&
    clientList !== null &&
    clientList.map((data: any) => ({
      karigar_name: data.client_name,
    }));
  return (
    <div className=" mt-2">
      <table className="table table-hover">
        <thead>
          <tr>
            <th className="text-center p-0" scope="col">
              Chitti No.
            </th>
            <th className="text-center p-0" scope="col">
              Transaction Date
            </th>
            <th className="text-center p-0" scope="col">
              Client
            </th>
            <th className="text-center p-0" scope="col">
              Remarks
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="table_row" scope="row">
              <input
                className=" form-control input-sm border border-secondary light-background"
                style={{ background: '#e0e1f5' }}
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
                karigarData={clientData}
                className={
                  'form-control input-sm border border-secondary light-background'
                }
                placeholder={'Client Name'}
                selectedDropdownValue={searchClient}
                setSelectedDropdownValue={setSearchClient}
              />
            </td>
            <td className="table_row">
              <input
                className="form-control input-sm border border-secondary"
                style={{ background: '#e0e1f5' }}
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
