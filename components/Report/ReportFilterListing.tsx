import React from 'react';
import SearchSelectInputField from '../SearchSelectInputField/SearchSelectInputField';

const ReportFilterListing: any = ({ reportName }: any) => {
  return (
    <div className=" d-flex justify-content-center mb-2">
      {reportName === 'Item Status Report' && (
        <div className="m-1">
          <label className="text-grey">item</label>
          <SearchSelectInputField />
        </div>
      )}
      <div className="m-1">
        <label className="text-grey">From Date</label>
        <SearchSelectInputField />
      </div>
      <div className="m-1">
        <label className="text-grey">To Date</label>
        <SearchSelectInputField />
      </div>
      <div className="m-1">
        <label className="text-grey">Voucher Name</label>
        <SearchSelectInputField />
      </div>
    </div>
  );
};

export default ReportFilterListing;
