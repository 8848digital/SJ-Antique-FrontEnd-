import getBBCategoryApi from '@/services/api/Master/get-bbCategory-api';
import getClientApi from '@/services/api/Master/get-client-api';
import getKunCsOtCategoryApi from '@/services/api/Master/get-kunCsOtCategory-api';
import getItemDetailsInSalesApi from '@/services/api/Sales/get-item-details-api';
import { get_access_token } from '@/store/slices/auth/login-slice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const UseCustomerSaleHook = () => {
  const dispatch = useDispatch();
  const loginAcessToken = useSelector(get_access_token);

  const [kunCsOtCategoryListData, setKunCsOtCategoryListData] = useState<any>(
    []
  );
  const [BBCategoryListData, setBBCategoryListData] = useState<any>([]);
  const [clientNameListData, setClientNameListData] = useState<any>([]);
  const [selectedItemCodeForCustomerSale, setSelectedItemCodeForCustomerSale] = useState<any>({ id: "", item_code: '' });
  const [selectedDropdownValue, setSelectedDropdownValue] = useState<any>('');
  console.log('selected sale client', selectedItemCodeForCustomerSale);

  useEffect(() => {
    const getKunCsOTCategoryData = async () => {
      let kunCsOtCategoryApi: any = await getKunCsOtCategoryApi(
        loginAcessToken.token
      );
      if (kunCsOtCategoryApi?.data?.message?.status === 'success') {
        setKunCsOtCategoryListData(kunCsOtCategoryApi?.data?.message?.data);
      }

      let BBCategoryApi: any = await getBBCategoryApi(loginAcessToken.token);
      if (BBCategoryApi?.data?.message?.status === 'success') {
        setBBCategoryListData(BBCategoryApi?.data?.message?.data);
      }

      let ClientNameApi: any = await getClientApi(loginAcessToken.token);
      console.log("client name api res", ClientNameApi)
      if (ClientNameApi?.data?.message?.status === 'success') {
        setClientNameListData(ClientNameApi?.data?.message?.data);
      }
    };

    getKunCsOTCategoryData();
  }, []);



  const SalesTableInitialState: any = {
    idx: 1,
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

  const [salesTableData, setSalesTableData] = useState<any>([
    SalesTableInitialState,
  ]);


  const handleSalesTableFieldChange: any = (
    id: number, field: string, newValue: any
  ) => {

    const updatedData = salesTableData?.map((item: any) => {
      if (item.idx === id) {
        return {
          ...item,
          [field]: newValue,
        };
      }
      return item;
    });

    setSalesTableData(updatedData);
  }

  const updateSalesTableData = (data: any) => {
    console.log('selected sale client table', selectedItemCodeForCustomerSale);

    if (selectedItemCodeForCustomerSale?.id) {
      // Assuming data is a list with a single object
      console.log("data", selectedItemCodeForCustomerSale);
      const updatedTable = salesTableData?.map((tableData: any) => {
        console.log("idd", tableData.idx, selectedItemCodeForCustomerSale.id);
        if (tableData.idx === selectedItemCodeForCustomerSale.id) {
          return {
            ...tableData,
            custom_gross_wt: data[0]?.custom_gross_wt,
            custom_kun_wt: data[0]?.custom_kun_wt,
            custom_cs_wt: data[0]?.custom_cs_wt,
            custom_bb_wt: data[0]?.custom_bb_wt,
            custom_other_wt: data[0]?.custom_other_wt,
          };
        } else {
          return tableData;
        }
      });

      setSalesTableData(updatedTable);
    }
  };



  useEffect(() => {
    if (selectedItemCodeForCustomerSale) {
      const getItemCodeDetailsFun = async () => {
        try {
          let getItemCodeDetailsApi = await getItemDetailsInSalesApi(
            loginAcessToken?.token,
            // selectedItemCodeForCustomerSale.item_code
            "nfsam-3"
          );

          console.log("getItemCodeDetails api res", getItemCodeDetailsApi);
          if (getItemCodeDetailsApi?.data?.message?.status === "success") {
            // Call the function to update salesTableData
            updateSalesTableData(getItemCodeDetailsApi?.data?.message?.data);
          }
        } catch (error) {
          console.error("Error fetching item details:", error);
        }
      };

      getItemCodeDetailsFun();
    }
  }, [selectedItemCodeForCustomerSale]);

  console.log("updated sales table", salesTableData)


  const handleAddRowForSales: any = () => {
    const newRow: any = {
      idx: salesTableData?.length + 1,
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
    }

    setSalesTableData([...salesTableData, newRow])
  };

  const handleDeleteRowOfSalesTable: any = (id: any) => {
    console.log("delete row id", id)
    if (salesTableData?.length > 1) {
      const updatedData =
        salesTableData?.length > 0 &&
        salesTableData !== null &&
        salesTableData
          .filter((item: any) => item.idx !== id)
          .map((row: any, index: number) => ({ ...row, idx: index + 1 }));
      setSalesTableData(updatedData);
    }
  }

  console.log("sales table data", salesTableData)
  return {
    salesTableData,
    setSalesTableData,
    kunCsOtCategoryListData,
    BBCategoryListData,
    clientNameListData,
    selectedDropdownValue,
    setSelectedDropdownValue,
    selectedItemCodeForCustomerSale,
    setSelectedItemCodeForCustomerSale,
    handleSalesTableFieldChange,
    handleAddRowForSales,
    handleDeleteRowOfSalesTable
  };
};

export default UseCustomerSaleHook;
