import SalesHeader from '@/components/Header/SalesHeader';
import CustomerSalesTable from '../CustomerSale/CustomerSalesTable';
import CustomerSalesTable1 from '../CustomerSale/CustomerSalesTable1';
import TabSection from '@/components/TabSection';

const SaleReturnsMaster = () => {
  return (
    <div className="container-lg px-0">
      <SalesHeader />
      <div>
        <TabSection
          firstTabHeading="Sale Returns"
          secondTabHeading="Create new sales Return"
        />

        <div className="tab-content" id="pills-tabContent">
          <div
            className="tab-pane fade show active"
            id="pills-home"
            role="tabpanel"
            aria-labelledby="pills-home-tab"
          >
            Sale Returns
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
                  // onClick={handleEmptyDeliveryNote}
                  className=" btn btn-outline-primary px-2 py-0 form-submit-button"
                >
                  New
                </button>
                <button
                  type="button"
                  // onClick={handleDNCreate}
                  className={`btn btn-outline-primary form-submit-button px-2 py-0 ms-3`}
                >
                  Create
                </button>
              </div>
              <CustomerSalesTable1
              // clientNameListData={clientNameListData}
              // selectedClient={selectedClient}
              // setSelectedClient={setSelectedClient}
              // handleSelectClientGroup={handleSelectClientGroup}
              // clientGroupList={clientGroupList}
              />
              {/* <CustomerSalesTable2
              kunCsOtCategoryListData={kunCsOtCategoryListData}
              BBCategoryListData={BBCategoryListData}
              selectedCategory={selectedCategory}
              setSeletedCategory={setSeletedCategory}
              handleSelectChange={handleSelectChange}
            /> */}
              <CustomerSalesTable
              // handleSalesTableFieldChange={handleSalesTableFieldChange}
              // clientNameListData={clientNameListData}
              // salesTableData={salesTableData}
              // setSalesTableData={setSalesTableData}
              // selectedItemCodeForCustomerSale={selectedItemCodeForCustomerSale}
              // setSelectedItemCodeForCustomerSale={
              //   setSelectedItemCodeForCustomerSale
              // }
              // handleAddRowForSales={handleAddRowForSales}
              // handleDeleteRowOfSalesTable={handleDeleteRowOfSalesTable}
              // selectedCategory={selectedCategory}
              // itemList={itemList}
              // itemCodeDropdownReset={itemCodeDropdownReset}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaleReturnsMaster;
