import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styles from '../../../styles/readyReceipts.module.css';
import SelectInputKunKarigar from '@/components/SearchSelectInputField/SelectInputKunKarigar';
import SalesTableHeader from './SalesTableHeader';

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
  handleTabPressInSales,
  kunCsOtFixedAmt,
  HandleFixedAmt,
  showAddrowBtn,
  scrollableTableRef,
  handleMouseDown,
  handleMouseUp,
  handleMouseLeave,
  handleMouseMove,
}: any) => {
  console.log(salesTableData, 'selected name and value');
  return (
    <>
      {showAddrowBtn === true && (
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
      )}

      <div className="table responsive">
        <div
          ref={scrollableTableRef}
          className="scrollable-table-container"
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          <table className="table table-hover table-bordered cursor">
            <thead>
              {/* <tr className={`${styles.table_row} border-0`}>
              <td className="table_row border-0"></td>
              <td className="table_row border-0"></td>
              <td className="table_row border-0"></td>
              <td className="table_row border-0"></td>
              <td className="table_row border-0"></td>
              <td className="table_row border-0"></td>
              <td className="table_row border-0"></td>
              <td className="table_row border-0"></td>
              <td className="table_row border-0">
                <input
                  type="text"
                  name="csFixedAmt"
                  className={` ${styles.customer_sale_input_field} text-end `}
                  min={0}
                  value={kunCsOtFixedAmt?.csFixedAmt}
                  onChange={(e) => HandleFixedAmt(e)}
                />
              </td>
              <td className="table_row border-0"></td>
              <td className="table_row border-0"></td>
              <td className="table_row border-0">
                <input
                  type="text"
                  name="kunFixedAmt"
                  className={` ${styles.customer_sale_input_field} text-end `}
                  min={0}
                  value={kunCsOtFixedAmt?.kunFixedAmt}
                  onChange={(e) => HandleFixedAmt(e)}
                />
              </td>
              <td className="table_row border-0"></td>
              <td className="table_row border-0">
                <input
                  type="text"
                  name="otFixedAmt"
                  className={` ${styles.customer_sale_input_field} text-end `}
                  min={0}
                  value={kunCsOtFixedAmt?.otFixedAmt}
                  onChange={(e) => HandleFixedAmt(e)}
                />
              </td>
              <td className="table_row border-0"></td>
            </tr> */}
              <SalesTableHeader />
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
                            setSelectedItemCodeForCustomerSale
                          }
                        />
                      </td>
                      <td className="table_row">
                        <input
                          className={` ${styles.customer_sale_input_field} text-end `}
                          type="number"
                          min={0}
                          value={Number(
                            item?.custom_gross_wt !== '' &&
                              item?.custom_gross_wt
                          )?.toFixed(3)}
                          defaultValue={Number(
                            item?.custom_gross_wt !== '' &&
                              item?.custom_gross_wt
                          )?.toFixed(3)}
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
                          className={` ${styles.customer_sale_input_field} text-end `}
                          type="number"
                          min={0}
                          value={Number(item?.custom_kun_wt)}
                          defaultValue={Number(item?.custom_kun_wt)}
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
                          className={` ${styles.customer_sale_input_field} text-end `}
                          type="number"
                          min={0}
                          value={Number(item.custom_cs_wt)}
                          defaultValue={Number(item.custom_cs_wt)}
                          readOnly={readOnlyFields}
                          onChange={(e) =>
                            handleSalesTableFieldChange(
                              item.idx,
                              'custom_cs_wt',
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td className="table_row">
                        <input
                          className={` ${styles.customer_sale_input_field} text-end `}
                          type="number"
                          min={0}
                          value={Number(
                            item.custom_bb_wt < 0 ? 0 : item.custom_bb_wt
                          )}
                          defaultValue={Number(item.custom_bb_wt)}
                          readOnly={readOnlyFields}
                          onChange={(e) =>
                            handleSalesTableFieldChange(
                              item.idx,
                              'custom_bb_wt',
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td className="table_row">
                        <input
                          className={` ${styles.customer_sale_input_field} text-end `}
                          type="number"
                          min={0}
                          value={Number(item.custom_other_wt)}
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
                          className={` ${styles.customer_sale_input_field} text-end `}
                          type="number"
                          min={0}
                          value={Number(
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
                          )?.toFixed(3)}
                          defaultValue={Number(item.custom_net_wt)?.toFixed(3)}
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
                          className={` ${styles.customer_sale_input_field} text-end `}
                          type="number"
                          min={0}
                          value={Number(item.custom_cs)}
                          defaultValue={Number(item.custom_cs)}
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
                          className={` ${styles.customer_sale_input_field} text-end `}
                          type="number"
                          min={0}
                          value={Number(
                            Number(item.custom_cs) * Number(item.custom_cs_wt)
                          )}
                          defaultValue={Number(item.custom_cs_amt)}
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
                          className={` ${styles.customer_sale_input_field} text-end `}
                          type="number"
                          min={0}
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
                          className={` ${styles.customer_sale_input_field} text-end `}
                          type="number"
                          min={0}
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
                          className={` ${styles.customer_sale_input_field} text-end `}
                          type="number"
                          min={0}
                          value={(
                            Number(item.custom_kun_pc) * Number(item.custom_kun)
                          )?.toFixed(3)}
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
                          className={` ${styles.customer_sale_input_field} text-end `}
                          type="number"
                          min={0}
                          value={Number(item.custom_ot_)}
                          defaultValue={Number(item.custom_ot_)}
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
                          className={` ${styles.customer_sale_input_field} text-end `}
                          type="number"
                          min={0}
                          value={Number(
                            Number(item.custom_other_wt) *
                              Number(item.custom_ot_)
                          )?.toFixed(3)}
                          defaultValue={Number(
                            Number(item.custom_other_wt) *
                              Number(item.custom_ot_)
                          )?.toFixed(3)}
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
                          className={` ${styles.customer_sale_input_field} text-end `}
                          type="number"
                          min={0}
                          value={Number(item.custom_other)}
                          defaultValue={Number(item.custom_other)}
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
                          className={` ${styles.customer_sale_input_field} text-end `}
                          type="number"
                          min={0}
                          value={Number(
                            (Number.isNaN(item.custom_cs_amt)
                              ? 0
                              : Number(item?.custom_cs_amt)) +
                              Number(item?.custom_kun_amt) +
                              (Number.isNaN(item.custom_ot_amt)
                                ? 0
                                : Number(item?.custom_ot_amt)) +
                              Number(item?.custom_other)
                          )?.toFixed(3)}
                          defaultValue={Number(
                            Number(item?.custom_cs_amt) +
                              Number(item?.custom_kun_amt) +
                              Number(item?.custom_ot_amt) +
                              Number(item?.custom_other)
                          )}
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
                          onKeyDown={(e) => handleTabPressInSales(e, item.idx)}
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
      </div>
    </>
  );
};

export default CustomerSalesTable;
