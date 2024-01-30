import React from 'react';
import BarcodeFilterListing from './BarcodeFilterListing';
import BarcodeCategoryTable from './BarcodeCategoryTable';
import BarcodeListingTable from './BarcodeListingTable';

const BarcodeMaster = () => {
  return (
    <div className="container-lg">
      BarcodeMaster
      <BarcodeFilterListing />
      <BarcodeCategoryTable />
      <BarcodeListingTable />
    </div>
  );
};

export default BarcodeMaster;
