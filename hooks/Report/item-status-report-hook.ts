import { useState } from 'react';

const useItemStatusReportHook = () => {
  const [itemStatusReportState, setItemStatusReportState] = useState();
  return {
    itemStatusReportState,
  };
};
export default useItemStatusReportHook;
