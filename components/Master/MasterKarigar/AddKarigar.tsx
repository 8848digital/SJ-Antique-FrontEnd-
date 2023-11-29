import React from 'react';

const AddKarigar = ({
  inputValue,
  HandleInputValue,
  error,
  HandleSubmit,
}: any) => {
  return (
    <div
      className="tab-pane fade"
      id="pills-profile"
      role="tabpanel"
      aria-labelledby="pills-home-tab"
    >
      <div className="container">
        <div className=" m-1">
          <label>Karigar Name</label>
          <span className="text-danger">*</span>
        </div>
        <div className="p-1">
          <input
            type="text"
            className="form-control w-50 border p-1"
            value={inputValue}
            onChange={(e) => {
              HandleInputValue(e);
            }}
            required
          />
        </div>
        <div>{error && <p className="text-danger">{error}</p>}</div>
        <div className="d-flex justify-content-start">
          <button
            type="submit"
            className=" btn btn-outline-primary py-1 mt-2 form-submit-button"
            onClick={HandleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddKarigar;
