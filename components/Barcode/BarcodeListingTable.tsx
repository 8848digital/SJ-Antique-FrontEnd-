const BarcodeListingTable: any = ({ BarcodeListData }: any) => {
  console.log(BarcodeListData, '@Barcode list');
  return (
    <div>
      <table className="table table-hover table-bordered">
        <thead>
          <th className="thead" scope="col">
            Sr. No
          </th>
          <th className="thead" scope="col">
            Item code
          </th>
          <th className="thead" scope="col"></th>
          <th className="thead" scope="col"></th>
          <th className="thead" scope="col"></th>
        </thead>
        <tbody>
          {BarcodeListData?.length > 0 &&
            BarcodeListData !== null &&
            BarcodeListData.map((item: any, index: number) => {
              <tr key={index - 1}>
                <td className="table_row">{index - 1}</td>
                <td className="table_row">{item?.item_code}</td>
                <td className="table_row"></td>
                <td className="table_row"></td>
                <td className="table_row"></td>
              </tr>;
            })}
        </tbody>
      </table>
    </div>
  );
};

export default BarcodeListingTable;
