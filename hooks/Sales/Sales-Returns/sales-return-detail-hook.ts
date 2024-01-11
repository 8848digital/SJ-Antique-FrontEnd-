import {
  GetDetailOfSalesReturn,
  get_detail_sales_return_data,
} from '@/store/slices/Sales/get-detail-sales-return-slice';
import { get_access_token } from '@/store/slices/auth/login-slice';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UseCustomSalesReturnHook from './custom-sales-return-hook';
import UpdateSaleApi from '@/services/api/Sales/put-update-delivery-note-api';
import UseSalesReturnMasterHook from './sales-return-master-hook';
import UpdateSalesDocStatusApi from '@/services/api/Sales/update-sales-docStatus-api';
import PrintApi from '@/services/api/general/print-api';
import DeleteApi from '@/services/api/general/delete-api';
import getDeliveryNoteListing from '@/services/api/Sales/get-delivery-note-listing-api';

const UseSalesReturnDetailHook = () => {
  const dispatch = useDispatch();
  const { query } = useRouter();

  const {
    salesReturnTableData,
    setSalesReturnTableData,

    handleSalesReturnTableFieldChange,
    handleAddRowForSalesReturn,
    handleDeleteRowOfSalesReturnTable,
    stateForDocStatus,
    setStateForDocStatus,
    handleEmptySaleReturnData,
    itemCodeDropdownReset,
    selectedClient,
    setSelectedClient,
    selectedClientGroup,
    handleSelectClientGroup,
    SalesTableInitialState,
  }: any = UseCustomSalesReturnHook();

  const {
    itemList,
    clientNameListData,
    selectedItemCodeForCustomerSale,
    setSelectedItemCodeForCustomerSale,
  }: any = UseSalesReturnMasterHook();

  const loginAcessToken = useSelector(get_access_token);

  const DetailOfSalesReturnFromStore: any = useSelector(
    get_detail_sales_return_data
  );

  console.log('DetailOfSalesReturnFromStore', DetailOfSalesReturnFromStore);

  const [readOnlyFields, setReadOnlyFields] = useState<any>(false);
  const [defaultSalesDate, setDefaultSalesDate] = useState<any>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [saleReturnDeliveryNoteListing, setSaleReturnDeliveryNoteListing] =
    useState<any>();
  const [showSaveButtonForAmendFlow, setShowSaveButtonForAmendFlow] =
    useState<boolean>(false);

  useEffect(() => {
    console.log('query in sales hook', query);
    if (Object?.keys(query)?.length > 0) {
      const reqParams: any = {
        token: loginAcessToken.token,
        name: query?.deliveryNoteId,
      };
      dispatch(GetDetailOfSalesReturn(reqParams));
    }
  }, [query]);

  useEffect(() => {
    if (DetailOfSalesReturnFromStore?.docStatus > 0) {
      setReadOnlyFields(true);
    } else {
      setReadOnlyFields(false);
    }
  }, [DetailOfSalesReturnFromStore]);

  useEffect(() => {
    if (
      DetailOfSalesReturnFromStore?.data?.length === 0 &&
      DetailOfSalesReturnFromStore?.isLoading === 'pending'
    ) {
      setIsLoading(true);
    } else if (
      DetailOfSalesReturnFromStore?.hasOwnProperty('data') &&
      DetailOfSalesReturnFromStore?.isLoading === 'succeeded'
    ) {
      setIsLoading(false);
      setSalesReturnTableData(DetailOfSalesReturnFromStore?.data?.items);
      setSelectedClient(DetailOfSalesReturnFromStore?.data?.custom_client_name);
      setDefaultSalesDate(DetailOfSalesReturnFromStore?.data?.posting_date);
    } else {
      setIsLoading(false);
    }
  }, [DetailOfSalesReturnFromStore]);
  const deliveryNoteListParams = {
    version: 'v1',
    method: 'get_listening_delivery_note_sales_return',
    entity: 'delivery_note_api',
  };
  useEffect(() => {
    const getKunCsOTCategoryData = async () => {
      const deliveryNoteApi: any = await getDeliveryNoteListing(
        loginAcessToken.token,
        deliveryNoteListParams
      );
      if (deliveryNoteApi?.data?.message?.status === 'success') {
        setSaleReturnDeliveryNoteListing(deliveryNoteApi?.data?.message?.data);
      }
    };

    getKunCsOTCategoryData();
  }, []);

  const handleUpdateSalesReturn: any = async () => {
    const values = {
      version: 'v1',
      method: 'put_delivery_note_sales_return',
      entity: 'delivery_note_api',
      name: query?.deliveryNoteId,
      custom_client_name: selectedClient,
      is_return: '1',
      items: salesReturnTableData,
    };
    let updateSalesReturnApi: any = await UpdateSaleApi(
      loginAcessToken?.token,
      values
    );

    console.log('update delivery note api res', updateSalesReturnApi);
    if (updateSalesReturnApi?.data?.message?.status === 'success') {
      setStateForDocStatus(false);

      const reqParams: any = {
        token: loginAcessToken.token,
        name: query?.deliveryNoteId,
      };
      dispatch(GetDetailOfSalesReturn(reqParams));
    }
  };

  const HandleUpdateSalesdocStatus: any = async (docStatusvalue: any) => {
    let updateDocStatusApi: any = await UpdateSalesDocStatusApi(
      loginAcessToken?.token,
      docStatusvalue,
      query?.deliveryNoteId
    );
    console.log('update docstatus api res', updateDocStatusApi);
    const reqParams: any = {
      token: loginAcessToken.token,
      name: query?.deliveryNoteId,
    };
    dispatch(GetDetailOfSalesReturn(reqParams));
  };

  const handlePrintApi: any = async (id: any) => {
    const reqParams = {
      token: loginAcessToken?.token,
      name: id,
      version: 'v1',
      method: 'print_delivery_note',
      entity: 'delivery_note_api',
    };
    let deliveryNotePrintApi: any = await PrintApi(reqParams);
    if (deliveryNotePrintApi?.status === 'success') {
      window.open(deliveryNotePrintApi?.data?.data[0]?.print_url);
    }
  };

  const handleDeleteSalesReturn: any = async (id: any) => {
    const version = 'v1';
    const method = 'delete_delivery_note_api';
    const entity = 'delivery_note_api';

    let deleteapi: any = await DeleteApi(
      loginAcessToken?.token,
      version,
      method,
      entity,
      id
    );
    const deliveryNoteApi: any = await getDeliveryNoteListing(
      loginAcessToken.token,
      deliveryNoteListParams
    );
    if (deliveryNoteApi?.data?.message?.status === 'success') {
      setSaleReturnDeliveryNoteListing(deliveryNoteApi?.data?.message?.data);
    }

    console.log('deleteapi res', deleteapi);
  };

  return {
    readOnlyFields,
    isLoading,
    salesReturnTableData,
    setSalesReturnTableData,
    defaultSalesDate,
    selectedClient,
    setReadOnlyFields,
    showSaveButtonForAmendFlow,
    setShowSaveButtonForAmendFlow,
    HandleUpdateSalesdocStatus,
    handleUpdateSalesReturn,
    stateForDocStatus,
    setStateForDocStatus,
    itemList,
    clientNameListData,
    selectedItemCodeForCustomerSale,
    setSelectedItemCodeForCustomerSale,
    handleSalesReturnTableFieldChange,
    handleAddRowForSalesReturn,
    handleDeleteRowOfSalesReturnTable,
    handleEmptySaleReturnData,
    itemCodeDropdownReset,
    setSelectedClient,
    selectedClientGroup,
    handleSelectClientGroup,
    handlePrintApi,
    handleDeleteSalesReturn,
    saleReturnDeliveryNoteListing,
  };
};

export default UseSalesReturnDetailHook;
