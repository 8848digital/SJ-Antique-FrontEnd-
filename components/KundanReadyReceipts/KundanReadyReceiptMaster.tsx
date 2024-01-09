import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../../styles/readyReceipts.module.css';
import KundanListing from './KundanReadyReceiptsListing';
import KundanKarigarReadyReceiptMasterTable from './KundanKarigarReadyReceiptMasterTable';
import KundanTable from './KundanTable';

import { useRouter } from 'next/router';
import PurchaseReceiptModal from '../ModalMaster/PurchaseReceiptModal';
import useReadyReceiptKarigar from '@/hooks/readyReceiptKarigarHooks';

const ReadyReceiptKundanKarigarMaster = () => {
  const {
    setClick,
    kundanListing,
    setKundanListing,
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
    readOnlyFields,
    setReadOnlyFields,
    HandleUpdateDocStatus,
    handleTabPressOnModal,
    HandleEmptyReadyReceiptForm,
    selectedKundanKarigarDropdownValue,
    setSelectedKundanKarigarDropdownValue,
    kunKarigarDropdownReset,
    setKunKarigarDropdownReset,
    calculateEditTotal,
    purchasRecieptListParams,
    handleClearFileUploadInput,
    handleUpdateReceipt,
  } = useReadyReceiptKarigar();

  const router = useRouter();

  return (
    <div className="container-lg">
      <div>
        <div
          className="nav nav-pills my-2 justify-content-center "
          id="pills-tab"
          role="tablist"
        >
          <div className="nav-tabs tabs-container w-50 " role="presentation">
            <button
              className="nav-link active w-100 p-1 border h-100 "
              id="pills-home-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-home"
              type="button"
              role="tab"
              aria-controls="pills-home"
              aria-selected="true"
              // onClick={() => setClick(true)}
            >
              Ready receipts {lastPartOfURL} karigar
            </button>
          </div>
          <div className="nav-tabs tabs-container w-50 " role="presentation">
            <button
              className="nav-link  w-100 p-1 border h-100"
              id="pills-profile-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-profile"
              type="button"
              role="tab"
              aria-controls="pills-profile"
              aria-selected="false"
            >
              Create new ready receipt
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
              kundanListing={kundanListing}
              setKundanListing={setKundanListing}
              HandleDeleteReceipt={HandleDeleteReceipt}
              HandleUpdateDocStatus={HandleUpdateDocStatus}
              karigarData={karigarData}
              colPlaceholder1={'Receipt No.'}
              colPlaceholder2={'Karigar'}
              deleteApiVersion={'v1'}
              deleteApiMethod={'delete_purchase_receipt_delete'}
              deleteApiEntity={'delete_purchase_receipts'}
              purchasRecieptListParams={purchasRecieptListParams}
            />
          </div>
          <div
            className="tab-pane fade"
            id="pills-profile"
            role="tabpanel"
            aria-labelledby="pills-profile-tab"
          >
            <div>
              <div className={`${styles.button_field} mb-1`}>
                <button
                  type="submit"
                  onClick={HandleEmptyReadyReceiptForm}
                  className=" btn btn-outline-primary px-2 py-0 form-submit-button"
                >
                  New
                </button>
                <button
                  type="button"
                  className={`btn btn-outline-primary form-submit-button px-2 py-0 ms-3`}
                  onClick={handleCreate}
                >
                  Create
                </button>
              </div>
              <div className=" table">
                <KundanTable
                  handleRecipietChange={handleRecipietChange}
                  recieptData={recipitData}
                  karigarData={karigarData}
                  setRecipitData={setRecipitData}
                  selectedDropdownValue={selectedDropdownValue}
                  setSelectedDropdownValue={setSelectedDropdownValue}
                  readyReceiptType={readyReceiptType}
                  setReadyReceiptType={setReadyReceiptType}
                  stateForDocStatus={stateForDocStatus}
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
              <div>
                <KundanKarigarReadyReceiptMasterTable
                  handleFieldChange={handleFieldChange}
                  tableData={tableData}
                  handleDeleteRow={handleDeleteRow}
                  handleTabPress={handleTabPress}
                  setTableData={setTableData}
                  selectedKundanKarigarDropdownValue={
                    selectedKundanKarigarDropdownValue
                  }
                  setSelectedKundanKarigarDropdownValue={
                    setSelectedKundanKarigarDropdownValue
                  }
                  kundanKarigarData={kundanKarigarData}
                  handleModal={handleModal}
                  selectedDropdownValue={selectedDropdownValue}
                  setSelectedDropdownValue={setSelectedDropdownValue}
                  stateForDocStatus={stateForDocStatus}
                  setStateForDocStatus={setStateForDocStatus}
                  readOnlyFields={readOnlyFields}
                  setReadOnlyFields={setReadOnlyFields}
                  materialWeight={materialWeight}
                  kunKarigarDropdownReset={kunKarigarDropdownReset}
                  calculateEditTotal={calculateEditTotal}
                  handleClearFileUploadInput={handleClearFileUploadInput}
                  handleCreate={handleCreate}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
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
          handleTabPressOnModal={handleTabPressOnModal}
        />
      </div>
    </div>
  );
};

export default ReadyReceiptKundanKarigarMaster;
