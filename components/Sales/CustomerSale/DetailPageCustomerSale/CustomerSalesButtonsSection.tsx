import { get_detail_delivery_note_data } from '@/store/slices/Sales/getDetailOfDeliveryNoteApi';
import React from 'react';
import { useSelector } from 'react-redux';
import styles from '../../../../styles/readyReceipts.module.css';
import { useRouter } from 'next/router';

const CustomerSalesButtonsSection = ({
  stateForDocStatus,
  setstateForDocStatus,
  handleUpdateDeliveryNote,
  readOnlyFields,
  setReadOnlyFields,
  showSaveButtonForAmendFlow,
  setShowSaveButtonForAmendFlow,
}: any) => {
  const router = useRouter();
  const { query } = useRouter();
  console.log('queryy', query);
  const DetailOfDeliveryNoteFromStore: any = useSelector(
    get_detail_delivery_note_data
  );
  console.log(
    'DetailOfDeliveryNote from store',
    DetailOfDeliveryNoteFromStore,
    stateForDocStatus
  );

  const HandleAmendButtonChanges: any = async () => {
    console.log('docStatus from store in amend func');
    setShowSaveButtonForAmendFlow(true);
    setstateForDocStatus(true);
    setReadOnlyFields(false);
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        <div className="">
          <button
            type="button"
            className={`${styles.create_button} px-2 py-0 me-2`}
            onClick={() => router.push(`/sales/${query?.saleId}`)}
          >
            Back
          </button>

          {stateForDocStatus === true &&
            DetailOfDeliveryNoteFromStore?.docstatus === 0 && (
              <button
                type="button"
                className={`btn ${styles.docstatus_button}`}
              >
                <span className={`${styles.docstatus_button_text}`}>
                  Not saved
                </span>
              </button>
            )}
          {stateForDocStatus === false &&
            DetailOfDeliveryNoteFromStore?.docStatus === 0 && (
              <button
                type="button"
                className={`btn ${styles.docstatus_button}`}
              >
                <span className={`${styles.docstatus_button_text}`}>Draft</span>
              </button>
            )}
          {DetailOfDeliveryNoteFromStore?.docStatus === 1 && (
            <button type="button" className={`btn ${styles.docstatus_button}`}>
              <span className={`${styles.docstatus_button_text}`}>
                Submitted
              </span>
            </button>
          )}
          {DetailOfDeliveryNoteFromStore?.docStatus === 2 && (
            //   && readOnlyFields
            <button type="button" className={`btn ${styles.docstatus_button}`}>
              <span className={`${styles.docstatus_button_text}`}>
                Cancelled
              </span>
            </button>
          )}
          {
            //   showSaveButtonForAmendFlow &&
            stateForDocStatus && readOnlyFields === false && (
              <button
                type="button"
                className={`btn ${styles.docstatus_button}`}
              >
                <span className={`${styles.docstatus_button_text}`}>
                  Not saved
                </span>
              </button>
            )
          }
        </div>
        <div className={`${styles.button_field}`}>
          {DetailOfDeliveryNoteFromStore?.docStatus === 0 &&
            stateForDocStatus && (
              <button
                type="button"
                className={`${styles.create_button} px-2 py-0 me-2`}
                onClick={handleUpdateDeliveryNote}
              >
                Save
              </button>
            )}
          {DetailOfDeliveryNoteFromStore?.docStatus === 0 &&
            stateForDocStatus === false && (
              <button
                type="button"
                className={`${styles.create_button} px-2 py-0 me-2`}
                //   onClick={() => HandleUpdatedocStatus('1')}
              >
                Submit
              </button>
            )}
          {DetailOfDeliveryNoteFromStore?.docStatus === 1 &&
            stateForDocStatus === false && (
              <button
                type="button"
                className={`${styles.create_button} px-2 py-0 me-2`}
                //   onClick={() => HandleUpdatedocStatus('2')}
              >
                Cancel
              </button>
            )}
          {DetailOfDeliveryNoteFromStore?.posting_date ===
            new Date()?.toISOString()?.split('T')[0] && (
            <>
              {DetailOfDeliveryNoteFromStore?.docStatus === 2 &&
                stateForDocStatus === false && (
                  <button
                    type="button"
                    className={`${styles.create_button} px-2 py-0 me-2`}
                    //   onClick={HandleAmendButtonChanges}
                  >
                    Amend
                  </button>
                )}
            </>
          )}

          {showSaveButtonForAmendFlow &&
            stateForDocStatus &&
            readOnlyFields === false && (
              <button
                type="submit"
                // onClick={HandleAmendButtonForDuplicateChitti}
                className={`${styles.create_button} px-2 py-0 me-2 `}
              >
                Save
              </button>
            )}

          {DetailOfDeliveryNoteFromStore?.docStatus === 2 && (
            <button
              type="button"
              className={`${styles.create_button} px-2 py-0 me-2 `}
              //   onClick={() => HandleDeleteReceipt(query?.receiptId)}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default CustomerSalesButtonsSection;
