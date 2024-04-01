import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { get_access_token } from '@/store/slices/auth/login-slice';
import getDeliveryNoteListing from '@/services/api/Sales/get-delivery-note-listing-api';

const useCustomCustomerSalesHook = () => {
  const loginAcessToken = useSelector(get_access_token);
  const SalesTableInitialState: any = {
    idx: 1,
    custom_pr_bb_wt: '',
    custom_pr_cs_wt: '',
    custom_pr_kun_wt: '',
    custom_pr_other_wt: '',
    item_code: '',
    custom_gross_wt: 0,
    custom_kun_wt: '',
    custom_cs_wt: '',
    custom_bb_wt: '',
    custom_other_wt: '',
    custom_net_wt: '',
    custom_cs: '',
    custom_cs_amt: 0,
    custom_kun_pc: '',
    custom_kun: '',
    custom_kun_amt: 0,
    custom_ot_: '',
    custom_ot_amt: 0,
    custom_other: '',
    custom_amount: 0,
    warehouse: '',
  };
  const [kunCsOtFixedAmt, setKunCsOtFixedAmt] = useState({
    csFixedAmt: 0,
    kunFixedAmt: 0,
    otFixedAmt: 0,
  });
  const [stateForDocStatus, setStateForDocStatus] = useState<boolean>(false);
  const [selectedCategory, setSeletedCategory] = useState<any>({
    KunCategory: '',
    CsCategory: '',
    BBCategory: '',
    OtCategory: '',
  });

  const [selectedItemCodeForCustomerSale, setSelectedItemCodeForCustomerSale] =
    useState<any>({ id: '', item_code: '' });
  const [selectedClient, setSelectedClient] = useState<string>('');
  const [salesTableData, setSalesTableData] = useState<any>([
    SalesTableInitialState,
  ]);
  const [itemCodeDropdownReset, setItemCodeDropdownReset] =
    useState<boolean>(false);

  const handleAddRowForSales: any = () => {
    const newRow: any = {
      idx: salesTableData?.length + 1,
      custom_pr_bb_wt: '',
      custom_pr_cs_wt: '',
      custom_pr_kun_wt: '',
      custom_pr_other_wt: '',
      item_code: '',
      custom_gross_wt: 0,
      custom_kun_wt: '',
      custom_cs_wt: '',
      custom_bb_wt: '',
      custom_other_wt: '',
      custom_net_wt: '',
      custom_cs: Number(kunCsOtFixedAmt?.csFixedAmt),
      custom_cs_amt: 0,
      custom_kun_pc: '',
      custom_kun: Number(kunCsOtFixedAmt?.kunFixedAmt),
      custom_kun_amt: 0,
      custom_ot_: Number(kunCsOtFixedAmt?.otFixedAmt),
      custom_ot_amt: 0,
      custom_other: '',
      custom_amount: 0,
      warehouse: '',
    };

    setSalesTableData([...salesTableData, newRow]);
    setStateForDocStatus(true);
  };

  const handleEmptyDeliveryNote = () => {
    setSeletedCategory({
      KunCategory: '',
      CsCategory: '',
      BBCategory: '',
      OtCategory: '',
    });
    setKunCsOtFixedAmt({
      csFixedAmt: 0,
      kunFixedAmt: 0,
      otFixedAmt: 0,
    });
    setSelectedClient('');
    setSalesTableData([SalesTableInitialState]);
    setSelectedItemCodeForCustomerSale({ id: '', item_code: '' });
    setStateForDocStatus(true);
    setItemCodeDropdownReset(true);
  };

  const updateSalesTableData = (data: any) => {
    if (selectedItemCodeForCustomerSale?.id) {
      // Assuming data is a list with a single object
      const updatedTable = salesTableData?.map((tableData: any) => {
        if (tableData.idx === selectedItemCodeForCustomerSale.id) {
          return {
            ...tableData,
            custom_gross_wt: data[0]?.custom_gross_wt,
            custom_kun_wt: Number(
              selectedCategory.KunCategory !== '' &&
                selectedCategory?.KunCategory !== undefined
                ? (data[0]?.custom_kun_wt * selectedCategory.KunCategory.type) /
                    100
                : data[0]?.custom_kun_wt
            ),
            custom_cs_wt: Number(
              selectedCategory.CsCategory !== '' &&
                selectedCategory?.CsCategory !== undefined
                ? (data[0]?.custom_cs_wt * selectedCategory.CsCategory.type) /
                    100
                : data[0]?.custom_cs_wt
            ),
            custom_bb_wt: Number(
              selectedCategory.BBCategory !== '' &&
                selectedCategory?.BBCategory !== undefined
                ? data[0]?.custom_bb_wt - selectedCategory.BBCategory.type
                : data[0].custom_bb_wt
            ),
            custom_other_wt: Number(
              selectedCategory.OtCategory !== '' &&
                selectedCategory?.OtCategory !== undefined
                ? (data[0]?.custom_other_wt *
                    selectedCategory.OtCategory.type) /
                    100
                : data[0]?.custom_other_wt
            ),

            custom_net_wt:
              Number(data.custom_gross_wt) -
              Number(
                data.custom_kun_wt +
                  data.custom_cs_wt +
                  data.custom_bb_wt +
                  data.custom_other_wt
              ),

            custom_kun_pc: Number(data[0]?.custom_kun_pcs),
            custom_pr_kun_wt: Number(data[0]?.custom_kun_wt),
            custom_pr_cs_wt: Number(data[0]?.custom_cs_wt),
            custom_pr_bb_wt: Number(data[0]?.custom_bb_wt),
            custom_pr_other_wt: Number(data[0]?.custom_other_wt),
            warehouse: data[0].custom_warehouse,
          };
        } else {
          return tableData;
        }
      });

      setSalesTableData(updatedTable);
    }
  };
  const handleDeleteRowOfSalesTable: any = (id: any) => {
    if (salesTableData?.length > 1) {
      const updatedData =
        salesTableData?.length > 0 &&
        salesTableData !== null &&
        salesTableData
          .filter((item: any) => item.idx !== id)
          .map((row: any, index: number) => ({ ...row, idx: index + 1 }));
      setSalesTableData(updatedData);
      setStateForDocStatus(true);
    }
  };

  const handleFixedAmt = (e: any) => {
    const { name, value } = e.target;
    setKunCsOtFixedAmt({ ...kunCsOtFixedAmt, [name]: value });

    setSalesTableData((prevData: any) => {
      return prevData.map((item: any, i: number) => {
        return {
          ...item,
          custom_cs: Number(name === 'csFixedAmt' ? value : item?.custom_cs),
          custom_kun: Number(name === 'kunFixedAmt' ? value : item?.custom_kun),
          custom_ot_: Number(name === 'otFixedAmt' ? value : item?.custom_ot_),
          custom_amount: Number(
            Number(item[i]?.custom_cs_amt) +
              Number(item[i]?.custom_kun_amt) +
              Number(item[i]?.custom_ot_amt) +
              Number(item[i]?.custom_other)
          ),
        };
      });
    });
    setStateForDocStatus(true);
  };

  return {
    handleAddRowForSales,
    salesTableData,
    SalesTableInitialState,
    setSalesTableData,
    setStateForDocStatus,
    kunCsOtFixedAmt,
    setKunCsOtFixedAmt,
    stateForDocStatus,
    handleEmptyDeliveryNote,
    selectedCategory,
    setSeletedCategory,
    setSelectedClient,
    setItemCodeDropdownReset,
    selectedClient,
    selectedItemCodeForCustomerSale,
    setSelectedItemCodeForCustomerSale,
    itemCodeDropdownReset,
    updateSalesTableData,
    handleDeleteRowOfSalesTable,
    handleFixedAmt,
  };
};
export default useCustomCustomerSalesHook;
