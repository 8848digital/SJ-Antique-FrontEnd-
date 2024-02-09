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
    <div className="tab-width row justify-content-center ">
      <div className="col-md-2 p-1 ">
        <label className={` ${styles.label_font_size}`}>Date</label>
        <input
          type="date"
          className="form-control line-height p-1 "
          onChange={(e: any) => handleSearchBarcodeItemCodeDetails(e, 'date')}
        />
      </div>
      <div className="col-lg-2 col-md-2 p-1">
        <label className={` ${styles.label_font_size}`}>Karigar</label>

        <SearchSelectInputField
          karigarData={karigarList}
          placeholder="Karigar"
          className={'form-control line-height text-center  p-1  '}
          style="max-width"
          selectedDropdownValue={searchKarigar}
          setSelectedDropdownValue={setSearchKarigar}
          selectDropDownReset={selectDropDownReset}
          setSelectDropDownReset={setSelectDropDownReset}
        />
      </div>
      <div className="col-lg-1 col-md-2 p-1 ">
        <label className={` ${styles.label_font_size}`}>ItemGroup</label>
        <input
          type="text"
          className="form-control line-height p-1 text-center"
          onChange={(e: any) =>
            handleSearchBarcodeItemCodeDetails(e, 'item_group')
          }
        />
      </div>
      <div className="col-lg-1 col-md-1 p-1">
        <label className={` ${styles.label_font_size}`}>Sr.No.From</label>
        <input
          type="text"
          className="form-control line-height p-1 text-center"
          onChange={(e: any) =>
            handleSearchBarcodeItemCodeDetails(e, 'sr_no_from')
          }
        />
      </div>
      <div className="col-lg-1 col-md-1 p-1">
        <label className={` ${styles.label_font_size}`}>Sr.No.To</label>

        <input
          type="text"
          className="form-control line-height p-1 text-center"
          onChange={(e: any) =>
            handleSearchBarcodeItemCodeDetails(e, 'sr_no_to')
          }
        />
      </div>
      <div className="col-lg-1 col-md-1 p-1">
        <label className={` ${styles.label_font_size}`}>Stock</label>

        <select
          className="form-select line-height p-1 px-0 text-start"
          aria-label="Default select example"
          onChange={(e: any) => handleSearchBarcodeItemCodeDetails(e, 'stock')}
        >
          <option selected></option>
          <option value="yes">A</option>
          <option value="no">G</option>
        </select>
      </div>
      <div className="col-lg-2 col-md-2 p-1">
        <label className={` ${styles.label_font_size}`}>Barcode Created?</label>

        <select
          className="form-select line-height text-center p-1 "
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
      <div className="col-lg-2  my-2 my-auto text-center">
        <button className="btn btn-primary m-1 py-2" onClick={handleSearchBtn}>
          <i className="fa-solid fa-magnifying-glass pr-1"></i>
          Search
        </button>
      </div>
    </div>
  );
};

export default BarcodeFilterListing;
