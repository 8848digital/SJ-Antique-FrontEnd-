import getDeliveryNoteListing from '@/services/api/Sales/get-delivery-note-listing-api';
import UpdateDocStatusApi from '@/services/api/general/update-docStatus-api';
import { GetDetailOfSalesReturn } from '@/store/slices/Sales/get-detail-sales-return-slice';
import { get_access_token } from '@/store/slices/auth/login-slice';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const UseCustomSalesReturnHook = () => {
  const [selectedItemCodeForCustomerSale, setSelectedItemCodeForCustomerSale] =
    useState<any>({ id: '', item_code: '' });
  const dispatch = useDispatch()
  const { query } = useRouter()
  const loginAcessToken = useSelector(get_access_token);
  const SalesTableInitialState: any = {
    idx: 1,
    // kun_wt_initial: '',
    // cs_wt_initial: '',
    // bb_wt_initial: '',
    // ot_wt_initial: '',
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

  const [salesReturnTableData, setSalesReturnTableData] = useState<any>([
    SalesTableInitialState,
  ]);
  const [stateForDocStatus, setStateForDocStatus] = useState<boolean>(false);
  const [selectedClient, setSelectedClient] = useState<any>('');
  const [selectedClientGroup, setSelectedClientGroup] = useState<string>('');
  const [itemCodeDropdownReset, setItemCodeDropdownReset] =
    useState<boolean>(false);
  const [saleReturnDeliveryNoteListing, setSaleReturnDeliveryNoteListing] =
    useState<any>();

  const handleSalesReturnTableFieldChange: any = (
    itemIdx: number,
    fieldName: string,
    value: any
  ) => {
    setSalesReturnTableData((prevData: any) => {
      return prevData.map((item: any) => {
        if (item.idx === itemIdx) {
          // Update the field value
          return {
            ...item,
            [fieldName]: value,

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

  const handleAddRowForSalesReturn: any = () => {
    console.log('add row in sales return');
    const newRow: any = {
      idx: salesReturnTableData?.length + 1,
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

    setSalesReturnTableData([...salesReturnTableData, newRow]);
    setStateForDocStatus(true);
  };

  const handleDeleteRowOfSalesReturnTable: any = (id: any) => {
    console.log('delete row id', id);
    if (salesReturnTableData?.length > 1) {
      const updatedData = salesReturnTableData
        .filter((item: any) => item.idx !== id)
        .map((row: any, index: number) => ({ ...row, idx: index + 1 }));
      setSalesReturnTableData(updatedData);
      setStateForDocStatus(true);
    }
  };

  const handleEmptySaleReturnData = () => {
    // setSeletedCategory({
    //  KunCategory: '',
    //   CsCategory: '',
    //   BBCategory: '',
    //   OtCategory: '',
    // });
    setSelectedClient('');
    setSalesReturnTableData([SalesTableInitialState]);
    setSelectedItemCodeForCustomerSale({ id: '', item_code: '' });
    setStateForDocStatus(true);
    setItemCodeDropdownReset(true);
  };

  const handleSelectClientGroup = async (value: any) => {
    setSelectedClientGroup(value);
  };

  const HandleUpdateDocStatus: any = async (name?: any, docStatus?: any,) => {
    const params = `/api/resource/Delivery Note/${name}`;
    let updateDocStatus: any = await UpdateDocStatusApi(
      loginAcessToken?.token,
      docStatus,
      params
    );

    console.log(updateDocStatus, 'return docstatus ');
    if (updateDocStatus?.data?.hasOwnProperty("data")) {
      const deliveryNoteListParams = {
        version: 'v1',
        method: 'get_listening_delivery_note_sales_return',
        entity: 'delivery_note_api',
      };

      let updatedData: any = await getDeliveryNoteListing(
        loginAcessToken.token,
        deliveryNoteListParams
      );

      console.log(updatedData, 'delivery note listing dataa');
      if (updatedData?.data?.message?.status === 'success') {
        setSaleReturnDeliveryNoteListing(updatedData?.data?.message?.data);
      }

      const reqParams: any = {
        token: loginAcessToken.token,
        name: query?.deliveryNoteId,
      };
      dispatch(GetDetailOfSalesReturn(reqParams));
    }
  };

  return {
    salesReturnTableData,
    setSalesReturnTableData,
    selectedItemCodeForCustomerSale,
    setSelectedItemCodeForCustomerSale,
    handleSalesReturnTableFieldChange,
    handleAddRowForSalesReturn,
    handleDeleteRowOfSalesReturnTable,
    handleEmptySaleReturnData,
    selectedClient,
    setSelectedClient,
    selectedClientGroup,
    handleSelectClientGroup,
    SalesTableInitialState,
    stateForDocStatus,
    setStateForDocStatus,
    itemCodeDropdownReset,
    setItemCodeDropdownReset,
    saleReturnDeliveryNoteListing,
    setSaleReturnDeliveryNoteListing,
    HandleUpdateDocStatus
  };
};

export default UseCustomSalesReturnHook;
