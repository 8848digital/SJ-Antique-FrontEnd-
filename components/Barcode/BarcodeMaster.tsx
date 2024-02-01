import UseBarcodeFilterList from '@/hooks/Barcode/barcode-filter-hook';
import CustomerSalesTable from '../Sales/CustomerSale/CustomerSalesTable';
import TabSection from '../TabSection';
import BarcodeCategorySection from './BarcodeCategoryTable';
import BarcodeFilterListing from './BarcodeFilterListing';
import BarcodeListingTable from './BarcodeListingTable';
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
    BarcodeListData,
    salesTableData,
    setSalesTableData,
    handleBarcodeTableFieldChange,
    HandleCreateBarcode,
  }: any = UseBarcodeFilterList();
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
          <BarcodeListingTable BarcodeListData={BarcodeListData} />
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
            <>
              <button
                className="btn btn-primary my-2"
                onClick={HandleCreateBarcode}
              >
                Create Barcode
              </button>
              <CustomerSalesTable
                salesTableData={salesTableData}
                handleSalesTableFieldChange={handleBarcodeTableFieldChange}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BarcodeMaster;
