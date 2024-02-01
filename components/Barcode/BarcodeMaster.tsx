import UseBarcodeFilterList from '@/hooks/Barcode/barcode-filter-hook';
import CustomerSalesTable from '../Sales/CustomerSale/CustomerSalesTable';
import TabSection from '../TabSection';
import BarcodeCategorySection from './BarcodeCategoryTable';
import BarcodeFilterListing from './BarcodeFilterListing';
import BarcodeListingTable from './BarcodeListingTable';
import useBarcodeListingHook from '@/hooks/Barcode/barcode-listing-hook';
import { useState } from 'react';
// import BarcodeListingTable from './BarcodeListingTable';

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
    salesTableData
  }: any = UseBarcodeFilterList();

  const { BarcodeListData, handleCheckboxForBarcodePrint, handleMultipleBarcodePrint, multipleRecordsForPrint, handleBarcodePrint }: any = useBarcodeListingHook();
  const [searchItemCode, setSearchItemCode] = useState<any>('');

  const filteredList =
    BarcodeListData?.length > 0 &&
      BarcodeListData !== null &&
      (searchItemCode) ? BarcodeListData.filter((item: any) => {
        const itemCodeMatch = searchItemCode
          ? item?.item_code?.toLowerCase()?.includes(searchItemCode?.toLowerCase())
          : true;
        return itemCodeMatch
      })
      : BarcodeListData;

  return (
    <div className="container-lg">
      <TabSection
        firstTabHeading="Barcode List"
        secondTabHeading="Create New Barcode"
      />
      <div className="tab-content" id="pills-tabContent">
        <div
          className="tab-pane fade show active"
          id="pills-home"
          role="tabpanel"
          aria-labelledby="pills-home-tab"
        >
          <BarcodeListingTable
            BarcodeListData={filteredList}
            handleMultipleBarcodePrint={handleMultipleBarcodePrint}
            handleCheckboxForBarcodePrint={handleCheckboxForBarcodePrint}
            setSearchItemCode={setSearchItemCode}
            searchItemCode={searchItemCode}
            handleBarcodePrint={handleBarcodePrint}
            multipleRecordsForPrint={multipleRecordsForPrint}
          />
        </div>
        <div
          className="tab-pane fade"
          id="pills-profile"
          role="tabpanel"
          aria-labelledby="pills-profile-tab"
        >
          <BarcodeFilterListing
            karigarList={karigarList}
            searchKarigar={searchKarigar}
            setSearchKarigar={setSearchKarigar}
            selectDropDownReset={selectDropDownReset}
            setSelectDropDownReset={setSelectDropDownReset}
            handleSearchBarcodeItemCodeDetails={
              handleSearchBarcodeItemCodeDetails
            }
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
          {showBarcodeTableSection && (
            <CustomerSalesTable salesTableData={salesTableData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default BarcodeMaster;
