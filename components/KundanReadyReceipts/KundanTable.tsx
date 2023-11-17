import React, { useEffect } from 'react';
import CurrentDate from '../CurrentDate';
import SearchSelectInputField from '../SearchSelectInputField/SearchSelectInputField';
import { useRouter } from 'next/router';

const KundanTable = ({
  handleRecipietChange,
  recieptData,
  karigarData,
  setRecipitData,
  selectedDropdownValue,
  setSelectedDropdownValue,
  readyReceiptType,
  setReadyReceiptType,
  defaultKarigarData,
  setStateForDocStatus,
  readOnlyFields
}: any) => {
  const router = useRouter();
  const pathParts = router?.asPath?.split('/');
  const lastPartOfURL = pathParts[pathParts?.length - 1];

  useEffect(() => {
    if (defaultKarigarData === undefined) {
      setReadyReceiptType(
        lastPartOfURL?.charAt(0)?.toUpperCase() + lastPartOfURL?.slice(1)
      );
    }
  }, [router, setReadyReceiptType, defaultKarigarData, lastPartOfURL]);

  return (
    <>
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th className="thead" scope="col">
              Date
            </th>

            <th className="thead" scope="col">
              Karigar(Supplier) <span className="text-danger">*</span>
            </th>
            <th className="thead" scope="col">
              Remarks
            </th>
            <th className="thead" scope="col">
              Ready Receipt Type
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="table_row">
            <td scope="row" className="table_row">
              <CurrentDate />
            </td>
            <td className="table_row">
              <SearchSelectInputField
                karigarData={karigarData}
                defaultValue={karigarData?.karigar_name}
                recipitData={recieptData}
                setRecipitData={setRecipitData}
                selectedDropdownValue={selectedDropdownValue}
                setSelectedDropdownValue={setSelectedDropdownValue}
                setStateForDocStatus={setStateForDocStatus}
                placeholder={'Karigar Name'}
              />
            </td>
            <td className="table_row">
              <input
                className="form-control input-sm border border-secondary"
                type="text"
                name="remarks"
                value={recieptData?.remarks}
                onChange={handleRecipietChange}
                readOnly={readOnlyFields}
              />
            </td>
            <td className="table_row">
              <input
                className="form-control input-sm border border-secondary"
                type="text"
                readOnly
                value={
                  readyReceiptType ||
                  (defaultKarigarData !== undefined &&
                    defaultKarigarData?.length > 0 &&
                    defaultKarigarData !== null
                    ? defaultKarigarData[0]?.custom_ready_receipt_type
                    : '')
                }
                disabled
              />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default KundanTable;
