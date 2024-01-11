import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styles from '../../../styles/readyReceipts.module.css';
import SelectInputKunKarigar from '@/components/SearchSelectInputField/SelectInputKunKarigar';

const CustomerSalesTable = ({
  salesTableData,
  setSalesTableData,
  selectedItemCodeForCustomerSale,
  setSelectedItemCodeForCustomerSale,
  handleSalesTableFieldChange,
  handleAddRowForSales,
  handleDeleteRowOfSalesTable,
  setStateForDocStatus,
  readOnlyFields,
  itemList,
  itemCodeDropdownReset,
  setItemCodeDropdownReset,
  selectedItemCode,
  setSelectedItemCode,
}: any) => {
  console.log(salesTableData, 'selected name and value');
  return (
    <>
      <div className="container d-flex justify-content-end px-1">
        <button
          className="btn btn-link p-0"
          onClick={() => {
            if (!readOnlyFields) {
              handleAddRowForSales();
            }
          }}
        >
          Add Row
        </button>
      </div>
      <div className="table responsive">
        <table className="table table-hover table-bordered">
          <thead>
            <tr>
              <th className="thead" scope="col">
                No.
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
                    <td className="table_row">{item?.idx}</td>
                    <td className="table_row">
                      <SelectInputKunKarigar
                        kundanKarigarData={
                          itemList?.length > 0 &&
                          itemList !== null &&
                          itemList.map((data: any) => ({
                            karigar_name: data.name,
                          }))
                        }
                        kunKarigarDropdownReset={itemCodeDropdownReset}
                        setKunKarigarDropdownReset={setItemCodeDropdownReset}
                        defaultValue={item?.item_code}
                        tableData={salesTableData}
                        setTableData={setSalesTableData}
                        selectedItemCodeForCustomerSale={
                          selectedItemCodeForCustomerSale
                        }
                        setSelectedItemCodeForCustomerSale={
                          setSelectedItemCodeForCustomerSale
                        }
                        placeholderValue="Item code"
                        fieldName={'item_code'}
                        item={item}
                        id={item?.idx}
                        setStateForDocStatus={setStateForDocStatus}
                        readOnlyFields={readOnlyFields}
                        selectedKundanKarigarDropdownValue={selectedItemCode}
                        setSelectedKundanKarigarDropdownValue={
                          setSelectedItemCode
                        }
                      />
                    </td>
                    <td className="table_row">
                      <input
                        className={` ${styles.customer_sale_input_field} `}
                        type="number"
                        value={item?.custom_gross_wt}
                        defaultValue={item?.custom_gross_wt}
                        onChange={(e) =>
                          handleSalesTableFieldChange(
                            item.idx,
                            'custom_gross_wt',
                            e.target.value
                          )
                        }
                        readOnly
                        disabled
                      />
                    </td>

                    <td className="table_row">
                      <input
                        className={` ${styles.customer_sale_input_field} `}
                        type="number"
                        value={item?.custom_kun_wt}
                        defaultValue={item?.custom_kun_wt}
                        onChange={(e) =>
                          handleSalesTableFieldChange(
                            item.idx,
                            'custom_kun_wt',
                            e.target.value
                          )
                        }
                        readOnly={readOnlyFields}
                      />
                    </td>
                    <td className="table_row">
                      <input
                        className={` ${styles.customer_sale_input_field} `}
                        type="number"
                        value={item.custom_cs_wt}
                        defaultValue={item.custom_cs_wt}
                        readOnly={readOnlyFields}
                        onChange={(e) =>
                          handleSalesTableFieldChange(
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
                        className={` ${styles.customer_sale_input_field} `}
                        type="number"
                        value={parseFloat(item.custom_bb_wt).toFixed(3)}
                        defaultValue={item.custom_bb_wt}
                        readOnly={readOnlyFields}
                        onChange={(e) =>
                          handleSalesTableFieldChange(
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
                        className={` ${styles.customer_sale_input_field} `}
                        type="number"
                        value={item.custom_other_wt}
                        // value={
                        //   selectedCategory.OtCategory !== ''
                        //     ? (item.custom_other_wt *
                        //         item.custom_other_wt *
                        //         selectedCategory.OtCategory.type) /
                        //       100
                        //     : item.custom_other_wt
                        // }
                        defaultValue={item.custom_other_wt}
                        readOnly={readOnlyFields}
                        onChange={(e) =>
                          handleSalesTableFieldChange(
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
                        className={` ${styles.customer_sale_input_field} `}
                        type="number"
                        value={
                          Number(item.custom_gross_wt) -
                            (Number(item.custom_kun_wt) +
                              Number(item.custom_cs_wt) +
                              Number(item.custom_bb_wt) +
                              Number(item.custom_other_wt)) <
                          0
                            ? 0
                            : Number(item.custom_gross_wt) -
                              (Number(item.custom_kun_wt) +
                                Number(item.custom_cs_wt) +
                                Number(item.custom_bb_wt) +
                                Number(item.custom_other_wt))
                        }
                        defaultValue={item.custom_net_wt}
                        readOnly
                        onChange={(e) =>
                          handleSalesTableFieldChange(
                            item.idx,
                            'custom_net_wt',
                            e.target.value
                          )
                        }
                        disabled
                      />
                    </td>
                    <td className="table_row">
                      <input
                        className={` ${styles.customer_sale_input_field} `}
                        type="number"
                        value={item.custom_cs}
                        defaultValue={item.custom_cs}
                        readOnly={readOnlyFields}
                        onChange={(e) =>
                          handleSalesTableFieldChange(
                            item.idx,
                            'custom_cs',
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td className="table_row">
                      <input
                        className={` ${styles.customer_sale_input_field} `}
                        type="number"
                        value={(Number(item.custom_cs_wt) !== 0
                          ? Number(item.custom_cs) * Number(item.custom_cs_wt)
                          : Number(item.custom_cs)
                        )?.toFixed(2)}
                        defaultValue={item.custom_cs_amt}
                        readOnly
                        onChange={(e) =>
                          handleSalesTableFieldChange(
                            item.idx,
                            'custom_cs_amt',
                            e.target.value
                          )
                        }
                        disabled
                      />
                    </td>
                    <td className="table_row">
                      <input
                        className={` ${styles.customer_sale_input_field} `}
                        type="number"
                        value={item.custom_kun_pc}
                        defaultValue={item.custom_kun_pc}
                        readOnly={readOnlyFields}
                        onChange={(e) =>
                          handleSalesTableFieldChange(
                            item.idx,
                            'custom_kun_pc',
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td className="table_row">
                      <input
                        className={` ${styles.customer_sale_input_field} `}
                        type="number"
                        value={item.custom_kun}
                        defaultValue={item.custom_kun}
                        readOnly={readOnlyFields}
                        onChange={(e) =>
                          handleSalesTableFieldChange(
                            item.idx,
                            'custom_kun',
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td className="table_row">
                      <input
                        className={` ${styles.customer_sale_input_field} `}
                        type="number"
                        value={(
                          Number(item.custom_kun_pc) * Number(item.custom_kun)
                        )?.toFixed(2)}
                        defaultValue={item.custom_kun_amt}
                        readOnly
                        onChange={(e) =>
                          handleSalesTableFieldChange(
                            item.idx,
                            'custom_kun_amt',
                            e.target.value
                          )
                        }
                        disabled
                      />
                    </td>
                    <td className="table_row">
                      <input
                        className={` ${styles.customer_sale_input_field} `}
                        type="number"
                        value={item.custom_ot_}
                        defaultValue={item.custom_ot_}
                        readOnly={readOnlyFields}
                        onChange={(e) =>
                          handleSalesTableFieldChange(
                            item.idx,
                            'custom_ot_',
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td className="table_row">
                      <input
                        className={` ${styles.customer_sale_input_field} `}
                        type="number"
                        value={(
                          Number(item.custom_other_wt) * Number(item.custom_ot_)
                        )?.toFixed(2)}
                        defaultValue={item.custom_ot_amt}
                        readOnly
                        onChange={(e) =>
                          handleSalesTableFieldChange(
                            item.idx,
                            'custom_ot_amt',
                            e.target.value
                          )
                        }
                        disabled
                      />
                    </td>
                    <td className="table_row">
                      <input
                        className={` ${styles.customer_sale_input_field} `}
                        type="number"
                        value={item.custom_other}
                        defaultValue={item.custom_other}
                        readOnly={readOnlyFields}
                        onChange={(e) =>
                          handleSalesTableFieldChange(
                            item.idx,
                            'custom_other',
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td className="table_row">
                      <input
                        className={` ${styles.customer_sale_input_field} `}
                        type="number"
                        value={(
                          Number(item.custom_cs_amt) +
                          Number(item?.custom_kun_amt) +
                          Number(item.custom_ot_amt) +
                          Number(item.custom_other)
                        )?.toFixed(2)}
                        defaultValue={item.custom_amount}
                        readOnly
                        onChange={(e) =>
                          handleSalesTableFieldChange(
                            item.idx,
                            'custom_amount',
                            e.target.value
                          )
                        }
                        disabled
                      />
                    </td>
                    <td className="table_row">
                      <button
                        className="d-flex align-items-center delete-link p-1 border-0"
                        onClick={() => handleDeleteRowOfSalesTable(item.idx)}
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
