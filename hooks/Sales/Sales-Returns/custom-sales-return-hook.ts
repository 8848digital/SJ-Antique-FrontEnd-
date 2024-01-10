import React, { useState } from 'react';

const UseCustomSalesReturnHook = () => {
  const [selectedItemCodeForCustomerSale, setSelectedItemCodeForCustomerSale] =
    useState<any>({ id: '', item_code: '' });
  const SalesTableInitialState: any = {
    idx: 1,
    // kun_wt_initial: '',
    // cs_wt_initial: '',
    // bb_wt_initial: '',
    // ot_wt_initial: '',
    item_code: '',
    custom_gross_wt: '',
    custom_kun_wt: '',
    custom_cs_wt: '',
    custom_bb_wt: '',
    custom_other_wt: '',
    custom_net_wt: '',
    custom_cs: '',
    custom_cs_amt: '',
    custom_kun_pc: '',
    custom_kun: '',
    custom_kun_amt: '',
    custom_ot_: '',
    custom_ot_amt: '',
    custom_other: '',
    custom_amount: 0,
    warehouse: '',
  };

  const [salesReturnTableData, setSalesReturnTableData] = useState<any>([
    SalesTableInitialState,
  ]);
  const [stateForDocStatus, setStateForDocStatus] = useState<boolean>(false);
  const [selectedClient, setSelectedClient] = useState<string>('');
  const [selectedClientGroup, setSelectedClientGroup] = useState<string>('');
  const [itemCodeDropdownReset, setItemCodeDropdownReset] =
    useState<boolean>(false);

  const handleSalesReturnTableFieldChange: any = (
    itemIdx: number,
    fieldName: string,
    value: any
  ) => {
    setSalesReturnTableData((prevData: any) => {
      return prevData.map((item: any) => {
        if (item.idx === itemIdx) {
          // Update the field value
          return {
            ...item,
            [fieldName]: value,

            custom_net_wt:
              Number(item.custom_gross_wt) -
              (Number(item.custom_kun_wt) +
                Number(item.custom_cs_wt) +
                Number(item.custom_bb_wt) +
                Number(item.custom_other_wt)),
            custom_cs_amt:
              fieldName === 'custom_cs'
                ? value * Number(item.custom_cs_wt)
                : item.custom_cs_amt,
            custom_kun_amt:
              fieldName === 'custom_kun'
                ? item?.custom_kun === ''
                  ? 1 * value
                  : Number(item?.custom_kun_pc) * value
                : fieldName === 'custom_kun_pc'
                ? item.custom_kun === ''
                  ? 1 * value
                  : Number(item.custom_kun) * value
                : item.custom_kun_amt,
            custom_ot_amt:
              fieldName === 'custom_ot_'
                ? Number(item.custom_other_wt) * value
                : item.custom_ot_amt,
          };
        } else {
          return item;
        }
      });
    });
    setStateForDocStatus(true);
  };

  const handleAddRowForSalesReturn: any = () => {
    const newRow: any = {
      idx: salesReturnTableData?.length + 1,
      item_code: '',
      custom_gross_wt: '',
      custom_kun_wt: '',
      custom_cs_wt: '',
      custom_bb_wt: '',
      custom_other_wt: '',
      custom_net_wt: '',
      custom_cs: '',
      custom_cs_amt: '',
      custom_kun_pc: '',
      custom_kun: '',
      custom_kun_amt: '',
      custom_ot_: '',
      custom_ot_amt: 0,
      custom_other: '',
      custom_amount: 0,
    };

    setSalesReturnTableData([...salesReturnTableData, newRow]);
    setStateForDocStatus(true);
  };

  const handleDeleteRowOfSalesReturnTable: any = (id: any) => {
    console.log('delete row id', id);
    if (salesReturnTableData?.length > 1) {
      const updatedData = salesReturnTableData
        .filter((item: any) => item.idx !== id)
        .map((row: any, index: number) => ({ ...row, idx: index + 1 }));
      setSalesReturnTableData(updatedData);
      setStateForDocStatus(true);
    }
  };

  const handleEmptySaleReturnData = () => {
    // setSeletedCategory({
    //  KunCategory: '',
    //   CsCategory: '',
    //   BBCategory: '',
    //   OtCategory: '',
    // });
    setSelectedClient('');
    setSalesReturnTableData([SalesTableInitialState]);
    setSelectedItemCodeForCustomerSale({ id: '', item_code: '' });
    setStateForDocStatus(true);
    setItemCodeDropdownReset(true);
  };

  const handleSelectClientGroup = async (value: any) => {
    setSelectedClientGroup(value);
  };
  return {
    salesReturnTableData,
    setSalesReturnTableData,
    selectedItemCodeForCustomerSale,
    setSelectedItemCodeForCustomerSale,
    handleSalesReturnTableFieldChange,
    handleAddRowForSalesReturn,
    handleDeleteRowOfSalesReturnTable,
    stateForDocStatus,
    handleEmptySaleReturnData,
    itemCodeDropdownReset,
    selectedClient,
    setSelectedClient,
    selectedClientGroup,
    handleSelectClientGroup,
    SalesTableInitialState,
  };
};

export default UseCustomSalesReturnHook;
