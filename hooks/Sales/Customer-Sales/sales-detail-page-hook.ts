import { useEffect, useState } from 'react';
import UseCustomerSaleHook from './customer-sale-hook';
import { useDispatch, useSelector } from 'react-redux';
import {
  GetDetailOfDeliveryNote,
  get_detail_delivery_note_data,
} from '@/store/slices/Sales/getDetailOfDeliveryNoteApi';
import { get_access_token } from '@/store/slices/auth/login-slice';
import { useRouter } from 'next/router';
import UpdateDeliveryNoteApi from '@/services/api/Sales/put-update-delivery-note-api';

const UseCustomerSaleDetailHook = () => {
  const dispatch = useDispatch();
  const { query } = useRouter();
  const {
    salesTableData,
    setSalesTableData,
    kunCsOtCategoryListData,
    BBCategoryListData,
    clientNameListData,
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
  }: any = UseCustomerSaleHook();

  console.log('selected category default', selectedCategory);

  const loginAcessToken = useSelector(get_access_token);
  const DetailOfDeliveryNoteFromStore: any = useSelector(
    get_detail_delivery_note_data
  );

  console.log(
    'delivery note data from store in hook',
    DetailOfDeliveryNoteFromStore
  );

  const [readOnlyFields, setReadOnlyFields] = useState<boolean>(false);
  const [showSaveButtonForAmendFlow, setShowSaveButtonForAmendFlow] =
    useState<boolean>(false);

  useEffect(() => {
    console.log('query in sales hook', query);
    if (Object?.keys(query)?.length > 0) {
      const reqParams: any = {
        token: loginAcessToken.token,
        name: query?.deliveryNoteId,
      };
      dispatch(GetDetailOfDeliveryNote(reqParams));
    }
  }, [query]);

  useEffect(() => {
    if (DetailOfDeliveryNoteFromStore?.docStatus > 0) {
      setReadOnlyFields(true);
    } else {
      setReadOnlyFields(false);
    }
  }, [DetailOfDeliveryNoteFromStore]);

  useEffect(() => {
    if (DetailOfDeliveryNoteFromStore?.hasOwnProperty('data')) {
      setSalesTableData(DetailOfDeliveryNoteFromStore?.data?.items);
      setSelectedClient(
        DetailOfDeliveryNoteFromStore?.data?.custom_client_name
      );
      // setSeletedCategory({
      //   KunCategory: DetailOfDeliveryNoteFromStore?.data?.custom_kun_category,
      //   CsCategory: DetailOfDeliveryNoteFromStore?.data?.custom_cs_category,
      //   BBCategory: DetailOfDeliveryNoteFromStore?.data?.custom_bb_category,
      //   OtCategory: DetailOfDeliveryNoteFromStore?.data?.custom_ot_category,
      // });
    }
  }, [DetailOfDeliveryNoteFromStore]);

  console.log('sales table data with default values', selectedClient);

  const handleUpdateDeliveryNote: any = async () => {
    const values = {
      version: 'v1',
      method: 'put_delivery_note',
      entity: 'delivery_note_api',
      name: query?.deliveryNoteId,
      custom_client_name: selectedClient,
      custom_kun_category: selectedCategory?.KunCategory?.name1,
      custom_cs_category: selectedCategory?.CsCategory?.name1,
      custom_bb_category: selectedCategory?.BBCategory?.name1,
      custom_ot_category: selectedCategory?.OtCategory?.name1,
      items: salesTableData,
    };
    let updateDeliveryNoteApi: any = await UpdateDeliveryNoteApi(
      loginAcessToken?.token,
      values
    );

    console.log('update delivery note api res', updateDeliveryNoteApi);
    if (updateDeliveryNoteApi?.data?.message?.status === 'success') {
      setStateForDocStatus(false);

      const reqParams: any = {
        token: loginAcessToken.token,
        name: query?.deliveryNoteId,
      };
      dispatch(GetDetailOfDeliveryNote(reqParams));
    }
  };

  return {
    salesTableData,
    setSalesTableData,
    kunCsOtCategoryListData,
    BBCategoryListData,
    clientNameListData,
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
    handleUpdateDeliveryNote,
    readOnlyFields,
    setReadOnlyFields,
    showSaveButtonForAmendFlow,
    setShowSaveButtonForAmendFlow,
  };
};

export default UseCustomerSaleDetailHook;
