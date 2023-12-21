import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styles from '../../../styles/readyReceipts.module.css';

const CustomerSalesTable = () => {
  const tableData: any = [];
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
                        // onChange={(e) =>
                        //   handleFieldChange(
                        //     item.idx,
                        //     'tableRow',
                        //     'product_code',
                        //     e.target.value
                        //   )
                        // }
                        // readOnly={readOnlyFields}
                      />
                    </td>
                    <td className="table_row"></td>
                    <td className="table_row">
                      <input
                        className={` ${styles.input_field} `}
                        type="number"
                        value={item.custom_net_wt}
                        defaultValue={item?.custom_net_wt}
                        // onChange={(e) =>
                        //   handleFieldChange(
                        //     item.idx,
                        //     'tableRow',
                        //     'custom_net_wt',
                        //     e.target.value
                        //   )
                        // }
                        // readOnly={readOnlyFields}
                      />
                    </td>
                    <td className="table_row">
                      <input
                        className={` ${styles.input_field} `}
                        type="number"
                        value={item.custom_few_wt}
                        defaultValue={item.custom_few_wt}
                        // onChange={(e) =>
                        //   handleFieldChange(
                        //     item.idx,
                        //     'tableRow',
                        //     'custom_few_wt',
                        //     e.target.value
                        //   )
                        // }
                        // readOnly={readOnlyFields}
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
                        // readOnly={readOnlyFields}
                        // onChange={(e) =>
                        //   handleFieldChange(
                        //     item.idx,
                        //     'tableRow',
                        //     'custom_mat_wt',
                        //     e.target.value
                        //   )
                        // }
                        // onKeyDown={(e) => handleModal(e, item.idx, item)}
                      />
                    </td>
                    <td className="table_row">
                      <input
                        className={` ${styles.input_field} `}
                        type="number"
                        readOnly
                        disabled
                        name={`sum-${i + 1}`}
                        //   value={
                        //     Number(tableData[i]?.custom_net_wt) +
                        //     Number(tableData[i]?.custom_few_wt) +
                        //     Number(tableData[i]?.custom_mat_wt)
                        //   }
                      />
                    </td>

                    <td className="table_row">
                      <input
                        //   className={` ${styles.input_field} `}
                        type="number"
                        value={Number(item.custom_other)}
                        defaultValue={Number(item.custom_other)}
                        //   onChange={(e) => {
                        //     calculateEditTotal(item.idx, e.target.value);
                        //   }}
                        //   readOnly={readOnlyFields}
                      />
                    </td>
                    <td className="table_row">
                      {' '}
                      <input
                        //   className={` ${styles.input_field} `}
                        type="number"
                        readOnly
                        disabled
                        name={`sum-${i + 1}`}
                        //   defaultValue={tableData[i]?.custom_total}
                        //   value={
                        //     Number(tableData[i].totalAmount) >= 0
                        //       ? Number(tableData[i]?.custom_other) +
                        //         Number(tableData[i]?.totalAmount)
                        //       : tableData[i]?.custom_total !== '' &&
                        //         tableData[i]?.custom_total !== undefined
                        //       ? tableData[i]?.custom_total
                        //       : tableData[i]?.custom_other
                        //   }
                      />
                    </td>

                    <td className="table_row"></td>
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
