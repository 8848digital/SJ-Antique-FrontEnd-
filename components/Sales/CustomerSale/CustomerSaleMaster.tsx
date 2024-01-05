import SalesHeader from '@/components/Header/SalesHeader';
import UseCustomerSaleHook from '@/hooks/Sales/Customer-Sales/customer-sale-hook';
import CustomerSalesTable from './CustomerSalesTable';
import CustomerSaleTable1 from './CustomerSalesTable1';
import CustomerSalesTable2 from './CustomerSalesTable2';
import UseDeliveryNoteHook from '@/hooks/Sales/Customer-Sales/delivery-note-hook';
import KundanListing from '@/components/KundanReadyReceipts/KundanReadyReceiptsListing';

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
  }: any = UseCustomerSaleHook();
  const { deliveryNoteListing }: any = UseDeliveryNoteHook();
  console.log(deliveryNoteListing, 'client name in listing');
  console.log('kunCsOtCategoryListData', kunCsOtCategoryListData);
  return (
    <div className="container-lg px-0">
      <SalesHeader />
      <div
        className="nav nav-pills mb-3 justify-content-center"
        id="pills-tab"
        role="tablist"
      >
        <div className="nav-tabs tabs-container w-50" role="presentation">
          <button
            className="nav-link active w-100 border p-1"
            id="pills-home-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-home"
            type="button"
            role="tab"
            aria-controls="pills-home"
            aria-selected="true"
          >
            Delivery note list
          </button>
        </div>
        <div className="nav-tabs tabs-container w-50" role="presentation">
          <button
            className="nav-link w-100 border p-1"
            id="pills-profile-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-profile"
            type="button"
            role="tab"
            aria-controls="pills-profile"
            aria-selected="false"
          >
            Create new delivery note
          </button>
        </div>
      </div>
      <div className="tab-content" id="pills-tabContent">
        <div
          className="tab-pane fade show active"
          id="pills-home"
          role="tabpanel"
          aria-labelledby="pills-home-tab"
        >
          <KundanListing
            kundanListing={deliveryNoteListing}
            karigarData={
              clientNameListData?.length > 0 &&
              clientNameListData !== null &&
              clientNameListData.map((data: any) => ({
                karigar_name: data.client_name,
              }))
            }
            colPlaceholder1={'Delivery Note No.'}
            colPlaceholder2={'Client '}
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
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerSaleMaster;
