import React from 'react';
import CustomerSalesTable from '../Sales/CustomerSale/CustomerSalesTable';


const BarcodeListingTable = ({ salesTableData }: any) => {

  return (
    <div>
      <CustomerSalesTable salesTableData={salesTableData} />
    </div>
  );
};

export default BarcodeListingTable;
