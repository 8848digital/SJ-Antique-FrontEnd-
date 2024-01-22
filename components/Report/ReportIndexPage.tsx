import { useRouter } from 'next/router';
import React from 'react';
import ItemStatusReport from './ItemStatusReport';

const ReportIndexPage = () => {
  const router = useRouter();
  const pathcontent = router?.asPath?.split('/');
  console.log(pathcontent, 'pathcontent index');
  const key = pathcontent[pathcontent?.length - 1];
  return (
    <div>
      {key === 'itemStatusReport' && <ItemStatusReport />}
      {/* {key === 'saleReturns' && <SaleReturnsMaster />} */}
    </div>
  );
};

export default ReportIndexPage;
