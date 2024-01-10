import UseKundanKarigarDetailHook from '@/hooks/PurchaseReceiptHook/PurchaseReceiptDetailHook/kundan-karigar-detail-hook';
import React, { useEffect } from 'react';
import KundanTable from '../KundanTable';
import KundanKarigarReadyReceiptMasterTable from '../KundanKarigarReadyReceiptMasterTable';
import useReadyReceiptKarigar from '@/hooks/PurchaseReceiptHook/purchase-receipt-master-hook';
import DocStatusButtonChanges from '../../ButtonChanges/DocStatusButtonChanges';
import PurchaseReceiptModal from '../../ModalMaster/PurchaseReceiptModal';
import '../../../styles/detailPage.module.css';
import { useSelector } from 'react-redux';
import { get_specific_receipt_data } from '@/store/slices/PurchaseReceipt/getSpecificPurchaseReceipt-slice';
import Loader from '../../NoRecord/Loader';
import NoRecord from '../../NoRecord/NoRecord';
import { useRouter } from 'next/router';

const DetailPageReadyReceipt = () => {
  const { defaultKarigarData, readOnlyFields, setReadOnlyFields, isLoading } =
    UseKundanKarigarDetailHook();

  const { query } = useRouter();
  console.log('query in receipt', query);
  const {
    setClick,
    kundanListing,
    handleCreate,
    handleRecipietChange,
    handleAddRow,
    karigarData,
    setRecipitData,
    handleFieldChange,
    tableData,
    handleDeleteRow,
    handleTabPress,
    setTableData,
    kundanKarigarData,
    handleModal,
    handleModalFieldChange,
    materialWeight,
    materialListData,
    calculateRowValue,
    handleDeleteChildTableRow,
    recipitData,
    setMaterialWeight,
    closeModal,
    handleSaveModal,
    showModal,
    lastPartOfURL,
    HandleDeleteReceipt,
    selectedDropdownValue,
    setSelectedDropdownValue,
    readyReceiptType,
    setReadyReceiptType,
    stateForDocStatus,
    setStateForDocStatus,
    handleUpdateReceipt,
    setShowSaveButtonForAmendFlow,
    showSaveButtonForAmendFlow,
    HandleAmendButtonForDuplicateChitti,
    selectedKundanKarigarDropdownValue,
    setSelectedKundanKarigarDropdownValue,
    calculateEditTotal,
    handleClearFileUploadInput,
    lastInputRef,
    firstInputRef,
  } = useReadyReceiptKarigar();
  const SpecificDataFromStore: any = useSelector(get_specific_receipt_data);

  useEffect(() => {
    if (defaultKarigarData?.length > 0 && defaultKarigarData !== null) {
      defaultKarigarData.map((data: any) => {
        setTableData(data?.items);
        setRecipitData(data);
        setReadyReceiptType(data?.custom_ready_receipt_type);
        setSelectedDropdownValue(data?.custom_karigar);
      });
    }
  }, [
    defaultKarigarData,
    setReadyReceiptType,
    setSelectedDropdownValue,
    setRecipitData,
    setTableData,
  ]);

  return (
    <div className="container">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {SpecificDataFromStore?.data?.length === 0 && isLoading === false ? (
            <NoRecord
              title="Record not found 😥"
              heading=""
              backButtonUrl={`/readyReceipt/${query?.receipt}`}
            />
          ) : (
            <div>
              {defaultKarigarData?.length > 0 &&
                defaultKarigarData !== null &&
                defaultKarigarData.map((data: any, index: any) => (
                  <div key={index}>
                    <DocStatusButtonChanges
                      data={data}
                      stateForDocStatus={stateForDocStatus}
                      setStateForDocStatus={setStateForDocStatus}
                      handleUpdateReceipt={handleUpdateReceipt}
                      readOnlyFields={readOnlyFields}
                      setReadOnlyFields={setReadOnlyFields}
                      setShowSaveButtonForAmendFlow={
                        setShowSaveButtonForAmendFlow
                      }
                      showSaveButtonForAmendFlow={showSaveButtonForAmendFlow}
                      HandleAmendButtonForDuplicateChitti={
                        HandleAmendButtonForDuplicateChitti
                      }
                    />
                  </div>
                ))}

              <div className=" table">
                <KundanTable
                  handleRecipietChange={handleRecipietChange}
                  recieptData={recipitData}
                  karigarData={karigarData}
                  setRecipitData={setRecipitData}
                  selectedDropdownValue={selectedDropdownValue}
                  setSelectedDropdownValue={setSelectedDropdownValue}
                  defaultKarigarData={defaultKarigarData}
                  setReadyReceiptType={setReadyReceiptType}
                  setStateForDocStatus={setStateForDocStatus}
                  readOnlyFields={readOnlyFields}
                  setReadOnlyFields={setReadOnlyFields}
                />
              </div>
              <div className="container d-flex justify-content-end p-o">
                <button
                  className="btn btn-link p-0"
                  onClick={() => {
                    if (!readOnlyFields) {
                      handleAddRow('tableRow');
                    }
                  }}
                >
                  Add Row
                </button>
              </div>
              <div className="table">
                <KundanKarigarReadyReceiptMasterTable
                  handleFieldChange={handleFieldChange}
                  tableData={tableData}
                  selectedKundanKarigarDropdownValue={
                    selectedKundanKarigarDropdownValue
                  }
                  setSelectedKundanKarigarDropdownValue={
                    setSelectedKundanKarigarDropdownValue
                  }
                  handleDeleteRow={handleDeleteRow}
                  handleTabPress={handleTabPress}
                  setTableData={setTableData}
                  kundanKarigarData={kundanKarigarData}
                  handleModal={handleModal}
                  setStateForDocStatus={setStateForDocStatus}
                  readOnlyFields={readOnlyFields}
                  setReadOnlyFields={setReadOnlyFields}
                  calculateEditTotal={calculateEditTotal}
                  handleClearFileUploadInput={handleClearFileUploadInput}
                  keyValue={'edit'}
                  handleUpdateReceipt={handleUpdateReceipt}
                  lastInputRef={lastInputRef}
                  firstInputRef={firstInputRef}
                />
              </div>
              <PurchaseReceiptModal
                tableData={tableData}
                showModal={showModal}
                closeModal={closeModal}
                handleModalFieldChange={handleModalFieldChange}
                handleAddRow={handleAddRow}
                materialWeight={materialWeight}
                setMaterialWeight={setMaterialWeight}
                materialListData={materialListData}
                calculateRowValue={calculateRowValue}
                handleDeleteChildTableRow={handleDeleteChildTableRow}
                setRecipitData={setRecipitData}
                recipitData={recipitData}
                selectedDropdownValue={selectedDropdownValue}
                setSelectedDropdownValue={setSelectedDropdownValue}
                handleSaveModal={handleSaveModal}
                setStateForDocStatus={setStateForDocStatus}
                readOnlyFields={readOnlyFields}
                setReadOnlyFields={setReadOnlyFields}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DetailPageReadyReceipt;
