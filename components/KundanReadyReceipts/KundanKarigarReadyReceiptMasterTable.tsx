import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../../styles/readyReceipts.module.css';
import SelectInputKunKarigar from '../SearchSelectInputField/SelectInputKunKarigar';
import PurchaseReceiptFileUploadMaster from '../PurchaseReceiptFileUpload/PurchaseReceiptFileUploadMaster';

const KundanKarigarReadyReceiptMasterTable = ({
  handleFieldChange,
  tableData,
  handleDeleteRow,
  handleTabPress,
  setTableData,
  kundanKarigarData,
  handleModal,
  readOnlyFields,
  selectedDropdownValue,
  setSelectedDropdownValue,
  setStateForDocStatus,
  selectedKundanKarigarDropdownValue,
  setSelectedKundanKarigarDropdownValue,
  kunKarigarDropdownReset,
  calculateEditTotal,

  handleClearFileUploadInput,
}: any) => {
  console.log('table data receipt', tableData);

  return (
    <div className="table responsive">
      <table className="table table-hover table-bordered ">
        <thead>
          <tr>
            <th className="thead" scope="col">
              Sr.no
            </th>
            <th className="thead" scope="col">
              Product Code (Item) <span className="text-danger">*</span>
            </th>
            <th className="thead" scope="col">
              Kun Karigar
            </th>
            <th className="thead" scope="col">
              Net Wt
            </th>
            <th className="thead" scope="col">
              Few Wt
            </th>
            <th className="thead" scope="col">
              Mat Wt
            </th>
            <th className="thead" scope="col">
              Gross Wt
            </th>
            <th className="thead" scope="col">
              Other
            </th>
            <th className="thead" scope="col">
              Total
            </th>
            <th className="thead" scope="col">
              Add Photo
            </th>
            <th className="thead" scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {tableData?.length > 0 &&
            tableData !== null &&
            tableData.map((item: any, i: any) => (
              <>
                <tr key={item.idx} className={`${styles.table_row}`}>
                  <td className="table_row">{item.idx}</td>
                  <td className="table_row">
                    <input
                      className={` ${styles.input_field} `}
                      type="text"
                      defaultValue={item?.product_code}
                      value={item.product_code}
                      onChange={(e) =>
                        handleFieldChange(
                          item.idx,
                          'tableRow',
                          'product_code',
                          e.target.value
                        )
                      }
                      readOnly={readOnlyFields}
                    />
                  </td>
                  <td className="table_row">
                    <SelectInputKunKarigar
                      kundanKarigarData={kundanKarigarData}
                      kunKarigarDropdownReset={kunKarigarDropdownReset}
                      defaultValue={item.custom_kun_karigar}
                      tableData={tableData}
                      setTableData={setTableData}
                      selectedKundanKarigarDropdownValue={
                        selectedKundanKarigarDropdownValue
                      }
                      setSelectedKundanKarigarDropdownValue={
                        setSelectedKundanKarigarDropdownValue
                      }
                      item={item}
                      id={item.idx}
                      setStateForDocStatus={setStateForDocStatus}
                      readOnlyFields={readOnlyFields}
                    />
                  </td>
                  <td className="table_row">
                    <input
                      className={` ${styles.input_field} `}
                      type="number"
                      value={item.custom_net_wt}
                      defaultValue={item?.custom_net_wt}
                      onChange={(e) =>
                        handleFieldChange(
                          item.idx,
                          'tableRow',
                          'custom_net_wt',
                          e.target.value
                        )
                      }
                      readOnly={readOnlyFields}
                    />
                  </td>
                  <td className="table_row">
                    <input
                      className={` ${styles.input_field} `}
                      type="number"
                      value={item.custom_few_wt}
                      defaultValue={item.custom_few_wt}
                      onChange={(e) =>
                        handleFieldChange(
                          item.idx,
                          'tableRow',
                          'custom_few_wt',
                          e.target.value
                        )
                      }
                      readOnly={readOnlyFields}
                    />
                  </td>
                  <td className="table_row">
                    <input
                      className={` ${styles.input_field} `}
                      type="number"
                      value={
                        // Number(tableData[i]?.totalModalWeight) ||
                        item.custom_mat_wt
                      }
                      defaultValue={item.custom_mat_wt}
                      readOnly={readOnlyFields}
                      onChange={(e) =>
                        handleFieldChange(
                          item.idx,
                          'tableRow',
                          'custom_mat_wt',
                          e.target.value
                        )
                      }
                      onKeyDown={(e) => handleModal(e, item.idx, item)}
                    />
                  </td>
                  <td className="table_row">
                    <input
                      className={` ${styles.input_field} `}
                      type="number"
                      readOnly
                      disabled
                      name={`sum-${i + 1}`}
                      value={
                        tableData[i]?.totalModalWeight > 0
                          ? Number(tableData[i].custom_net_wt) +
                            Number(tableData[i].custom_few_wt) +
                            Number(tableData[i]?.custom_mat_wt)
                          : // Number(tableData[i]?.totalModalWeight)
                            Number(tableData[i].custom_net_wt) +
                            Number(tableData[i].custom_few_wt) +
                            Number(tableData[i]?.custom_mat_wt)
                      }
                    />
                  </td>

                  <td className="table_row">
                    <input
                      className={` ${styles.input_field} `}
                      type="number"
                      value={Number(item.custom_other)}
                      defaultValue={Number(item.custom_other)}
                      onChange={(e) => {
                        calculateEditTotal(item.idx, e.target.value);
                      }}
                      readOnly={readOnlyFields}
                    />
                  </td>
                  <td className="table_row">
                    {' '}
                    <input
                      className={` ${styles.input_field} `}
                      type="number"
                      readOnly
                      disabled
                      name={`sum-${i + 1}`}
                      defaultValue={tableData[i]?.custom_total}
                      value={
                        Number(tableData[i].totalAmount) >= 0
                          ? Number(tableData[i]?.custom_other) +
                            Number(tableData[i]?.totalAmount)
                          : tableData[i]?.custom_total !== '' &&
                            tableData[i]?.custom_total !== undefined
                          ? tableData[i]?.custom_total
                          : tableData[i]?.custom_other
                      }
                    />
                  </td>

                  <td className="table_row">
                    <PurchaseReceiptFileUploadMaster
                      handleFieldChange={handleFieldChange}
                      item={item}
                      readOnlyFields={readOnlyFields}
                      handleClearFileUploadInput={handleClearFileUploadInput}
                    />
                  </td>
                  <td className="table_row">
                    <button
                      className="d-flex align-items-center delete-link p-1 border-0"
                      onClick={() => handleDeleteRow(item.idx)}
                      onKeyDown={(e) => handleTabPress(e, item.idx)}
                      disabled={readOnlyFields}
                    >
                      <FontAwesomeIcon
                        icon={faTrash}
                        style={{ color: 'red', fontSize: 15 }}
                      />
                    </button>
                  </td>
                </tr>
                <tr></tr>
              </>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default KundanKarigarReadyReceiptMasterTable;
