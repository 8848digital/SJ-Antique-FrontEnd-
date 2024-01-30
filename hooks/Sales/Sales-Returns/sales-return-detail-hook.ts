import AmendDeliveryNoteApi from '@/services/api/Sales/delivery-note-amend-api';
import UpdateSaleApi from '@/services/api/Sales/put-update-delivery-note-api';
import PrintApi from '@/services/api/general/print-api';
import {
  GetDetailOfSalesReturn,
  get_detail_sales_return_data,
} from '@/store/slices/Sales/get-detail-sales-return-slice';
import { get_access_token } from '@/store/slices/auth/login-slice';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UseCustomSalesReturnHook from './custom-sales-return-hook';
import UseSalesReturnMasterHook from './sales-return-master-hook';

const UseSalesReturnDetailHook = () => {
  const dispatch = useDispatch();
  const { query } = useRouter();
  const router = useRouter();
  // const {
  //   salesReturnTableData,
  //   setSalesReturnTableData,
  //   handleSalesReturnTableFieldChange,
  //   handleAddRowForSalesReturn,
  //   handleDeleteRowOfSalesReturnTable,
  //   stateForDocStatus,
  //   setStateForDocStatus,
  //   handleEmptySaleReturnData,
  //   itemCodeDropdownReset,
  //   selectedClient,
  //   setSelectedClient,
  //   selectedClientGroup,
  //   handleSelectClientGroup,
  //   SalesTableInitialState,
  //   setItemCodeDropdownReset,
  //   saleReturnDeliveryNoteListing,
  //   setSaleReturnDeliveryNoteListing,
  //   HandleUpdateDocStatus,
  //   handleDeleteSalesReturn,
  //   handleTabPressInSales,
  //   selectedLocation,
  //   setSelectedLocation,
  //   deliveryNoteData,
  //   setDeliveryNoteData,
  // }: any = UseCustomSalesReturnHook();

  const {
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
    warehouseListData,
    setSelectedLocation,
    selectedLocation,
    deliveryNoteData,
    setDeliveryNoteData,
    SalesTableInitialState,
    stateForDocStatus,
    filteredTableDataForUpdate,
    selectedClientGroup,

    setSaleReturnDeliveryNoteListing,
    kunCsOtFixedAmt,
    setKunCsOtFixedAmt,
    HandleFixedAmt,
  }: any = UseSalesReturnMasterHook();

  const loginAcessToken = useSelector(get_access_token);

  const DetailOfSalesReturnFromStore: any = useSelector(
    get_detail_sales_return_data
  );

  console.log('DetailOfSalesReturnFromStore', DetailOfSalesReturnFromStore);

  const [readOnlyFields, setReadOnlyFields] = useState<any>(false);
  const [defaultSalesDate, setDefaultSalesDate] = useState<any>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
      setSelectedLocation(DetailOfSalesReturnFromStore?.data?.store_location);
      setDefaultSalesDate(DetailOfSalesReturnFromStore?.data?.posting_date);
    } else {
      setIsLoading(false);
    }
  }, [DetailOfSalesReturnFromStore]);
  console.log(salesReturnTableData, 'sales return detail page');

  const handleUpdateSalesReturn: any = async () => {
    const filteredData = filteredTableDataForUpdate(salesReturnTableData);
    const updatedData =
      filteredData.length > 0 &&
      filteredData !== null &&
      filteredData.map((data: any) => {
        const { warehouse, ...updatedObject } = data;
        return updatedObject;
      });
    const values = {
      ...deliveryNoteData,
      version: 'v1',
      method: 'put_delivery_note_sales_return',
      entity: 'delivery_note_api',
      name: query?.deliveryNoteId,
      custom_client_name: selectedClient,
      store_location:
        selectedLocation !== '' && selectedLocation !== undefined
          ? selectedLocation
          : 'Mumbai',
      is_return: '1',
      items: updatedData,
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

  // const handleDeleteSalesReturn: any = async (id: any) => {
  //   const version = 'v1';
  //   const method = 'delete_delivery_note_api';
  //   const entity = 'delivery_note_api';

  //   let deleteApi: any = await DeleteApi(
  //     loginAcessToken?.token,
  //     version,
  //     method,
  //     entity,
  //     id
  //   );

  //   if (Object?.keys(deleteApi?.data)?.length === 0) {
  //     toast.success('Sales Return note Deleted');
  //     const deliveryNoteApi: any = await getDeliveryNoteListing(
  //       loginAcessToken.token,
  //       deliveryNoteListParams
  //     );
  //     if (deliveryNoteApi?.data?.message?.status === 'success') {
  //       setSaleReturnDeliveryNoteListing(deliveryNoteApi?.data?.message?.data);
  //     }
  //   } else {
  //     toast.error('Failed to delete Sales Return');
  //   }
  // };

  const handleAmendButtonForSalesReturn: any = async () => {
    const updatedSalesTableData: any = salesReturnTableData.map(
      (tableData: any) => ({
        ...tableData,
        qty: 1,
      })
    );
    console.log('updated sales return data for amend', updatedSalesTableData);
    const values = {
      amended_from: query?.deliveryNoteId,
      custom_client_name: selectedClient,
      is_return: '1',
      items: updatedSalesTableData,
    };
    let amendDeliveryNoteApi: any = await AmendDeliveryNoteApi(
      loginAcessToken?.token,
      values
    );

    console.log('update delivery note api res', amendDeliveryNoteApi);
    if (amendDeliveryNoteApi?.data?.hasOwnProperty('data')) {
      setStateForDocStatus(false);
      setShowSaveButtonForAmendFlow(false);

      const newURL = `/sales/${query?.saleId}/${amendDeliveryNoteApi?.data?.data?.name}`;
      const asPath = `/sales/${query?.saleId}/${amendDeliveryNoteApi?.data?.data?.name}`;

      // Update the URL with the required query parameter
      router.push(newURL, asPath);
    }
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
    HandleUpdateDocStatus,
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
    handleAmendButtonForSalesReturn,
    setItemCodeDropdownReset,
    setSaleReturnDeliveryNoteListing,
    handleTabPressInSales,
    warehouseListData,
    deliveryNoteData,
    setDeliveryNoteData,
    selectedLocation,
    setSelectedLocation,
    kunCsOtFixedAmt,
    setKunCsOtFixedAmt,
    HandleFixedAmt,
  };
};

export default UseSalesReturnDetailHook;
