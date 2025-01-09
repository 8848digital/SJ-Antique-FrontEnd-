import getClientDetailsApi from '@/services/api/Sales/get-client-details-api';
import { get_access_token } from '@/store/slices/auth/login-slice';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

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
    KunCategory: {},
    CsCategory: {},
    BbCategory: {},
    OtCategory: {},
  });

  const [selectedItemCodeForCustomerSale, setSelectedItemCodeForCustomerSale] =
    useState<any>({ id: '', item_code: '' });
  const [selectedClient, setSelectedClient] = useState<string>('');
  const [salesTableData, setSalesTableData] = useState<any>([
    SalesTableInitialState,
  ]);
  const [itemCodeDropdownReset, setItemCodeDropdownReset] =
    useState<boolean>(false);

  const newRowDataForSalesTable: any = {
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

  const handleAddRowForSales: any = () => {
    setSalesTableData([...salesTableData, newRowDataForSalesTable]);
    setStateForDocStatus(true);
  };

  const handleEmptyDeliveryNote = () => {
    setSeletedCategory({
      KunCategory: {},
      CsCategory: {},
      BbCategory: {},
      OtCategory: {},
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


  const getClientDetails: any = async () => {
    let getClientDetails: any = await getClientDetailsApi(loginAcessToken?.token, selectedClient)
    if (getClientDetails?.data?.message?.status === "success") {
      let categoryData: any = getClientDetails?.data?.message?.data
      setSeletedCategory({
        KunCategory: { name1: categoryData?.kundan_category?.name, type: categoryData?.kundan_category?.type },
        CsCategory: { name1: categoryData?.cs_category?.name, type: categoryData?.cs_category?.type },
        OtCategory: { name1: categoryData?.ot_category?.name, type: categoryData?.ot_category?.type },
        BbCategory: { name1: categoryData?.bb_category?.name, type: categoryData?.bb_category?.type },
      })
      updateSalesTableData()
    }
  }
  useEffect(() => {
    getClientDetails()
  }, [selectedClient])

  const updateSalesTableData = (data?: any, id?: number, updateRow?: boolean) => {
    // console.log("id", data, id)
    // console.log("sele category for calculation", selectedItemCodeForCustomerSale, addNewRow)
    // console.log({ data })

    if (id) {
      setSeletedCategory({
        KunCategory: {},
        CsCategory: {},
        BbCategory: {},
        OtCategory: {},
      })
      setSalesTableData((prevSalesTableData: any) => {
        const updatedTable = prevSalesTableData?.map((tableData: any) => {
          if (tableData.idx === id) {

            return {
              ...tableData,
              custom_gross_wt: data?.custom_gross_wt,
              custom_kun_wt: updateRow === true && tableData?.custom_kun_wt !== "" && tableData?.custom_kun_wt !== 0 && Number(
                (selectedCategory?.KunCategory && Object.keys(selectedCategory?.KunCategory)?.length > 0)
                  ? (data?.custom_kun_wt *
                    selectedCategory?.KunCategory?.type) /
                  100
                  : data?.custom_kun_wt
              ),
              custom_cs_wt: updateRow === true && tableData?.custom_cs_wt !== "" && tableData?.custom_cs_wt !== 0 && Number(
                (selectedCategory.CsCategory && Object.keys(selectedCategory.CsCategory)?.length > 0)
                  ? (data?.custom_cs_wt *
                    selectedCategory?.CsCategory?.type) /
                  100
                  : data?.custom_cs_wt
              ),
              custom_bb_wt: updateRow === true && tableData?.custom_bb_wt !== "" && tableData?.custom_bb_wt !== 0 && Number(
                (selectedCategory?.BbCategory && Object.keys(selectedCategory?.BbCategory)?.length > 0)
                  ? data?.custom_bb_wt - selectedCategory?.BbCategory?.type
                  : data.custom_bb_wt
              ),
              custom_other_wt:
                updateRow === true &&
                  tableData?.custom_other_wt !== "" &&
                  tableData?.custom_other_wt !== 0 &&
                  (selectedCategory?.OtCategory && Object.keys(selectedCategory?.OtCategory)?.length > 0)
                  ? Number(
                    (data?.custom_other_wt * selectedCategory?.OtCategory?.type) / 100
                  )
                  : data?.custom_other_wt,

              custom_net_wt:
                Number(data?.custom_gross_wt) -
                (Number(data?.custom_kun_wt) +
                  Number(data?.custom_cs_wt) +
                  Number(data?.custom_bb_wt) +
                  Number(data?.custom_other_wt)),
              custom_kun_pc: Number(data?.custom_kun_pcs),
              custom_pr_kun_wt: Number(data?.custom_kun_wt),
              custom_pr_cs_wt: Number(data?.custom_cs_wt),
              custom_pr_bb_wt: Number(data?.custom_bb_wt),
              custom_pr_other_wt: Number(data?.custom_other_wt),
              warehouse: data.custom_warehouse,
            };
          } else {
            return tableData;
          }
        });

        return updatedTable;
      });

      // Update state with new row
      if (updateRow) {
        setSalesTableData((prevSalesTableData: any) => {
          const lastRow = prevSalesTableData[prevSalesTableData.length - 1];
          const isEmpty = Object.values(lastRow).every(
            (value) => value === null || value === ''
          );

          if (isEmpty) {
            return prevSalesTableData;
          } else {
            return [...prevSalesTableData, newRowDataForSalesTable];
          }
        });

      }
    }
  };

  const updateBarcodeSalesTableData = (data: any, id?: number, addNewRow?: any) => {
    if (id) {
      setSalesTableData((prevSalesTableData: any) => {
        const updatedData = prevSalesTableData?.map((item: any) => {
          if (item.idx === id) {
            return {
              ...item,
              item_code: data?.item_code,
              custom_gross_wt: data?.custom_gross_wt,
              custom_kun_wt: data?.custom_kun_wt,
              custom_cs_wt: data?.custom_cs_wt,
              custom_bb_wt: data?.custom_bb_wt,
              custom_other_wt: data?.custom_other_wt,
              custom_net_wt: data?.custom_net_wt,
              custom_cs: data?.custom_cs,
              custom_cs_amt: data?.custom_cs_amt,
              custom_kun_pc: data?.custom_kun_pc,
              custom_kun: data?.custom_kun,
              custom_kun_amt: data?.custom_kun_amt,
              custom_ot_: data?.custom_ot_,
              custom_ot_amt: data?.custom_ot_amt,
              custom_other: data?.custom_other,
              custom_amount: data?.custom_amount,
            };
          } else {
            return item;
          }
        });
        return updatedData;
      });

      // Update state with new row
      if (addNewRow) {
        setSalesTableData((prevSalesTableData: any) => {
          const lastRow = prevSalesTableData[prevSalesTableData.length - 1];
          const isEmpty = Object.values(lastRow).every(
            (value) => value === null || value === ''
          );

          if (isEmpty) {
            return prevSalesTableData;
          } else {
            return [...prevSalesTableData, newRowDataForSalesTable];
          }
        });
      }
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
    updateBarcodeSalesTableData,
  };
};
export default useCustomCustomerSalesHook;
