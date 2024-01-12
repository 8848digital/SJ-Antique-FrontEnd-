import getBBCategoryApi from '@/services/api/Master/get-bbCategory-api';
import getClientApi from '@/services/api/Master/get-client-api';
import getClientGroupApi from '@/services/api/Master/get-client-group-api';
import getKunCsOtCategoryApi from '@/services/api/Master/get-kunCsOtCategory-api';
import getItemDetailsInSalesApi from '@/services/api/Sales/get-item-details-api';
import getItemListInSalesApi from '@/services/api/Sales/get-item-list-api';
import postDeliveryNoteApi from '@/services/api/Sales/post-delivery-note-api';
import DeleteApi from '@/services/api/general/delete-api';
import { get_client_data } from '@/store/slices/Master/get-client-group-slice';
import { get_access_token } from '@/store/slices/auth/login-slice';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import UseDeliveryNoteHook from './delivery-note-hook';
import getDeliveryNoteListing from '@/services/api/Sales/get-delivery-note-listing-api';
import PostSalesApi from '@/services/api/Sales/post-delivery-note-api';

const UseCustomerSaleHook = () => {
  const { deliveryNoteListing, setDeliveryNoteListing }: any =
    UseDeliveryNoteHook();
  const dispatch = useDispatch();
  const router = useRouter();
  const { query } = useRouter();
  const loginAcessToken = useSelector(get_access_token);
  const clientDataSlice: any = useSelector(get_client_data);
  console.log('client data from slice', clientDataSlice, loginAcessToken);

  const [kunCsOtCategoryListData, setKunCsOtCategoryListData] = useState<any>(
    []
  );
  const [BBCategoryListData, setBBCategoryListData] = useState<any>([]);
  const [clientNameListData, setClientNameListData] = useState<any>([]);
  const [itemList, setItemList] = useState<any>([]);
  const [stateForDocStatus, setStateForDocStatus] = useState<boolean>(false);
  const [selectedItemCodeForCustomerSale, setSelectedItemCodeForCustomerSale] =
    useState<any>({ id: '', item_code: '' });
  const [selectedDropdownValue, setSelectedDropdownValue] = useState<any>('');
  const [selectedItemCode, setSelectedItemCode] = useState();
  const [selectedCategory, setSeletedCategory] = useState<any>({
    KunCategory: '',
    CsCategory: '',
    BBCategory: '',
    OtCategory: '',
  });

  const [deliveryNoteData, setDeliveryNoteData] = useState({});
  const [selectedClient, setSelectedClient] = useState<string>('');
  const [selectedClientGroup, setSelectedClientGroup] = useState<string>('');
  const [clientGroupList, setClientGroupList] = useState();
  const [itemCodeDropdownReset, setItemCodeDropdownReset] =
    useState<boolean>(false);

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
      const clientGroupData: any = await getClientGroupApi(
        loginAcessToken.token
      );
      console.log(clientGroupData, 'client group data in hook');
      if (clientGroupData?.data?.message?.status === 'success') {
        setClientGroupList(clientGroupData?.data?.message?.data);
      }
    };

    getKunCsOTCategoryData();
  }, []);

  const SalesTableInitialState: any = {
    idx: 1,
    custom_pr_bb_wt: '',
    custom_pr_cs_wt: '',
    custom_pr_kun_wt: '',
    custom_pr_other_wt: '',
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

            custom_net_wt:
              Number(item?.custom_gross_wt) -
                (Number(item?.custom_kun_wt) +
                  Number(item?.custom_cs_wt) +
                  Number(item?.custom_bb_wt) +
                  Number(item?.custom_other_wt)) <
              0
                ? 0
                : Number(item?.custom_gross_wt) -
                  (Number(item?.custom_kun_wt) +
                    Number(item?.custom_cs_wt) +
                    Number(item?.custom_bb_wt) +
                    Number(item?.custom_other_wt)),
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
                ? (data[0]?.custom_kun_wt * selectedCategory.KunCategory.type) /
                  100
                : data[0]?.custom_kun_wt,
            custom_cs_wt:
              selectedCategory.CsCategory !== ''
                ? (data[0]?.custom_cs_wt * selectedCategory.CsCategory.type) /
                  100
                : data[0]?.custom_cs_wt,
            custom_bb_wt:
              selectedCategory.BBCategory !== ''
                ? data[0]?.custom_bb_wt - 0.7
                : data[0].custom_bb_wt,
            custom_other_wt:
              selectedCategory.OtCategory !== ''
                ? (data[0]?.custom_other_wt *
                    selectedCategory.OtCategory.type) /
                  100
                : data[0]?.custom_other_wt,
            custom_pr_kun_wt: data[0]?.custom_kun_wt,
            custom_pr_cs_wt: data[0]?.custom_cs_wt,
            custom_pr_bb_wt: data[0]?.custom_bb_wt,
            custom_pr_other_wt: data[0]?.custom_other_wt,
            warehouse: data[0].custom_warehouse,
          };
        } else {
          return tableData;
        }
      });

      setSalesTableData(updatedTable);
    }
  };

  useEffect(() => {
    if (selectedItemCodeForCustomerSale.item_code?.length > 0) {
      const itemDetailsMethod = 'get_item_specific';
      const itemDetailsEntity = 'item_specific';
      const getItemCodeDetailsFun = async () => {
        try {
          let getItemCodeDetailsApi = await getItemDetailsInSalesApi(
            loginAcessToken?.token,
            selectedItemCodeForCustomerSale.item_code,
            itemDetailsMethod,
            itemDetailsEntity
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
    setStateForDocStatus(true);
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
      setStateForDocStatus(true);
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
    setStateForDocStatus(true);
  };

  useEffect(() => {
    const updatedData =
      salesTableData?.length > 0 &&
      salesTableData !== null &&
      salesTableData.map((data: any) => {
        const kunInitial = Number(data?.custom_pr_kun_wt) || 0;
        const csWtInitial = Number(data?.custom_pr_cs_wt) || 0;
        const bbWtInitial = Number(data?.custom_pr_bb_wt) || 0;
        const otWtInitial = Number(data?.custom_pr_other_wt) || 0;

        return {
          ...data,
          custom_gross_wt: data?.custom_gross_wt,
          custom_kun_wt:
            selectedCategory.KunCategory !== ''
              ? (kunInitial * selectedCategory?.KunCategory?.type) / 100
              : // : selectedCategory?.KunCategory?.name1 !== ''?
                data?.custom_kun_wt,
          custom_cs_wt:
            selectedCategory.CsCategory !== ''
              ? (csWtInitial * selectedCategory?.CsCategory?.type) / 100
              : Number(data?.custom_cs_wt),
          custom_bb_wt:
            selectedCategory?.BBCategory?.name1 !== ''
              ? bbWtInitial === 0
                ? 0
                : bbWtInitial - selectedCategory?.BBCategory?.type
              : bbWtInitial,
          custom_other_wt:
            selectedCategory.OtCategory !== ''
              ? (otWtInitial * selectedCategory.OtCategory?.type) / 100
              : Number(data?.custom_other_wt),
          custom_cs_amt:
            (selectedCategory.CsCategory !== ''
              ? (csWtInitial * selectedCategory?.CsCategory?.type) / 100
              : Number(data?.custom_cs_wt)) * data?.custom_cs,
          custom_ot_amt:
            (selectedCategory.OtCategory !== ''
              ? (otWtInitial * selectedCategory?.OtCategory?.type) / 100
              : Number(data?.custom_other_wt)) * data?.custom_ot_,
          custom_net_wt:
            Number(data?.custom_gross_wt) -
            Number(data?.custom_kun_wt) +
            Number(data?.custom_cs_wt) +
            Number(data?.custom_bb_wt) +
            Number(data?.custom_other_wt),
          custom_amount:
            Number(data.custom_cs_amt) +
            Number(data.custom_kun_amt) +
            Number(data.custom_ot_amt) +
            Number(data.custom_other),
        };
      });
    setSalesTableData(updatedData);
  }, [selectedCategory, salesTableData?.length]);

  const handleEmptyDeliveryNote = () => {
    console.log('selected category11', selectedCategory, salesTableData);

    setSeletedCategory({
      KunCategory: '',
      CsCategory: '',
      BBCategory: '',
      OtCategory: '',
    });
    setSelectedClient('');
    setSalesTableData([SalesTableInitialState]);
    setSelectedItemCodeForCustomerSale({ id: '', item_code: '' });
    setStateForDocStatus(true);
    setItemCodeDropdownReset(true);
  };

  const handleDNCreate: any = async () => {
    const updatedData =
      salesTableData.length > 0 &&
      salesTableData !== null &&
      salesTableData.map((data: any) => {
        const {
          custom_pr_bb_wt,
          custom_pr_cs_wt,
          custom_pr_kun_wt,
          custom_pr_other_wt,
          ...updatedObject
        } = data;
        return {
          ...updatedObject,
          custom_net_wt:
            Number(data?.custom_gross_wt) -
              (Number(data?.custom_kun_wt) +
                Number(data?.custom_cs_wt) +
                Number(data?.custom_bb_wt) +
                Number(data?.custom_other_wt)) <
            0
              ? 0
              : Number(data?.custom_gross_wt) -
                (Number(data?.custom_kun_wt) +
                  Number(data?.custom_cs_wt) +
                  Number(data?.custom_bb_wt) +
                  Number(data?.custom_other_wt)),
          custom_amount:
            Number(data.custom_cs_amt) +
            Number(data.custom_kun) * Number(data.custom_kun_pc) +
            Number(data.custom_ot_amt) +
            Number(data.custom_other),
        };
      });
    const values = {
      ...deliveryNoteData,
      custom_client_name: selectedClient,
      custom_client_group: selectedClientGroup,
      version: 'v1',
      method: 'create_delivery_note',
      entity: 'delivery_note_api',
      custom_kun_category: selectedCategory?.KunCategory?.name1,
      custom_cs_category: selectedCategory?.CsCategory?.name1,
      custom_bb_category: selectedCategory?.BBCategory?.name1,
      custom_ot_category: selectedCategory?.OtCategory?.name1,
      items: updatedData,
    };

    let reqField = values.custom_client_name;
    if (reqField === '') {
      toast.error('Client Name is Empty');
    } else {
      const postDeliveryNote: any = await PostSalesApi(
        loginAcessToken.token,
        values
      );

      console.log('post delivery note', postDeliveryNote, query);
      if (postDeliveryNote?.data?.message?.status === 'success') {
        toast.success('Delivery note Created Sucessfully');
        router.push(`${query.saleId}/${postDeliveryNote?.data?.message?.name}`);
      }
      if (postDeliveryNote?.data?.message?.status === 'error') {
        toast.error(`${postDeliveryNote?.data?.message?.message}`);
      }
    }
  };
  const handleSelectClientGroup = async (value: any) => {
    setSelectedClientGroup(value);
  };
  const deliveryNoteListParams = {
    version: 'v1',
    method: 'get_listening_delivery_note',
    entity: 'delivery_note_api',
  };
  const HandleDeleteDeliveryNote: any = async (name: any) => {
    const version = 'v1';
    const method = 'delete_delivery_note_api';
    const entity = 'delivery_note_api';

    let deleteApi: any = await DeleteApi(
      loginAcessToken?.token,
      version,
      method,
      entity,
      name
    );

    if (Object?.keys(deleteApi?.data)?.length === 0) {
      toast.success('Sales note Deleted');
      let updatedData: any = await getDeliveryNoteListing(
        loginAcessToken.token,
        deliveryNoteListParams
      );
      console.log('resss', updatedData?.data?.message?.data);
      if (updatedData?.data?.message?.status === 'success') {
        setDeliveryNoteListing(updatedData?.data?.message?.data);
        console.log(deliveryNoteListing, 'delivery note listing');
      }
    } else {
      toast.error('Failed to delete Sales note');
    }
  };

  console.log('stateForDocStatus', stateForDocStatus);

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
    stateForDocStatus,
    setStateForDocStatus,
    clientGroupList,
    HandleDeleteDeliveryNote,
    handleSelectClientGroup,
    itemCodeDropdownReset,
    setItemCodeDropdownReset,
    deliveryNoteListParams,
    deliveryNoteListing,
    selectedItemCode,
    setSelectedItemCode,
  };
};

export default UseCustomerSaleHook;
