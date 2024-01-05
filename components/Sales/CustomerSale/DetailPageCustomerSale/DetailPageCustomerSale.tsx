import React from 'react';
import CustomerSalesTable from '../CustomerSalesTable';
import CustomerSalesTable2 from '../CustomerSalesTable2';
import CustomerSalesTable1 from '../CustomerSalesTable1';
import SalesHeader from '@/components/Header/SalesHeader';
import UseCustomerSaleDetailHook from '@/hooks/Sales/Customer-Sales/sales-detail-page-hook';
import CustomerSalesButtonsSection from './CustomerSalesButtonsSection';

const DetailPageCustomerSale = () => {
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
    stateForDocStatus,
    setStateForDocStatus,
    handleUpdateDeliveryNote,
    readOnlyFields,
    setReadOnlyFields,
    showSaveButtonForAmendFlow,
    setShowSaveButtonForAmendFlow,
    HandleUpdateSalesdocStatus,
    HandleAmendButtonForCustomerSales,
    HandleDeleteDeliveryNote,
    handleDeliveryNotePrintApi,
    defaultSalesDate,
  }: any = UseCustomerSaleDetailHook();

  console.log('stateee', salesTableData);

  return (
    <div className="container-lg">
      <SalesHeader />
      <div>
        <div className={`text-end mb-1`}>
          <CustomerSalesButtonsSection
            stateForDocStatus={stateForDocStatus}
            setStateForDocStatus={setStateForDocStatus}
            handleUpdateDeliveryNote={handleUpdateDeliveryNote}
            readOnlyFields={readOnlyFields}
            setReadOnlyFields={setReadOnlyFields}
            showSaveButtonForAmendFlow={showSaveButtonForAmendFlow}
            setShowSaveButtonForAmendFlow={setShowSaveButtonForAmendFlow}
            HandleUpdateSalesdocStatus={HandleUpdateSalesdocStatus}
            HandleAmendButtonForCustomerSales={
              HandleAmendButtonForCustomerSales
            }
            HandleDeleteDeliveryNote={HandleDeleteDeliveryNote}
            handleDeliveryNotePrintApi={handleDeliveryNotePrintApi}
          />
        </div>
        <CustomerSalesTable1
          clientNameListData={clientNameListData}
          selectedClient={selectedClient}
          setSelectedClient={setSelectedClient}
          readOnlyFields={readOnlyFields}
          setStateForDocStatus={setStateForDocStatus}
          defaultSalesDate={defaultSalesDate}
        />
        <CustomerSalesTable2
          kunCsOtCategoryListData={kunCsOtCategoryListData}
          BBCategoryListData={BBCategoryListData}
          selectedCategory={selectedCategory}
          setSeletedCategory={setSeletedCategory}
          handleSelectChange={handleSelectChange}
          readOnlyFields={readOnlyFields}
          key={'edit'}
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
          readOnlyFields={readOnlyFields}
          setStateForDocStatus={setStateForDocStatus}
        />
      </div>
    </div>
  );
};

export default DetailPageCustomerSale;
