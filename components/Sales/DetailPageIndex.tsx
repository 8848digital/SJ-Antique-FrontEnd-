import React from 'react';
import DetailPageCustomerSale from './CustomerSale/DetailPageCustomerSale/DetailPageCustomerSale';
import { useRouter } from 'next/router';
import DetailsPageSalesReturn from './SalesReturns/DetailPageSalesReturn/DetailsPageSalesReturn';

const DetailPageIndex = () => {
  const { query } = useRouter();
  console.log('query in sales return detail page', query);
  return (
    <div>
      {query?.saleId === 'customerSale' && <DetailPageCustomerSale />}
      {query?.saleId === 'saleReturns' && <DetailsPageSalesReturn />}
    </div>
  );
};

export default DetailPageIndex;
