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
import UpdateSalesDocStatusApi from '@/services/api/Sales/update-sales-docStatus-api';
import AmendDeliveryNoteApi from '@/services/api/Sales/delivery-note-amend-api';
import PrintApi from '@/services/api/general/print-api';
import UpdateSaleApi from '@/services/api/Sales/put-update-delivery-note-api';

const UseCustomerSaleDetailHook = () => {
  const dispatch = useDispatch();
  const { query } = useRouter();
  const router = useRouter();
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

  // useEffect(() => {
  //   if (DetailOfDeliveryNoteFromStore?.hasOwnProperty('data')) {
  //     setIsLoading(false);
  //     setSalesTableData(DetailOfDeliveryNoteFromStore?.data?.items);
  //     setSelectedClient(
  //       DetailOfDeliveryNoteFromStore?.data?.custom_client_name
  //     );
  //     setDefaultSalesDate(DetailOfDeliveryNoteFromStore?.data?.posting_date);
  //     // setSeletedCategory({
  //     //   KunCategory: DetailOfDeliveryNoteFromStore?.data?.custom_kun_category,
  //     //   CsCategory: DetailOfDeliveryNoteFromStore?.data?.custom_cs_category,
  //     //   BBCategory: DetailOfDeliveryNoteFromStore?.data?.custom_bb_category,
  //     //   OtCategory: DetailOfDeliveryNoteFromStore?.data?.custom_ot_category,
  //     // });
  //   }
  // }, [DetailOfDeliveryNoteFromStore]);

  useEffect(() => {
    if (
      DetailOfDeliveryNoteFromStore?.data?.length === 0 &&
      DetailOfDeliveryNoteFromStore?.isLoading === 'pending'
    ) {
      setIsLoading(true);
    } else if (
      DetailOfDeliveryNoteFromStore?.hasOwnProperty('data') &&
      DetailOfDeliveryNoteFromStore?.isLoading === 'succeeded'
    ) {
      setIsLoading(false);
      setSalesTableData(DetailOfDeliveryNoteFromStore?.data?.items);
      setSelectedClient(
        DetailOfDeliveryNoteFromStore?.data?.custom_client_name
      );
      setDefaultSalesDate(DetailOfDeliveryNoteFromStore?.data?.posting_date);
    } else {
      setIsLoading(false);
    }
  }, [DetailOfDeliveryNoteFromStore]);

  console.log('isLoading status', isLoading);

  const handleUpdateDeliveryNote: any = async () => {
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
            Number(data.custom_kun_amt) +
            Number(data.custom_ot_amt) +
            Number(data.custom_other),
        };
      });
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
      items: updatedData,
    };
    let updateDeliveryNoteApi: any = await UpdateSaleApi(
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
    dispatch(GetDetailOfDeliveryNote(reqParams));
  };

  const HandleAmendButtonForCustomerSales: any = async () => {
    const updatedSalesTableData: any = salesTableData.map((tableData: any) => ({
      ...tableData,
      qty: 1,
    }));
    console.log('updated sales table data for amend', updatedSalesTableData);
    const values = {
      amended_from: query?.deliveryNoteId,
      custom_client_name: selectedClient,
      custom_kun_category: selectedCategory?.KunCategory?.name1,
      custom_cs_category: selectedCategory?.CsCategory?.name1,
      custom_bb_category: selectedCategory?.BBCategory?.name1,
      custom_ot_category: selectedCategory?.OtCategory?.name1,
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

  const HandleDeleteDeliveryNote: any = async (id: any) => {
    // let deleteDeliveryNoteApi:any = await
  };

  const handleDeliveryNotePrintApi: any = async (id: any) => {
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
    HandleUpdateSalesdocStatus,
    HandleAmendButtonForCustomerSales,
    HandleDeleteDeliveryNote,
    handleDeliveryNotePrintApi,
    defaultSalesDate,
    isLoading,
  };
};

export default UseCustomerSaleDetailHook;
