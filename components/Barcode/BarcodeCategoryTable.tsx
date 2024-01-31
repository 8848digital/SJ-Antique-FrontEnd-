import CustomerSalesTable2 from '../Sales/CustomerSale/CustomerSalesTable2';

const BarcodeCategorySection = ({ itemCodeDataToShow, handleGenerateBarcodeListBtn, handleCheckboxChange, checkedItems }: any) => {
  console.log("itemCodeDataToShow", itemCodeDataToShow)
  return (
    <div>
      <button type="button" className="btn btn-primary p-0 px-2 mb-2" onClick={handleGenerateBarcodeListBtn}>
        Generate Barcode List
      </button>
      <CustomerSalesTable2 />

      <div className='row'>
        {
          itemCodeDataToShow?.length > 0 && itemCodeDataToShow !== null && itemCodeDataToShow.map((data: any, index: any) => (
            <div className='col-lg-3' key={index}>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" checked={checkedItems.some((checkedItem: any) => checkedItem.id === data.idx)}
                  onChange={() => handleCheckboxChange(data.idx, data.name)} />
                <label className="form-check-label" htmlFor="flexCheckChecked">
                  {data?.name}
                </label>
              </div>
            </div>

          ))
        }
      </div>
    </div>
  );
};

export default BarcodeCategorySection;
