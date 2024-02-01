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
    checkedItems,
    kunCsOtCategoryData,
    BBcategoryData,
    selectedCategory,
    setSeletedCategory,
    handleSelectChange,
    salesTableData,
    setSalesTableData
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
          kunCsOtCategoryData={kunCsOtCategoryData}
          BBcategoryData={BBcategoryData}
          selectedCategory={selectedCategory}
          setSeletedCategory={setSeletedCategory}
          handleSelectChange={handleSelectChange}
        />
      )}
      {showBarcodeTableSection && <BarcodeListingTable salesTableData={salesTableData} />}
    </div>
  );
};

export default BarcodeMaster;
