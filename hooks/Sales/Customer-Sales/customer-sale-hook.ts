import getBBCategoryApi from '@/services/api/Master/get-bbCategory-api';
import getClientApi from '@/services/api/Master/get-client-api';
import getKunCsOtCategoryApi from '@/services/api/Master/get-kunCsOtCategory-api';
import { get_access_token } from '@/store/slices/auth/login-slice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const UseCustomerSaleHook = () => {
  const dispatch = useDispatch();
  const loginAcessToken = useSelector(get_access_token);

  const [kunCsOtCategoryListData, setKunCsOtCategoryListData] = useState<any>(
    []
  );
  const [BBCategoryListData, setBBCategoryListData] = useState<any>([]);
  const [clientNameListData, setClientNameListData] = useState<any>([]);
  const [selectedDropdownValue, setSelectedDropdownValue] = useState<any>('');
  console.log('selected sale client', selectedDropdownValue);
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
    };

    getKunCsOTCategoryData();
  }, []);

  const SalesTableInitialState: any = {
    idx: 1,
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

  const [salesTableData, setSalesTableData] = useState<any>([
    SalesTableInitialState,
  ]);
  return {
    salesTableData,
    setSalesTableData,
    kunCsOtCategoryListData,
    BBCategoryListData,
    clientNameListData,
    selectedDropdownValue,
    setSelectedDropdownValue,
  };
};

export default UseCustomerSaleHook;
