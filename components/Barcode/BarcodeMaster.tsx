import React from 'react';
import BarcodeFilterListing from './BarcodeFilterListing';
import BarcodeCategoryTable from './BarcodeCategoryTable';
import BarcodeListingTable from './BarcodeListingTable';
import UseBarcodeFilterList from '@/hooks/Barcode/barcode-filter-hook';

const BarcodeMaster = () => {
  const {
    karigarList,
    searchKarigar,
    setSearchKarigar,
    selectDropDownReset,
    setSelectDropDownReset,
  }: any = UseBarcodeFilterList();
  return (
    <div className="container-lg">
      BarcodeMaster
      <BarcodeFilterListing
        karigarList={karigarList}
        searchKarigar={searchKarigar}
        setSearchKarigar={setSearchKarigar}
        selectDropDownReset={selectDropDownReset}
        setSelectDropDownReset={setSelectDropDownReset}
      />
      <BarcodeCategoryTable />
      <BarcodeListingTable />
    </div>
  );
};

export default BarcodeMaster;
