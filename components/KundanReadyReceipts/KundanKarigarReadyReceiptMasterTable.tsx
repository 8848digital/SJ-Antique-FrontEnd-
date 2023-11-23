import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../../styles/readyReceipts.module.css';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import SelectInputKunKarigar from '../SearchSelectInputField/SelectInputKunKarigar';
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
}: any) => {
  console.log('table data receipt', tableData);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef<any>(null);
  const handleButtonClick = () => {
    // Trigger the hidden file input when the visible text input is clicked
    fileInputRef?.current?.click();
  };

  const handleSelectedFileFun: any = () => {};
  return (
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
                    className={` ${styles.input_field} input-width`}
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
                    className={` ${styles.input_field} input-width`}
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
                    className={` ${styles.input_field} input-width`}
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
                    className={` ${styles.input_field} input-width`}
                    type="number"
                    value={
                      Number(tableData[i]?.totalModalWeight) ||
                      item.custom_mat_wt
                    }
                    defaultValue={item.custom_mat_wt}
                    readOnly
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
                    className={` ${styles.input_field} input-width`}
                    type="number"
                    readOnly
                    disabled
                    name={`sum-${i + 1}`}
                    value={
                      tableData[i]?.totalModalWeight > 0
                        ? Number(tableData[i].custom_net_wt) +
                          Number(tableData[i].custom_few_wt) +
                          Number(tableData[i]?.totalModalWeight)
                        : Number(tableData[i].custom_net_wt) +
                          Number(tableData[i].custom_few_wt) +
                          Number(tableData[i]?.custom_mat_wt)
                    }
                  />
                </td>

                <td className="table_row">
                  <input
                    className={` ${styles.input_field} input-width`}
                    type="number"
                    value={item.custom_other}
                    defaultValue={item.custom_other}
                    onChange={(e) =>
                      handleFieldChange(
                        item.idx,
                        'tableRow',
                        'custom_other',
                        e.target.value
                      )
                    }
                    readOnly={readOnlyFields}
                  />
                </td>
                <td className="table_row">
                  {' '}
                  <input
                    className={` ${styles.input_field} input-width`}
                    type="text"
                    readOnly
                    disabled
                    name={`sum-${i + 1}`}
                    // value={
                    //   tableData[i]?.totalAmount > 0
                    //     ? tableData[i].custom_other + tableData[i]?.totalAmount
                    //     : tableData[i].custom_other === undefined && tableData[i].custom_other === ''
                    // }
                    value={
                      Number(tableData[i]?.totalAmount) > 0
                        ? Number(tableData[i].custom_other) +
                          Number(tableData[i]?.totalAmount)
                        : item.custom_total !== undefined &&
                          item.custom_total !== ''
                        ? Number(item.custom_total)
                        : Number(tableData[i].custom_other)
                    }
                  />
                </td>
                {/* <td className="table_row ">
                {tableData[i].custom_add_photo && (
                  <span style={{ fontSize: '12px' }}>
                    {tableData[i].custom_add_photo}
                  </span>
                )}
                <input
                  className={` ${styles.input_field} border-0`}
                  type="file"
                  // value={item.custom_add_photo}
                  onChange={(e) =>
                    handleFieldChange(
                      item.idx,
                      'tableRow',
                      'custom_add_photo',
                      `/files/${e.target.files?.[0]?.name}`,
                      e.target.files?.[0]
                    )
                  }
                />
              </td> */}
                <td className="table_row">
                  <input
                  className={`${styles.input_field} input-width`}
                    type="text"
                    // defaultValue={selectedFile ? selectedFile.name : ''}
                    placeholder="Choose file"
                    value={item.custom_add_photo}
                    onClick={handleButtonClick}
                    onChange={(e) =>
                      handleFieldChange(
                        item.idx,
                        'tableRow',   
                        'custom_add_photo',
                        `/files/${e.target.files?.[0]?.name}`,
                        e.target.files?.[0]
                      )
                    }
                    readOnly
                  />

                  {/* Hidden file input */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    style={{ display: 'none' }}
                    onChange={(e) =>
                      handleFieldChange(
                        item.idx,
                        'tableRow',
                        'custom_add_photo',
                        `/files/${e.target.files?.[0]?.name}`,
                        e.target.files?.[0]
                      )
                    }
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
  );
};

export default KundanKarigarReadyReceiptMasterTable;
