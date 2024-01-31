import React from 'react';
import BarcodeFilterListing from './BarcodeFilterListing';
import BarcodeListingTable from './BarcodeListingTable';
import UseBarcodeFilterList from '@/hooks/Barcode/barcode-filter-hook';
import BarcodeCategorySection from './BarcodeCategoryTable';

const BarcodeMaster = () => {
  const {
    karigarList,
    searchKarigar,
    setSearchKarigar,
    selectDropDownReset,
    setSelectDropDownReset,
    handleSearchBarcodeItemCodeDetails,
    handleSearchBtn,
    itemCodeDataToShow,
    showCategorySection,
    handleGenerateBarcodeListBtn,
    showBarcodeTableSection,
    handleCheckboxChange,
    checkedItems
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
        handleSearchBarcodeItemCodeDetails={handleSearchBarcodeItemCodeDetails}
        handleSearchBtn={handleSearchBtn}

      />
      {showCategorySection && (
        <BarcodeCategorySection
          itemCodeDataToShow={itemCodeDataToShow}
          handleGenerateBarcodeListBtn={handleGenerateBarcodeListBtn}
          handleCheckboxChange={handleCheckboxChange}
          checkedItems={checkedItems}
        />
      )}

      {showBarcodeTableSection && (
        <BarcodeListingTable />
      )}
    </div>
  );
};

export default BarcodeMaster;
