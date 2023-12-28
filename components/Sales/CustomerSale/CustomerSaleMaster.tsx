import SalesHeader from '@/components/Header/SalesHeader';
import CustomerSalesTable from './CustomerSalesTable';
import CustomerSaleTable1 from './CustomerSalesTable1';
import CustomerSalesTable2 from './CustomerSalesTable2';
import UseCustomerSaleHook from '@/hooks/Sales/Customer-Sales/customer-sale-hook';

const CustomerSaleMaster = () => {
  const {
    salesTableData,
    setSalesTableData,
    kunCsOtCategoryListData,
    BBCategoryListData,
    clientNameListData,
    selectedDropdownValue,
    setSelectedDropdownValue,
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
  }: any = UseCustomerSaleHook();

  console.log('kunCsOtCategoryListData', kunCsOtCategoryListData);
  return (
    <div className="container-lg">
      <SalesHeader />
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
            className={`btn btn-outline-primary form-submit-button px-2 py-0 ms-3`}
            // onClick={handleCreate}
          >
            Create
          </button>
        </div>
        <CustomerSaleTable1
          clientNameListData={clientNameListData}
          selectedDropdownValue={selectedDropdownValue}
          setSelectedDropdownValue={setSelectedDropdownValue}
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
  );
};

export default CustomerSaleMaster;
