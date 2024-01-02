import { useEffect } from 'react';
import UseCustomerSaleHook from './customer-sale-hook';
import { useDispatch, useSelector } from 'react-redux';
import {
  GetDetailOfDeliveryNote,
  get_detail_delivery_note_data,
} from '@/store/slices/Sales/getDetailOfDeliveryNoteApi';
import { get_access_token } from '@/store/slices/auth/login-slice';

const UseCustomerSaleDetailHook = () => {
  const dispatch = useDispatch();
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
  }: any = UseCustomerSaleHook();

  const loginAcessToken = useSelector(get_access_token);
  const DetailOfDeliveryNoteFromStore: any = useSelector(
    get_detail_delivery_note_data
  );
  console.log('DetailOfDeliveryNote from store', DetailOfDeliveryNoteFromStore);

  useEffect(() => {
    const reqParams: any = {
      token: loginAcessToken.token,
      // id:
    };
    dispatch(GetDetailOfDeliveryNote(reqParams));
  }, []);

  useEffect(() => {}, [DetailOfDeliveryNoteFromStore]);

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
  };
};

export default UseCustomerSaleDetailHook;
