import React, { useEffect, useState } from 'react';
import UseCustomSalesReturnHook from './custom-sales-return-hook';
import getItemListInSalesApi from '@/services/api/Sales/get-item-list-api';
import { get_access_token } from '@/store/slices/auth/login-slice';
import { useSelector } from 'react-redux';
import getClientApi from '@/services/api/Master/get-client-api';
import getItemDetailsInSalesApi from '@/services/api/Sales/get-item-details-api';

const UseSalesReturnMasterHook = () => {
  const loginAcessToken = useSelector(get_access_token);

  const {
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
  }: any = UseCustomSalesReturnHook();
  const [clientNameListData, setClientNameListData] = useState<any>([]);

  const [itemList, setItemList] = useState<any>([]);

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
    };
    getDataFromapi();
  }, []);

  const updateSalesTableData = (data: any) => {
    console.log('data for update', data, salesReturnTableData);
    if (data?.length > 0) {
      if (selectedItemCodeForCustomerSale?.id) {
        const updatedTable = salesReturnTableData?.map((tableData: any) => {
          if (tableData.idx === selectedItemCodeForCustomerSale.id) {
            setSalesReturnTableData(data[0]?.items);
          } else {
            salesReturnTableData([SalesTableInitialState]);
          }
        });
      }
    } else {
      setSalesReturnTableData([SalesTableInitialState]);
    }
  };

  console.log('updated sale return table outside ', salesReturnTableData);
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
  const handleSRCreate: any = () => {
    console.log(
      'handleSR create values',
      salesReturnTableData,
      selectedClient,
      selectedClientGroup
    );
  };

  return {
    itemList,
    clientNameListData,
    handleSRCreate,
    salesReturnTableData,
    setSalesReturnTableData,
    selectedItemCodeForCustomerSale,
    setSelectedItemCodeForCustomerSale,
  };
};

export default UseSalesReturnMasterHook;
