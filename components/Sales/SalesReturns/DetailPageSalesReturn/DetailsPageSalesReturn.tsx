import SalesHeader from '@/components/Header/SalesHeader';
import UseCustomSalesReturnHook from '@/hooks/Sales/Sales-Returns/custom-sales-return-hook';
import UseSalesReturnMasterHook from '@/hooks/Sales/Sales-Returns/sales-return-master-hook';
import CustomerSalesTable from '../../CustomerSale/CustomerSalesTable';
import CustomerSalesTable1 from '../../CustomerSale/CustomerSalesTable1';

import SaleReturnsButtonSection from './ButtonSectionSalesReturn';
import UseSalesReturnDetailHook from '@/hooks/Sales/Sales-Returns/sales-return-detail-hook';

const DetailsPageSalesReturn = () => {
  const {
    readOnlyFields,
    isLoading,
    salesReturnTableData,
    setSalesReturnTableData,
    defaultSalesDate,
    selectedClient,
    setReadOnlyFields,
    showSaveButtonForAmendFlow,
    setShowSaveButtonForAmendFlow,
    HandleUpdateSalesdocStatus,
    handleUpdateSalesReturn,
    stateForDocStatus,
    setStateForDocStatus,
    itemList,
    clientNameListData,
    selectedItemCodeForCustomerSale,
    setSelectedItemCodeForCustomerSale,
    handleSalesReturnTableFieldChange,
    handleAddRowForSalesReturn,
    handleDeleteRowOfSalesReturnTable,
    handleEmptySaleReturnData,
    itemCodeDropdownReset,
    setSelectedClient,
    selectedClientGroup,
    handleSelectClientGroup,
    handlePrintApi,
    handleDeleteSalesReturn,
    handleAmendButtonForSalesReturn,
    setItemCodeDropdownReset,
  }: any = UseSalesReturnDetailHook();

  return (
    <div className="container-lg px-0">
      <SalesHeader />
      <div>
        <SaleReturnsButtonSection
          stateForDocStatus={stateForDocStatus}
          setStateForDocStatus={setStateForDocStatus}
          handleUpdateDeliveryNote={handleUpdateSalesReturn}
          readOnlyFields={readOnlyFields}
          setReadOnlyFields={setReadOnlyFields}
          showSaveButtonForAmendFlow={showSaveButtonForAmendFlow}
          setShowSaveButtonForAmendFlow={setShowSaveButtonForAmendFlow}
          HandleUpdateSalesdocStatus={HandleUpdateSalesdocStatus}
          HandleAmendButtonForSalesReturn={handleAmendButtonForSalesReturn}
          HandleDeleteDeliveryNote={handleDeleteSalesReturn}
          handlePrintApi={handlePrintApi}
        />
      </div>
      <div>
        <CustomerSalesTable1
          clientNameListData={clientNameListData}
          selectedClient={selectedClient}
          setSelectedClient={setSelectedClient}
          handleSelectClientGroup={handleSelectClientGroup}
          clientGroupList={
            clientNameListData?.length > 0 &&
            clientNameListData !== null &&
            clientNameListData.map((clientData: any) => ({
              ...clientData,
              client_group: clientData.client_group,
            }))
          }
          readOnlyFields={readOnlyFields}
        />

        <CustomerSalesTable
          handleSalesTableFieldChange={handleSalesReturnTableFieldChange}
          salesTableData={salesReturnTableData}
          setSalesTableData={setSalesReturnTableData}
          selectedItemCodeForCustomerSale={selectedItemCodeForCustomerSale}
          setSelectedItemCodeForCustomerSale={
            setSelectedItemCodeForCustomerSale
          }
          handleAddRowForSales={handleAddRowForSalesReturn}
          handleDeleteRowOfSalesTable={handleDeleteRowOfSalesReturnTable}
          itemList={itemList}
          itemCodeDropdownReset={itemCodeDropdownReset}
          readOnlyFields={readOnlyFields}
          setItemCodeDropdownReset={setItemCodeDropdownReset}
        />
      </div>
    </div>
  );
};

export default DetailsPageSalesReturn;
