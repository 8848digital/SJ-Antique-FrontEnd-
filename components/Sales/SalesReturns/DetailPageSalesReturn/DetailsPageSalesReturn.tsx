import SalesHeader from '@/components/Header/SalesHeader';
import UseCustomSalesReturnHook from '@/hooks/Sales/Sales-Returns/custom-sales-return-hook';
import UseSalesReturnMasterHook from '@/hooks/Sales/Sales-Returns/sales-return-master-hook';
import CustomerSalesTable from '../../CustomerSale/CustomerSalesTable';
import CustomerSalesTable1 from '../../CustomerSale/CustomerSalesTable1';
import SaleReurnsButtonSection from './ButtonSectionSalesReturn';

const DetailsPageSalesReturn = () => {
  const {
    salesReturnTableData,
    setSalesReturnTableData,
    itemList,
    clientNameListData,
    selectedItemCodeForCustomerSale,
    setSelectedItemCodeForCustomerSale,
  }: any = UseSalesReturnMasterHook();

  const {
    handleSalesReturnTableFieldChange,
    handleAddRowForSalesReturn,
    handleDeleteRowOfSalesReturnTable,
    itemCodeDropdownReset,
    selectedClient,
    setSelectedClient,
    handleSelectClientGroup,
  }: any = UseCustomSalesReturnHook();
  return (
    <div className="container-lg px-0">
      <SalesHeader />
      <div>
        <SaleReurnsButtonSection
        // stateForDocStatus={stateForDocStatus}
        // setStateForDocStatus={setStateForDocStatus}
        // handleUpdateDeliveryNote={handleUpdateDeliveryNote}
        // readOnlyFields={readOnlyFields}
        // setReadOnlyFields={setReadOnlyFields}
        // showSaveButtonForAmendFlow={showSaveButtonForAmendFlow}
        // setShowSaveButtonForAmendFlow={setShowSaveButtonForAmendFlow}
        // HandleUpdateSalesdocStatus={HandleUpdateSalesdocStatus}
        // HandleAmendButtonForCustomerSales={
        //   HandleAmendButtonForCustomerSales
        // }
        // HandleDeleteDeliveryNote={HandleDeleteDeliveryNote}
        // handleDeliveryNotePrintApi={handleDeliveryNotePrintApi}
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
        />
      </div>
    </div>
  );
};

export default DetailsPageSalesReturn;
