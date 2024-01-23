import { useRouter } from 'next/router';
import React from 'react';
import ItemStatusReport from './ItemStatusReport';
import useItemStatusReportHook from '@/hooks/Report/item-status-report-hook';

const ReportIndexPage = () => {
  const router = useRouter();
  const pathcontent = router?.asPath?.split('/');
  console.log(pathcontent, 'pathcontent index');
  const key = pathcontent[pathcontent?.length - 1];
  const { itemStatusReportState, dailyQtyStatusReport }: any =
    useItemStatusReportHook();
  return (
    <div>
      {key === 'itemStatusReport' && (
        <ItemStatusReport
          itemStatusReportState={itemStatusReportState}
          reportName={'Item Status Report'}
        />
      )}
      {key === 'dailyQtyStatus' && (
        <ItemStatusReport
          itemStatusReportState={dailyQtyStatusReport}
          reportName={'Daily Quantity Status Report'}
        />
      )}
    </div>
  );
};

export default ReportIndexPage;
