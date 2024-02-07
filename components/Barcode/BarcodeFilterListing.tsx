import React from 'react';
import SearchSelectInputField from '../SearchSelectInputField/SearchSelectInputField';
import styles from '../../styles/barcode.module.css';

const BarcodeFilterListing: any = ({
  karigarList,
  searchKarigar,
  setSearchKarigar,
  selectDropDownReset,
  setSelectDropDownReset,
  handleSearchBarcodeItemCodeDetails,
  handleSearchBtn,
}: any) => {
  return (
    <div className='container'>
      <div className="row justify-content-center">
        <div className="col-lg-2 col-md-2 ps-4">
          <label className={` ${styles.label_font_size}`}>Date</label>
          <input
            type="date"
            className="form-control line-height bg-primary bg-opacity-10"
            onChange={(e: any) => handleSearchBarcodeItemCodeDetails(e, 'date')}
          />
        </div>
        <div className="col-lg-2 col-md-2">
          <label className={` ${styles.label_font_size}`}>Karigar</label>

          <SearchSelectInputField
            karigarData={karigarList}
            placeholder="Karigar"
            className={
              'form-control line-height text-center bg-primary bg-opacity-10'
            }
            style="max-width"
            selectedDropdownValue={searchKarigar}
            setSelectedDropdownValue={setSearchKarigar}
            selectDropDownReset={selectDropDownReset}
            setSelectDropDownReset={setSelectDropDownReset}
          />
        </div>
        <div className="col-lg-1 col-md-2 ">
          <label className={` ${styles.label_font_size}`}>Item Group</label>
          <input
            type="text"
            className="form-control line-height bg-primary bg-opacity-10 text-center"
            onChange={(e: any) =>
              handleSearchBarcodeItemCodeDetails(e, 'item_group')
            }
          />
        </div>
        <div className="col-lg-1 col-md-1">
          <label className={` ${styles.label_font_size}`}>Sr.No.From</label>
          <input
            type="text"
            className="form-control line-height bg-primary bg-opacity-10 text-center"
            onChange={(e: any) =>
              handleSearchBarcodeItemCodeDetails(e, 'sr_no_from')
            }
          />
        </div>
        <div className="col-lg-1 col-md-1">
          <label className={` ${styles.label_font_size}`}>Sr.No.To</label>

          <input
            type="text"
            className="form-control line-height bg-primary bg-opacity-10 text-center"
            onChange={(e: any) =>
              handleSearchBarcodeItemCodeDetails(e, 'sr_no_to')
            }
          />
        </div>
        <div className="col-lg-1 col-md-1">
          <label className={` ${styles.label_font_size}`}>Stock</label>

          <select
            className="form-select line-height bg-primary bg-opacity-10 px-0 text-center"
            aria-label="Default select example"
            onChange={(e: any) =>
              handleSearchBarcodeItemCodeDetails(e, 'stock')
            }
          >
            <option selected></option>
            <option value="yes">A</option>
            <option value="no">G</option>
          </select>
        </div>
        <div className="col-lg-2 col-md-2 ">
          <label className={` ${styles.label_font_size}`}>
            Barcode Created?
          </label>

          <select
            className="form-select line-height text-center bg-primary bg-opacity-10"
            aria-label="Default select example"
            onChange={(e: any) =>
              handleSearchBarcodeItemCodeDetails(e, 'barcode_created')
            }
          >
            <option selected></option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div className="col-lg-2 d-flex align-items-end justify-content-center">
          <button
            className="btn btn-primary px-5 py-1"
            onClick={handleSearchBtn}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default BarcodeFilterListing;
