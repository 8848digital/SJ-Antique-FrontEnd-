import getBBCategoryApi from '@/services/api/Master/get-bbCategory-api';
import getClientApi from '@/services/api/Master/get-client-api';
import getKunCsOtCategoryApi from '@/services/api/Master/get-kunCsOtCategory-api';
import getItemDetailsInSalesApi from '@/services/api/Sales/get-item-details-api';
import getItemListInSalesApi from '@/services/api/Sales/get-item-list-api';
import postDeliveryNoteApi from '@/services/api/Sales/post-delivery-note-api';
import { get_access_token } from '@/store/slices/auth/login-slice';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const UseCustomerSaleHook = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { query } = useRouter();
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
  const [deliveryNoteData, setDeliveryNoteData] = useState({
    Client: '',
  });
  const [selectedClient, setSelectedClient] = useState('');

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
      // }
      if (itemListApi?.data?.data?.length > 0) {
        setItemList(itemListApi?.data?.data);
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
    custom_ot_amt: '',
    custom_other: '',
    custom_amount: 0,
    kun_wt_initial: '',
    cs_wt_initial: '',
    bb_wt_initial: '',
    ot_wt_initial: '',
  };

  const [salesTableData, setSalesTableData] = useState<any>([
    SalesTableInitialState,
  ]);
  console.log('updated sales table datas', salesTableData);

  const handleSalesTableFieldChange: any = (
    itemIdx: number,
    fieldName: string,
    value: any
  ) => {
    setSalesTableData((prevData: any) => {
      return prevData.map((item: any) => {
        if (item.idx === itemIdx) {
          // Update the field value
          return {
            ...item,
            [fieldName]: value,
            // custom_kun_wt:
            //   item.custom_kun_wt *
            //   ((item.custom_kun_wt * selectedCategory.KunCategory.type) / 100),
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
                ? value * Number(item.custom_kun_pc)
                : item.custom_kun_amt,
            custom_ot_amt:
              fieldName === 'custom_ot_'
                ? Number(item.custom_other_wt) * value
                : item.custom_ot_amt,
            // custom_amount:
            //   fieldName === 'custom_other'
            //     ? Number(item.custom_amount) + Number(value)
            //     : Number(item.custom_cs_amt) +
            //       Number(item.custom_kun_amt) +
            //       Number(item.custom_ot_amt),
          };
        } else {
          return item;
        }
      });
    });
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
            custom_kun_wt:
              selectedCategory.KunCategory !== ''
                ? (data[0]?.custom_kun_wt *
                    (data[0]?.custom_kun_wt *
                      selectedCategory.KunCategory.type)) /
                  100
                : data[0]?.custom_kun_wt,
            custom_cs_wt:
              selectedCategory.CsCategory !== ''
                ? (data[0]?.custom_cs_wt *
                    (data[0]?.custom_cs_wt *
                      selectedCategory.CsCategory.type)) /
                  100
                : data[0]?.custom_cs_wt,
            custom_bb_wt:
              selectedCategory.BBCategory !== ''
                ? data[0]?.custom_bb_wt - 0.7
                : data[0].custom_bb_wt,
            custom_other_wt:
              selectedCategory.OtCategory !== ''
                ? (data[0]?.custom_other_wt *
                    data[0]?.custom_other_wt *
                    selectedCategory.OtCategory.type) /
                  100
                : data[0]?.custom_other_wt,
            kun_wt_initial: data[0]?.custom_kun_wt,
            cs_wt_initial: data[0]?.custom_cs_wt,
            bb_wt_initial: data[0]?.custom_bb_wt,
            ot_wt_initial: data[0]?.custom_other_wt,
          };
        } else {
          return tableData;
        }
      });

      setSalesTableData(updatedTable);
    }
  };

  useEffect(() => {
    console.log(
      'selected item code initially ',
      selectedItemCodeForCustomerSale
    );
    if (selectedItemCodeForCustomerSale.item_code?.length > 0) {
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
    const selectedArray =
      name === 'BBCategory' ? BBCategoryListData : kunCsOtCategoryListData;
    const selectedObj = selectedArray?.find((obj: any) => obj.name1 === value);

    setSeletedCategory((prevState: any) => ({
      ...prevState,
      [name]: selectedObj,
    }));
    // setSalesTableData((prevState: any) => {
    //   prevState?.map((data: any) => {
    //     const kunInitial = Number(data?.kun_wt_initial) || 0;
    //     const csWtInitial = Number(data?.cs_wt_initial) || 0;
    //     const bbWtInitial = Number(data?.bb_wt_initial) || 0;
    //     const otWtInitial = Number(data?.ot_wt_initial) || 0;
    //     return {
    //       ...data,

    //       custom_gross_wt: data?.custom_gross_wt,
    //       custom_kun_wt:
    //         selectedCategory.KunCategory !== ''
    //           ? (kunInitial *
    //               (kunInitial * selectedCategory.KunCategory.type)) /
    //             100
    //           : data?.custom_kun_wt,
    //       custom_cs_wt:
    //         selectedCategory.CsCategory !== ''
    //           ? (csWtInitial *
    //               (csWtInitial * selectedCategory.CsCategory.type)) /
    //             100
    //           : Number(data?.custom_cs_wt),
    //       custom_bb_wt:
    //         selectedCategory.BBCategory !== ''
    //           ? bbWtInitial - 0.7
    //           : bbWtInitial,
    //       custom_other_wt:
    //         selectedCategory.OtCategory !== ''
    //           ? (otWtInitial * otWtInitial * selectedCategory.OtCategory.type) /
    //             100
    //           : data?.custom_other_wt,
    //     };
    //   });
    // });
    console.log(salesTableData, 'updated sales table data');
  };
  useEffect(() => {
    const updatedData =
      salesTableData.length > 0 &&
      salesTableData !== null &&
      salesTableData.map((data: any, i: any) => {
        const kunInitial = Number(data?.kun_wt_initial) || 0;
        const csWtInitial = Number(data?.cs_wt_initial) || 0;
        const bbWtInitial = Number(data?.bb_wt_initial) || 0;
        const otWtInitial = Number(data?.ot_wt_initial) || 0;
        const {
          kun_wt_initial,
          cs_wt_initial,
          bb_wt_initial,
          ot_wt_initial,
          ...updatedObject
        } = data;
        return {
          ...updatedObject,
          custom_gross_wt: data?.custom_gross_wt,
          custom_kun_wt:
            selectedCategory.KunCategory !== ''
              ? (kunInitial *
                  (kunInitial * selectedCategory.KunCategory.type)) /
                100
              : data?.custom_kun_wt,
          custom_cs_wt:
            selectedCategory.CsCategory !== ''
              ? (csWtInitial *
                  (csWtInitial * selectedCategory.CsCategory.type)) /
                100
              : Number(data?.custom_cs_wt),
          custom_bb_wt:
            selectedCategory.BBCategory !== ''
              ? bbWtInitial - 0.7
              : bbWtInitial,
          custom_other_wt:
            selectedCategory.OtCategory !== ''
              ? (otWtInitial * otWtInitial * selectedCategory.OtCategory.type) /
                100
              : data?.custom_other_wt,
          custom_cs_amt: data?.custom_cs_wt * data?.custom_cs,
          custom_ot_amt: data?.custom_other_wt * data?.custom_ot_,
        };
      });
    setSalesTableData(updatedData);
  }, [selectedCategory]);
  const handleEmptyDeliveryNote = () => {
    // setSeletedCategory({
    //   KunCategory: '',
    //   CsCategory: '',
    //   BBCategory: '',
    //   OtCategory: '',
    // });
    setSalesTableData([SalesTableInitialState]);
    setSelectedItemCodeForCustomerSale({ id: '', item_code: '' });
  };

  const handleDNCreate: any = async () => {
    const updatedData =
      salesTableData.length > 0 &&
      salesTableData !== null &&
      salesTableData.map((data: any) => {
        return {
          ...data,
          custom_amount:
            Number(data.custom_cs_amt) +
            Number(data.custom_kun_amt) +
            Number(data.custom_ot_amt) +
            Number(data.custom_other),
        };
      });
    const values = {
      ...deliveryNoteData,
      Client: selectedClient,
      version: 'v1',
      method: 'create_delivery_note',
      entity: 'delivery_note_api',
      custom_kun_category: selectedCategory?.KunCategory?.name1,
      custom_cs_category: selectedCategory?.CsCategory?.name1,
      custom_bb_category: selectedCategory?.BBCategory?.name1,
      custom_ot_category: selectedCategory?.OtCategory?.name1,
      items: updatedData,
    };
    let reqField = values.Client;
    if (reqField === '') {
      toast.error('Client Name is Empty');
    } else {
      const postDeliveryNote: any = await postDeliveryNoteApi(
        loginAcessToken.token,
        values
      );
      console.log('post delivery note', postDeliveryNote, query);
      if (postDeliveryNote?.data?.message?.status === 'success') {
        // toast.success('Delivery note Created Sucessfully');
        router.push(`${query.saleId}/${postDeliveryNote?.data?.message?.name}`);
      } else {
        toast.error('Error in Creating Delivery note');
      }
    }
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
    selectedClient,
    setSelectedClient,
    handleDNCreate,
  };
};

export default UseCustomerSaleHook;
