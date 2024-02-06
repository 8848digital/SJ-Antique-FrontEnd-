import SalesHeader from '@/components/Header/SalesHeader';
import KundanListing from '@/components/KundanReadyReceipts/KundanReadyReceiptsListing';
import TabSection from '@/components/TabSection';
import UseCustomerSaleHook from '@/hooks/Sales/Customer-Sales/customer-sale-hook';
import CustomerSalesTable from './CustomerSalesTable';
import CustomerSaleTable1 from './CustomerSalesTable1';
import CustomerSalesTable2 from './CustomerSalesTable2';
import UseScrollbarHook from '@/hooks/Report/report-table-scrollbar-hook';

const CustomerSaleMaster = () => {
  const {
    salesTableData,
    setSalesTableData,
    kunCsOtCategoryListData,
    BBCategoryListData,
    clientNameListData,
    selectedItemCodeForCustomerSale,
    setSelectedItemCodeForCustomerSale,
    handleSalesTableFieldChange,
    handleAddRowForSales,
    handleDeleteRowOfSalesTable,
    selectedCategory,
    setSeletedCategory,
    handleSelectChange,
    itemList,
    handleEmptyDeliveryNote,
    selectedClient,
    setSelectedClient,
    handleDNCreate,
    handleSelectClientGroup,
    clientGroupList,
    HandleDeleteDeliveryNote,
    itemCodeDropdownReset,
    setItemCodeDropdownReset,
    deliveryNoteListParams,
    deliveryNoteListing,
    handleDeliveryNotePrintApi,
    selectedItemCode,
    setSelectedItemCode,
    HandleUpdateDocStatus,
    handleTabPressInSales,
    warehouseListData,
    selectedLocation,
    setSelectedLocation,
    setDeliveryNoteData,
    deliveryNoteData,
    kunCsOtFixedAmt,
    setKunCsOtFixedAmt,
    HandleFixedAmt,
  }: any = UseCustomerSaleHook();
  const {
    scrollableTableRef,
    handleMouseDown,
    handleMouseUp,
    handleMouseLeave,
    handleMouseMove,
  }: any = UseScrollbarHook();

  console.log(deliveryNoteListing, 'client name in listing');
  console.log('kunCsOtCategoryListData', kunCsOtCategoryListData);
  const kundanListing =
    deliveryNoteListing && deliveryNoteListing.length > 0
      ? deliveryNoteListing.filter((data: any) => {
        return data.is_return === 0;
      })
      : [];

  console.log('kundan listing', kundanListing);
  return (
    <div className="container-lg px-0">
      <SalesHeader />
      <TabSection
        firstTabHeading="Sales list"
        secondTabHeading="Create new Sales "
      />
      <div className="tab-content" id="pills-tabContent">
        <div
          className="tab-pane fade show active"
          id="pills-home"
          role="tabpanel"
          aria-labelledby="pills-home-tab"
        >
          <KundanListing
            kundanListing={kundanListing}
            karigarData={
              clientNameListData?.length > 0 &&
              clientNameListData !== null &&
              clientNameListData.map((data: any) => ({
                karigar_name: data.client_name,
              }))
            }
            colPlaceholder1={'Sales No.'}
            colPlaceholder2={'Client '}
            HandleDeleteReceipt={HandleDeleteDeliveryNote}
            HandleUpdateDocStatus={HandleUpdateDocStatus}
            printApiMethod={'print_delivery_note_sales'}
            printApiEntity={'sales'}
            deleteApiVersion={'v1'}
            deleteApiMethod={'delete_delivery_note_api'}
            deleteApiEntity={'sales'}
            purchasRecieptListParams={deliveryNoteListParams}
            kunKarigarDropdownReset={itemCodeDropdownReset}
            setKunKarigarDropdownReset={setItemCodeDropdownReset}
          />
        </div>
        <div
          className="tab-pane fade"
          id="pills-profile"
          role="tabpanel"
          aria-labelledby="pills-profile-tab"
        >
          <div>
            <div className={`text-end mb-1`}>
              <button
                type="submit"
                onClick={handleEmptyDeliveryNote}
                className=" btn btn-outline-primary px-2 py-0 form-submit-button"
              >
                New
              </button>
              <button
                type="button"
                onClick={handleDNCreate}
                className={`btn btn-outline-primary form-submit-button px-2 py-0 ms-3`}
              >
                Create
              </button>
            </div>
            <CustomerSaleTable1
              clientNameListData={clientNameListData}
              selectedClient={selectedClient}
              setSelectedClient={setSelectedClient}
              handleSelectClientGroup={handleSelectClientGroup}
              clientGroupList={clientGroupList}
              title="Sales No"
              warehouseListData={warehouseListData}
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
              setDeliveryNoteData={setDeliveryNoteData}
              deliveryNoteData={deliveryNoteData}
              itemCodeDropdownReset={itemCodeDropdownReset}
              setItemCodeDropdownReset={setItemCodeDropdownReset}
            />
            <CustomerSalesTable2
              kunCsOtCategoryListData={kunCsOtCategoryListData}
              BBCategoryListData={BBCategoryListData}
              selectedCategory={selectedCategory}
              setSeletedCategory={setSeletedCategory}
              handleSelectChange={handleSelectChange}
            />
            <CustomerSalesTable
              handleSalesTableFieldChange={handleSalesTableFieldChange}
              clientNameListData={clientNameListData}
              salesTableData={salesTableData}
              setSalesTableData={setSalesTableData}
              selectedItemCodeForCustomerSale={selectedItemCodeForCustomerSale}
              setSelectedItemCodeForCustomerSale={
                setSelectedItemCodeForCustomerSale
              }
              handleAddRowForSales={handleAddRowForSales}
              handleDeleteRowOfSalesTable={handleDeleteRowOfSalesTable}
              selectedCategory={selectedCategory}
              itemList={itemList}
              itemCodeDropdownReset={itemCodeDropdownReset}
              setItemCodeDropdownReset={setItemCodeDropdownReset}
              selectedItemCode={selectedItemCode}
              setSelectedItemCode={setSelectedItemCode}
              handleTabPressInSales={handleTabPressInSales}
              kunCsOtFixedAmt={kunCsOtFixedAmt}
              // setKunCsOtFixedAmt={setKunCsOtFixedAmt}
              HandleFixedAmt={HandleFixedAmt}
              showAddrowBtn={true}
              scrollableTableRef={scrollableTableRef}
              handleMouseDown={handleMouseDown}
              handleMouseUp={handleMouseUp}
              handleMouseLeave={handleMouseLeave}
              handleMouseMove={handleMouseMove}
              showAdditionalInputForCalculation={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerSaleMaster;
