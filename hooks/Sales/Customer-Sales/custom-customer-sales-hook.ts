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
    KunCategory: '',
    CsCategory: '',
    BbCategory: '',
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
      KunCategory: '',
      CsCategory: '',
      BbCategory: '',
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


  const getClientDetails: any = async () => {
    let getClientDetails: any = await getClientDetailsApi(loginAcessToken?.token, selectedClient)
    console.log({ getClientDetails })
    if (getClientDetails?.data?.message?.status === "success") {
      let categoryData: any = getClientDetails?.data?.message?.data
      setSeletedCategory({
        KunCategory: { name1: categoryData?.kundan_category, type: categoryData?.kundan_category },
        CsCategory: { name1: categoryData?.cs_category, type: 40 },
        BbCategory: { name1: categoryData?.bb_category, type: 20 },
        OtCategory: { name1: categoryData?.ot_category, type: 40 },
      })
    }
  }
  useEffect(() => {
    getClientDetails()
  }, [selectedClient])
  console.log({ selectedCategory })

  const updateSalesTableData = (data: any, id?: number) => {
    console.log("id", id)
    if (id) {
      setSalesTableData((prevSalesTableData: any) => {
        const updatedTable = prevSalesTableData?.map((tableData: any) => {
          if (tableData.idx === id) {
            return {
              ...tableData,
              custom_gross_wt: data[0]?.custom_gross_wt,
              custom_kun_wt: Number(
                selectedCategory.KunCategory !== '' &&
                  selectedCategory?.KunCategory !== null
                  ? (data[0]?.custom_kun_wt *
                    selectedCategory.KunCategory?.type) /
                  100
                  : data[0]?.custom_kun_wt
              ),
              custom_cs_wt: Number(
                selectedCategory.CsCategory !== '' &&
                  selectedCategory?.CsCategory !== null
                  ? (data[0]?.custom_cs_wt *
                    selectedCategory.CsCategory?.type) /
                  100
                  : data[0]?.custom_cs_wt
              ),
              custom_bb_wt: Number(
                selectedCategory.BbCategory !== '' &&
                  selectedCategory?.BbCategory !== null
                  ? data[0]?.custom_bb_wt - selectedCategory.BbCategory?.type
                  : data[0].custom_bb_wt
              ),
              custom_other_wt: Number(
                selectedCategory.OtCategory !== '' &&
                  selectedCategory?.OtCategory !== null
                  ? (data[0]?.custom_other_wt *
                    selectedCategory.OtCategory?.type) /
                  100
                  : data[0]?.custom_other_wt
              ),
              custom_net_wt:
                Number(data[0]?.custom_gross_wt) -
                (Number(data[0]?.custom_kun_wt) +
                  Number(data[0]?.custom_cs_wt) +
                  Number(data[0]?.custom_bb_wt) +
                  Number(data[0]?.custom_other_wt)),
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

        return updatedTable;
      });

      // Update state with new row
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
  };

  const updateBarcodeSalesTableData = (data: any, id?: number) => {
    if (id) {
      setSalesTableData((prevSalesTableData: any) => {
        const updatedData = prevSalesTableData?.map((item: any) => {
          if (item.idx === id) {
            return {
              ...item,
              item_code: data[0]?.item_code,
              custom_gross_wt: data[0]?.custom_gross_wt,
              custom_kun_wt: data[0]?.custom_kun_wt,
              custom_cs_wt: data[0]?.custom_cs_wt,
              custom_bb_wt: data[0]?.custom_bb_wt,
              custom_other_wt: data[0]?.custom_other_wt,
              custom_net_wt: data[0]?.custom_net_wt,
              custom_cs: data[0]?.custom_cs,
              custom_cs_amt: data[0]?.custom_cs_amt,
              custom_kun_pc: data[0]?.custom_kun_pc,
              custom_kun: data[0]?.custom_kun,
              custom_kun_amt: data[0]?.custom_kun_amt,
              custom_ot_: data[0]?.custom_ot_,
              custom_ot_amt: data[0]?.custom_ot_amt,
              custom_other: data[0]?.custom_other,
              custom_amount: data[0]?.custom_amount,
            };
          } else {
            return item;
          }
        });
        return updatedData;
      });

      // Update state with new row
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
