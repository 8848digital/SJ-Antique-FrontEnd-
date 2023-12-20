import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

const UseCustomerSaleHook = () => {
  const dispatch = useDispatch();

  const SalesTableInitialState: any = {
    idx: 1,
    product_code: '',
    gross_wt: '',
    kun_wt: '',
    cs_wt: '',
    bb_wt: '',
    other_wt: '',
    net_wt: '',
    cs_: '',
    cs_amt: '',
    kun_pcs: '',
    kun_: '',
    kun_amt: '',
    ot_: '',
    ot_amt: 0,
    other: '',
    amount: 0,
  };

  const [salesTableData, setSalesTableData] = useState<any>([
    SalesTableInitialState,
  ]);
  return;
};

export default UseCustomerSaleHook;
