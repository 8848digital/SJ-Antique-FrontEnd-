import { useRouter } from 'next/router';
import React from 'react';

const MaterialDetailsMaster = () => {
  const router = useRouter();
  // const pathContent = router.query;
  // console.log(pathContent, 'details pathcon');
  // const value1 = pathContent.name;
  // const value2 = pathContent.abbr;
  const { name1, name2, placeholder1, placeholder2 } = router.query;

  return (
    <div className="container mt-5">
      <div className="card mt-2">
        <div className="card-header">
          <div className="d-flex justify-content-between ">
            <button
              type="submit"
              onClick={() => router.back()}
              className=" btn btn-outline-primary mx-3 px-2 py-0 form-submit-button"
            >
              Back
            </button>
          </div>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-lg-6">
              <label htmlFor="basic-url " className="fs-6 mt-3 text-center">
                {placeholder1}
                <span className="text-danger">*</span>
              </label>
              <div className="input-group w-50 master-input-field my-3 mt-2">
                <input
                  type="text"
                  className="form-control py-1 ps-1"
                  defaultValue={name1}
                  required
                  readOnly
                />
              </div>
            </div>
            <div className="col-lg-6">
              <label htmlFor="basic-url " className="fs-6 mt-3 text-center">
                {placeholder2}
                <span className="text-danger">*</span>
              </label>
              <div className="input-group w-50 master-input-field my-3 mt-2">
                <input
                  type="text"
                  className="form-control py-1 ps-1"
                  defaultValue={name2}
                  required
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialDetailsMaster;
