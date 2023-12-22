import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styles from '../../../styles/readyReceipts.module.css';

const CustomerSalesTable = ({ salesTableData, setSalesTableData }: any) => {
  const handleFieldChange: any = () => {};
  return (
    <>
      <div className="table responsive">
        <table className="table table-hover table-bordered ">
          <thead>
            <tr>
              <th className="thead" scope="col">
                Sr.no
              </th>
              <th className="thead" scope="col">
                Item Code
                {/* <span className="text-danger">*</span> */}
              </th>
              <th className="thead" scope="col">
                Gross wt
              </th>
              <th className="thead" scope="col">
                Kun Wt
              </th>
              <th className="thead" scope="col">
                Cs Wt
              </th>
              <th className="thead" scope="col">
                BB Wt
              </th>
              <th className="thead" scope="col">
                Other Wt
              </th>
              <th className="thead" scope="col">
                Net wt
              </th>
              <th className="thead" scope="col">
                Cs@
              </th>
              <th className="thead" scope="col">
                Cs Amt
              </th>
              <th className="thead" scope="col">
                Kun Pc
              </th>
              <th className="thead" scope="col">
                Kun@
              </th>
              <th className="thead" scope="col">
                Kun Amt
              </th>
              <th className="thead" scope="col">
                Ot @
              </th>
              <th className="thead" scope="col">
                Ot Amt
              </th>
              <th className="thead" scope="col">
                Other
              </th>
              <th className="thead" scope="col">
                Amount
              </th>
              <th className="thead" scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {salesTableData?.length > 0 &&
              salesTableData !== null &&
              salesTableData.map((item: any, i: any) => (
                <>
                  <tr key={item.idx} className={`${styles.table_row}`}>
                    <td className="table_row">{item.idx}</td>
                    <td className="table_row">
                      <input
                        className={` ${styles.input_field} `}
                        type="text"
                        defaultValue={item?.item_code}
                        value={item.item_code}
                        onChange={(e) =>
                          handleFieldChange(
                            item.idx,
                            'item_code',
                            e.target.value
                          )
                        }
                        // readOnly={readOnlyFields}
                      />
                    </td>
                    <td className="table_row">
                      <input
                        className={` ${styles.input_field} `}
                        type="number"
                        value={item.custom_gross_wt}
                        defaultValue={item?.custom_gross_wt}
                        onChange={(e) =>
                          handleFieldChange(
                            item.idx,
                            'custom_gross_wt',
                            e.target.value
                          )
                        }
                        // readOnly={readOnlyFields}
                      />
                    </td>

                    <td className="table_row">
                      <input
                        className={` ${styles.input_field} `}
                        type="number"
                        value={item.custom_kun_wt}
                        defaultValue={item.custom_kun_wt}
                        onChange={(e) =>
                          handleFieldChange(
                            item.idx,
                            'custom_kun_wt',
                            e.target.value
                          )
                        }
                        // readOnly={readOnlyFields}
                      />
                    </td>
                    <td className="table_row">
                      <input
                        className={` ${styles.input_field} `}
                        type="number"
                        value={
                          // Number(tableData[i]?.totalModalWeight) ||
                          item.custom_cs_wt
                        }
                        defaultValue={item.custom_cs_wt}
                        // readOnly={readOnlyFields}
                        onChange={(e) =>
                          handleFieldChange(
                            item.idx,
                            'custom_cs_wt',
                            e.target.value
                          )
                        }
                        // onKeyDown={(e) => handleModal(e, item.idx, item)}
                      />
                    </td>
                    <td className="table_row">
                      <input
                        className={` ${styles.input_field} `}
                        type="number"
                        value={
                          // Number(tableData[i]?.totalModalWeight) ||
                          item.custom_bb_wt
                        }
                        defaultValue={item.custom_bb_wt}
                        // readOnly={readOnlyFields}
                        onChange={(e) =>
                          handleFieldChange(
                            item.idx,
                            'custom_bb_wt',
                            e.target.value
                          )
                        }
                        // onKeyDown={(e) => handleModal(e, item.idx, item)}
                      />
                    </td>
                    <td className="table_row">
                      <input
                        className={` ${styles.input_field} `}
                        type="number"
                        value={
                          // Number(tableData[i]?.totalModalWeight) ||
                          item.custom_other_wt
                        }
                        defaultValue={item.custom_other_wt}
                        // readOnly={readOnlyFields}
                        onChange={(e) =>
                          handleFieldChange(
                            item.idx,
                            'custom_other_wt',
                            e.target.value
                          )
                        }
                        // onKeyDown={(e) => handleModal(e, item.idx, item)}
                      />
                    </td>
                    <td className="table_row">
                      <input
                        className={` ${styles.input_field} `}
                        type="number"
                        value={
                          // Number(tableData[i]?.totalModalWeight) ||
                          item.custom_net_wt
                        }
                        defaultValue={item.custom_net_wt}
                        // readOnly={readOnlyFields}
                        onChange={(e) =>
                          handleFieldChange(
                            item.idx,
                            'custom_net_wt',
                            e.target.value
                          )
                        }
                        // onKeyDown={(e) => handleModal(e, item.idx, item)}
                      />
                    </td>
                    <td className="table_row">
                      <input
                        className={` ${styles.input_field} `}
                        type="number"
                        value={
                          // Number(tableData[i]?.totalModalWeight) ||
                          item.custom_cs
                        }
                        defaultValue={item.custom_cs}
                        // readOnly={readOnlyFields}
                        onChange={(e) =>
                          handleFieldChange(
                            item.idx,
                            'custom_cs',
                            e.target.value
                          )
                        }
                        // onKeyDown={(e) => handleModal(e, item.idx, item)}
                      />
                    </td>
                    <td className="table_row">
                      <input
                        className={` ${styles.input_field} `}
                        type="number"
                        value={
                          // Number(tableData[i]?.totalModalWeight) ||
                          item.custom_cs_amt
                        }
                        defaultValue={item.custom_cs_amt}
                        // readOnly={readOnlyFields}
                        onChange={(e) =>
                          handleFieldChange(
                            item.idx,
                            'custom_cs_amt',
                            e.target.value
                          )
                        }
                        // onKeyDown={(e) => handleModal(e, item.idx, item)}
                      />
                    </td>
                    <td className="table_row">
                      <input
                        className={` ${styles.input_field} `}
                        type="number"
                        value={
                          // Number(tableData[i]?.totalModalWeight) ||
                          item.custom_kun_pc
                        }
                        defaultValue={item.custom_kun_pc}
                        // readOnly={readOnlyFields}
                        onChange={(e) =>
                          handleFieldChange(
                            item.idx,
                            'custom_kun_wt',
                            e.target.value
                          )
                        }
                        // onKeyDown={(e) => handleModal(e, item.idx, item)}
                      />
                    </td>
                    <td className="table_row">
                      <input
                        className={` ${styles.input_field} `}
                        type="number"
                        value={
                          // Number(tableData[i]?.totalModalWeight) ||
                          item.custom_kun
                        }
                        defaultValue={item.custom_kun}
                        // readOnly={readOnlyFields}
                        onChange={(e) =>
                          handleFieldChange(
                            item.idx,
                            'custom_kun',
                            e.target.value
                          )
                        }
                        // onKeyDown={(e) => handleModal(e, item.idx, item)}
                      />
                    </td>
                    <td className="table_row">
                      <input
                        className={` ${styles.input_field} `}
                        type="number"
                        value={
                          // Number(tableData[i]?.totalModalWeight) ||
                          item.custom_kun_amt
                        }
                        defaultValue={item.custom_kun_amt}
                        // readOnly={readOnlyFields}
                        onChange={(e) =>
                          handleFieldChange(
                            item.idx,
                            'custom_kun_amt',
                            e.target.value
                          )
                        }
                        // onKeyDown={(e) => handleModal(e, item.idx, item)}
                      />
                    </td>
                    <td className="table_row">
                      <input
                        className={` ${styles.input_field} `}
                        type="number"
                        value={
                          // Number(tableData[i]?.totalModalWeight) ||
                          item.custom_ot_
                        }
                        defaultValue={item.custom_ot_}
                        // readOnly={readOnlyFields}
                        onChange={(e) =>
                          handleFieldChange(
                            item.idx,
                            'custom_ot_',
                            e.target.value
                          )
                        }
                        // onKeyDown={(e) => handleModal(e, item.idx, item)}
                      />
                    </td>
                    <td className="table_row">
                      <input
                        className={` ${styles.input_field} `}
                        type="number"
                        value={
                          // Number(tableData[i]?.totalModalWeight) ||
                          item.custom_ot_amt
                        }
                        defaultValue={item.custom_ot_amt}
                        // readOnly={readOnlyFields}
                        onChange={(e) =>
                          handleFieldChange(
                            item.idx,
                            'custom_ot_amt',
                            e.target.value
                          )
                        }
                        // onKeyDown={(e) => handleModal(e, item.idx, item)}
                      />
                    </td>
                    <td className="table_row">
                      <input
                        className={` ${styles.input_field} `}
                        type="number"
                        value={
                          // Number(tableData[i]?.totalModalWeight) ||
                          item.custom_other
                        }
                        defaultValue={item.custom_other}
                        // readOnly={readOnlyFields}
                        onChange={(e) =>
                          handleFieldChange(
                            item.idx,
                            'custom_other',
                            e.target.value
                          )
                        }
                        // onKeyDown={(e) => handleModal(e, item.idx, item)}
                      />
                    </td>
                    <td className="table_row">
                      <input
                        className={` ${styles.input_field} `}
                        type="number"
                        value={
                          // Number(tableData[i]?.totalModalWeight) ||
                          item.custom_amount
                        }
                        defaultValue={item.custom_amount}
                        // readOnly={readOnlyFields}
                        onChange={(e) =>
                          handleFieldChange(
                            item.idx,
                            'custom_amount',
                            e.target.value
                          )
                        }
                        // onKeyDown={(e) => handleModal(e, item.idx, item)}
                      />
                    </td>
                    <td className="table_row">
                      <button
                        className="d-flex align-items-center delete-link p-1 border-0"
                        //   onClick={() => handleDeleteRow(item.idx)}
                        //   onKeyDown={(e) => handleTabPress(e, item.idx)}
                        //   disabled={readOnlyFields}
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
    </>
  );
};

export default CustomerSalesTable;
