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
import DeleteApi from '@/services/api/general/delete-api';
import { toast } from 'react-toastify';

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
    setItemCodeDropdownReset,
    HandleUpdateDocStatus,
    handleTabPressInSales,
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
  //     // setIsLoading(false);
  //     // setSalesTableData(DetailOfDeliveryNoteFromStore?.data?.items);
  //     // setSelectedClient(
  //     //   DetailOfDeliveryNoteFromStore?.data?.custom_client_name
  //     // );
  //     // setDefaultSalesDate(DetailOfDeliveryNoteFromStore?.data?.posting_date);
  //     setSeletedCategory({
  //       KunCategory:
  //         kunCsOtCategoryListData?.length > 0 &&
  //         kunCsOtCategoryListData.filter((data: any) => {
  //           data.name1 ===
  //             DetailOfDeliveryNoteFromStore?.data?.custom_kun_category && data;
  //         }),
  //       CsCategory: DetailOfDeliveryNoteFromStore?.data?.custom_cs_category,
  //       BBCategory: DetailOfDeliveryNoteFromStore?.data?.custom_bb_category,
  //       OtCategory: DetailOfDeliveryNoteFromStore?.data?.custom_ot_category,
  //     });
  //   }
  // }, [DetailOfDeliveryNoteFromStore]);

  useEffect(() => {
    if (DetailOfDeliveryNoteFromStore?.hasOwnProperty('data')) {
      // Extracting data from DetailOfDeliveryNoteFromStore
      const customKunCategory =
        DetailOfDeliveryNoteFromStore?.data?.custom_kun_category;
      const customCsCategory =
        DetailOfDeliveryNoteFromStore?.data?.custom_cs_category;
      const customBBCategory =
        DetailOfDeliveryNoteFromStore?.data?.custom_bb_category;
      const customOtCategory =
        DetailOfDeliveryNoteFromStore?.data?.custom_ot_category;

      // Filtering kunCsOtCategoryListData based on custom_category

      console.log(BBCategoryListData, 'selected category in detail');

      const kunCategoryData =
        kunCsOtCategoryListData?.length > 0
          ? kunCsOtCategoryListData.find(
              (data: any) => data.name1 === customKunCategory
            )
          : null;
      const csCategoryData =
        kunCsOtCategoryListData?.length > 0
          ? kunCsOtCategoryListData.find(
              (data: any) => data.name1 === customCsCategory
            )
          : null;
      const otCategoryData =
        kunCsOtCategoryListData?.length > 0
          ? kunCsOtCategoryListData.find(
              (data: any) => data.name1 === customOtCategory
            )
          : null;
      const bbCategoryData =
        BBCategoryListData?.length > 0
          ? BBCategoryListData.find(
              (data: any) => data.name1 === customBBCategory
            )
          : null;

      // Setting selected category state
      setSeletedCategory({
        KunCategory: kunCategoryData,
        CsCategory: csCategoryData,
        BBCategory: bbCategoryData,
        OtCategory: otCategoryData,
      });
    }
  }, [
    DetailOfDeliveryNoteFromStore,
    BBCategoryListData,
    kunCsOtCategoryListData,
  ]);

  console.log(
    'selected category in detail',

    BBCategoryListData
  );
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
    if (updateDeliveryNoteApi?.data?.message?.status === 'error') {
      toast.error(`${updateDeliveryNoteApi?.data?.message?.message}`);
    }
    if (updateDeliveryNoteApi?.data?.message?.status === 'success') {
      setStateForDocStatus(false);

      const reqParams: any = {
        token: loginAcessToken.token,
        name: query?.deliveryNoteId,
      };
      dispatch(GetDetailOfDeliveryNote(reqParams));
    }
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

  const HandleDeleteRecords: any = async (id: any) => {
    const version: any = 'v1';
    const method: any = 'delete_delivery_note_api';
    const entity: any = 'delivery_note_api';
    let deleteSalesReturnNoteApi: any = await DeleteApi(
      loginAcessToken?.token,
      version,
      method,
      entity,
      id
    );
    console.log('delete api res', deleteSalesReturnNoteApi);

    // if (deleteSalesReturnNoteApi?.message?.status === 'success') {
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

  console.log('stateForDocStatus in detail', stateForDocStatus);

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
    // HandleUpdateSalesdocStatus,
    HandleUpdateDocStatus,
    HandleAmendButtonForCustomerSales,
    HandleDeleteRecords,
    handleDeliveryNotePrintApi,
    defaultSalesDate,
    isLoading,
    setItemCodeDropdownReset,
    handleTabPressInSales,
  };
};

export default UseCustomerSaleDetailHook;
