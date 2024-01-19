import React, { useEffect, useState } from 'react';
import UseCustomSalesReturnHook from './custom-sales-return-hook';
import getItemListInSalesApi from '@/services/api/Sales/get-item-list-api';
import { get_access_token } from '@/store/slices/auth/login-slice';
import { useSelector } from 'react-redux';
import getClientApi from '@/services/api/Master/get-client-api';
import getItemDetailsInSalesApi from '@/services/api/Sales/get-item-details-api';
import PostSalesApi from '@/services/api/Sales/post-delivery-note-api';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import getDeliveryNoteListing from '@/services/api/Sales/get-delivery-note-listing-api';

const UseSalesReturnMasterHook = () => {
  const router = useRouter();
  const { query } = useRouter();
  const loginAcessToken = useSelector(get_access_token);

  const {
    salesReturnTableData,
    setSalesReturnTableData,
    selectedItemCodeForCustomerSale,
    setSelectedItemCodeForCustomerSale,
    handleSalesReturnTableFieldChange,
    handleAddRowForSalesReturn,
    handleDeleteRowOfSalesReturnTable,
    handleEmptySaleReturnData,
    itemCodeDropdownReset,
    selectedClient,
    setSelectedClient,
    selectedClientGroup,
    handleSelectClientGroup,
    SalesTableInitialState,
    setItemCodeDropdownReset,
    HandleUpdateDocStatus,
    saleReturnDeliveryNoteListing,
    setSaleReturnDeliveryNoteListing,
    handleDeleteSalesReturn,
    handleTabPressInSales,
    setStateForDocStatus,
  }: any = UseCustomSalesReturnHook();
  const [clientNameListData, setClientNameListData] = useState<any>([]);

  const [itemList, setItemList] = useState<any>([]);

  const deliveryNoteListParams = {
    version: 'v1',
    method: 'get_listening_delivery_note_sales_return',
    entity: 'delivery_note_api',
  };

  useEffect(() => {
    const getDataFromapi: any = async () => {
      let itemListApi: any = await getItemListInSalesApi(loginAcessToken.token);

      if (itemListApi?.data?.data?.length > 0) {
        setItemList(itemListApi?.data?.data);
      }

      let ClientNameApi: any = await getClientApi(loginAcessToken.token);
      if (ClientNameApi?.data?.message?.status === 'success') {
        setClientNameListData(ClientNameApi?.data?.message?.data);
      }
      const deliveryNoteApi: any = await getDeliveryNoteListing(
        loginAcessToken.token,
        deliveryNoteListParams
      );
      if (deliveryNoteApi?.data?.message?.status === 'success') {
        setSaleReturnDeliveryNoteListing(deliveryNoteApi?.data?.message?.data);
      }
    };

    getDataFromapi();
  }, []);

  const updateSalesTableData = (data: any) => {
    console.log('dataaa', data);
    // setSelectedClient(data[0]?.custom_client_name);
    if (data?.length >= 0) {
      if (selectedItemCodeForCustomerSale?.id) {
        const updatedTable = salesReturnTableData?.map(
          (tableData: any, index: any) => {
            console.log(
              data[0]?.items[0],
              tableData?.idx,
              selectedItemCodeForCustomerSale.id,
              tableData,
              'table data in sale return'
            );
            return tableData.idx === selectedItemCodeForCustomerSale.id
              ? { ...tableData, ...removeIdxKey(data[0]?.items[0]) }
              : tableData;
          }
        );
        console.log(updatedTable, 'table data in sale return');
        setSalesReturnTableData(updatedTable);
      }
    } else {
      // Create a new row for each item in data[0]?.items
      const newRows = removeIdxKey(data[0]?.items[0])?.map(
        (item: any, index: any) => ({
          ...SalesTableInitialState,
          ...item,
          idx: index + 1, // Use a unique idx for each row
        })
      );

      setSalesReturnTableData((prevData: any) =>
        prevData
          ? [...prevData, ...newRows]
          : newRows || [SalesTableInitialState]
      );
    }
  };
  const removeIdxKey = (item: any) => {
    const { idx, ...itemWithoutIdx } = item;
    return itemWithoutIdx;
  };
  useEffect(() => {
    if (selectedItemCodeForCustomerSale?.item_code?.length > 0) {
      const getItemCodeDetailsFun = async () => {
        const getItemDetailsmethod: any =
          'get_delivery_note_specific_return_item';
        const getItemDetailsEntity: any = 'delivery_note_api';
        try {
          let getItemCodeDetailsApi = await getItemDetailsInSalesApi(
            loginAcessToken?.token,
            selectedItemCodeForCustomerSale.item_code,
            getItemDetailsmethod,
            getItemDetailsEntity
          );

          console.log('get details of sales return', getItemCodeDetailsApi);
          if (getItemCodeDetailsApi?.data?.message?.status === 'success') {
            updateSalesTableData(getItemCodeDetailsApi?.data?.message?.data);
          }
        } catch (error) {
          console.error('Error fetching item details:', error);
        }
      };

      getItemCodeDetailsFun();
    }
  }, [selectedItemCodeForCustomerSale]);

  const handleSRCreate: any = async () => {
    const updatedData =
      salesReturnTableData?.length > 0 &&
      salesReturnTableData !== null &&
      salesReturnTableData.map((data: any) => {
        const { warehouse, ...updatedObject } = data;

        return { ...updatedObject };
      });
    console.log(
      'handleSR create values',
      updatedData,
      selectedClient,
      selectedClientGroup
    );

    const values = {
      custom_client_name: selectedClient,
      custom_client_group: selectedClientGroup,
      is_return: '1',
      version: 'v1',
      method: 'create_delivery_note_sales_return',
      entity: 'delivery_note_api',

      items: updatedData,
    };
    const clientVal = values?.custom_client_name;
    if (clientVal !== '') {
      const postSalesReturnApi: any = await PostSalesApi(
        loginAcessToken.token,
        values
      );

      if (postSalesReturnApi?.data?.message?.status === 'success') {
        toast.success('Delivery note Created Sucessfully');
        console.log('queryyy', query, router);
        router.push(
          `${query.saleId}/${postSalesReturnApi?.data?.message?.name}`
        );
      } else {
        toast.error('Error in Creating Delivery note');
      }
      console.log('postSalesReturnApi res', postSalesReturnApi);
    } else {
      toast.error('Client name is mandatory');
    }
  };

  return {
    itemList,
    clientNameListData,
    handleSRCreate,
    salesReturnTableData,
    setSalesReturnTableData,
    selectedItemCodeForCustomerSale,
    setSelectedItemCodeForCustomerSale,
    selectedClient,
    setSelectedClient,
    handleAddRowForSalesReturn,
    handleDeleteRowOfSalesReturnTable,
    handleSalesReturnTableFieldChange,
    handleEmptySaleReturnData,
    itemCodeDropdownReset,
    handleSelectClientGroup,
    setItemCodeDropdownReset,
    HandleUpdateDocStatus,
    saleReturnDeliveryNoteListing,
    handleDeleteSalesReturn,
    handleTabPressInSales,
    setStateForDocStatus,
  };
};

export default UseSalesReturnMasterHook;
