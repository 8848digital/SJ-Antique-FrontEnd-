import React, { useEffect, useState } from 'react';

const useReadyReceiptCustomCalculationHook = () => {
  const calculateWtForCreateReceipt: any = ({ tableData, indexVal }: any) => {
    return tableData?.map((row: any, i: any) => {
      if (row.idx === indexVal) {
        const customOther = parseFloat(row.custom_other);
        const totalAmount = parseFloat(row.totalAmount);

        if (!isNaN(customOther) && !isNaN(totalAmount)) {
          return {
            ...row,
            custom_gross_wt:
              Number(row.custom_net_wt) +
              Number(row.custom_few_wt) +
              Number(row.custom_mat_wt),
            custom_total: totalAmount + customOther,
          };
        } else if (!isNaN(customOther)) {
          return {
            ...row,
            custom_gross_wt:
              Number(row.custom_net_wt) +
              Number(row.custom_few_wt) +
              Number(row.custom_mat_wt),
            custom_total: customOther,
          };
        } else {
          return {
            ...row,
            custom_gross_wt:
              Number(row.custom_net_wt) +
              Number(row.custom_few_wt) +
              Number(row.custom_mat_wt),
            custom_total: totalAmount,
          };
        }
      }
      return row;
    });
  };
  return { calculateWtForCreateReceipt };
};

export default useReadyReceiptCustomCalculationHook;
