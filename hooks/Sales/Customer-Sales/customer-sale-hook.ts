import getBBCategoryApi from '@/services/api/Master/get-bbCategory-api';
import getClientApi from '@/services/api/Master/get-client-api';
import getKunCsOtCategoryApi from '@/services/api/Master/get-kunCsOtCategory-api';
import getItemDetailsInSalesApi from '@/services/api/Sales/get-item-details-api';
import getItemListInSalesApi from '@/services/api/Sales/get-item-list-api';
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
  const [itemList, setItemList] = useState<any>([]);
  const [selectedItemCodeForCustomerSale, setSelectedItemCodeForCustomerSale] =
    useState<any>({ id: '', item_code: '' });
  const [selectedDropdownValue, setSelectedDropdownValue] = useState<any>('');
  const [selectedCategory, setSeletedCategory] = useState<any>({
    KunCategory: '',
    CsCategory: '',
    BBCategory: '',
    OtCategory: '',
  });
  const [itemListDropDown, setItemListDropDown] = useState<any>(false);

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
      if (ClientNameApi?.data?.message?.status === 'success') {
        setClientNameListData(ClientNameApi?.data?.message?.data);
      }
      let itemListApi: any = await getItemListInSalesApi(loginAcessToken.token);

      // if (itemListApi?.data?.message?.status === 'success') {
      setItemList(itemListApi?.data?.data);
      // }
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
    id: number,
    field: string,
    newValue: any
  ) => {
    const updatedData = salesTableData?.map((item: any) => {
      if (item.idx === id) {
        return {
          ...item,
          [field]: newValue,
        };
      }
      console.log(item, 'item in onchange');
      return item;
    });

    setSalesTableData(updatedData);
  };

  const updateSalesTableData = (data: any) => {
    console.log('selected sale client table', selectedItemCodeForCustomerSale);

    if (selectedItemCodeForCustomerSale?.id) {
      // Assuming data is a list with a single object
      console.log('data', selectedItemCodeForCustomerSale);
      const updatedTable = salesTableData?.map((tableData: any) => {
        console.log('idd', tableData.idx, selectedItemCodeForCustomerSale.id);
        if (tableData.idx === selectedItemCodeForCustomerSale.id) {
          return {
            ...tableData,
            custom_gross_wt: data[0]?.custom_gross_wt,
            custom_kun_wt: data[0]?.custom_kun_wt,
            custom_cs_wt: data[0]?.custom_cs_wt,
            custom_bb_wt: data[0]?.custom_bb_wt,
            custom_other_wt: data[0]?.custom_other_wt,
            // custom_kun_wt:
            //   selectedCategory.KunCategory !== ''
            //     ? (data[0]?.custom_kun_wt *
            //         (data[0]?.custom_kun_wt *
            //           selectedCategory.KunCategory.type)) /
            //       100
            //     : data[0]?.custom_kun_wt,
            // custom_cs_wt:
            //   selectedCategory.CsCategory !== ''
            //     ? (data[0]?.custom_cs_wt * selectedCategory.CsCategory) / 100
            //     : data[0]?.custom_cs_wt,
            // custom_bb_wt:
            //   selectedCategory.BBCategory !== ''
            //     ? data[0]?.custom_bb_wt - 0.7
            //     : data[0].custom_bb_wt,
            // custom_other_wt:
            //   selectedCategory.OtCategory !== ''
            //     ? (data[0]?.custom_other_wt *
            //         selectedCategory.OtCategory.type) /
            //       100
            //     : data[0]?.custom_other_wt,
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
            'nfsam-3'
          );

          console.log('getItemCodeDetails api res', getItemCodeDetailsApi);
          if (getItemCodeDetailsApi?.data?.message?.status === 'success') {
            console.log(
              getItemCodeDetailsApi?.data,
              'selected sale client table'
            );
            // Call the function to update salesTableData
            updateSalesTableData(getItemCodeDetailsApi?.data?.message?.data);
          }
        } catch (error) {
          console.error('Error fetching item details:', error);
        }
      };

      getItemCodeDetailsFun();
    }
  }, [selectedItemCodeForCustomerSale]);

  console.log('updated sales table', salesTableData);
  console.log(selectedCategory, 'selected category');
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
    };

    setSalesTableData([...salesTableData, newRow]);
  };

  const handleDeleteRowOfSalesTable: any = (id: any) => {
    console.log('delete row id', id);
    if (salesTableData?.length > 1) {
      const updatedData =
        salesTableData?.length > 0 &&
        salesTableData !== null &&
        salesTableData
          .filter((item: any) => item.idx !== id)
          .map((row: any, index: number) => ({ ...row, idx: index + 1 }));
      setSalesTableData(updatedData);
    }
  };
  const handleSelectChange = (event: any) => {
    const { name, value } = event.target;
    // console.log(name, value, 'selected name and value');
    const selectedArray =
      name === 'BBCategory' ? BBCategoryListData : kunCsOtCategoryListData;
    const selectedObj = selectedArray?.find((obj: any) => obj.name1 === value);
    // console.log(selectedObj, 'selected name and value');

    setSeletedCategory((prevState: any) => ({
      ...prevState,
      [name]: selectedObj,
    }));
  };
  const handleEmptyDeliveryNote = () => {
    setSeletedCategory({
      KunCategory: '',
      CsCategory: '',
      BBCategory: '',
      OtCategory: '',
    });
    setSalesTableData([SalesTableInitialState]);
    setSelectedItemCodeForCustomerSale({ id: '', item_code: '' });
  };

  console.log('sales table data', salesTableData);
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
    handleDeleteRowOfSalesTable,
    selectedCategory,
    setSeletedCategory,
    handleSelectChange,
    itemList,
    handleEmptyDeliveryNote,
  };
};

export default UseCustomerSaleHook;
