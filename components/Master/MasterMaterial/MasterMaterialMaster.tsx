import React, { useState } from 'react';
import MasterMaterialListing from './MasterMaterialListing';
import useMaterialHook from '@/hooks/master/material-hook';
import AddMaterial from './AddMaterial';
import MasterListing from '../MasterListing';
const MasterMaterialMaster: any = ({ value }: any) => {
  const {
    materialList,
    HandleNameChange,
    HandleSave,
    nameValue,
    error1,
    error2,
  }: any = useMaterialHook();
  const [inputName, setInputName] = useState('');
  const [inputGroup, setInputGroup] = useState('');
  const handleInputChange1 = (event: any) => {
    setInputName(event.target.value);
  };
  const handleInputChange2 = (event: any) => {
    setInputGroup(event.target.value);
  };
  const filteredList: any =
    materialList?.length > 0 &&
    materialList !== null &&
    materialList.filter(
      (client: any) =>
        client.material.toLowerCase().includes(inputName.toLowerCase()) &&
        client.material_abbr.toLowerCase().includes(inputGroup.toLowerCase())
    );
  return (
    <div className="container-lg">
      <MasterListing value={value} />
      <div>
        <div
          className="nav nav-pills mb-2 justify-content-center "
          id="pills-tab"
          role="tablist"
        >
          <div className="nav-tabs tabs-container w-50 " role="presentation">
            <button
              className="nav-link active w-100 p-1 border"
              id="pills-home-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-home"
              type="button"
              role="tab"
              aria-controls="pills-home"
              aria-selected="true"
            >
              Material List
            </button>
          </div>
          <div className="nav-tabs tabs-container w-50" role="presentation">
            <button
              className="nav-link  w-100 p-1 border"
              id="pills-profile-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-profile"
              type="button"
              role="tab"
              aria-controls="pills-profile"
              aria-selected="false"
            >
              Create New Material
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
            <MasterMaterialListing
              materialList={filteredList}
              handleInputChange1={handleInputChange1}
              handleInputChange2={handleInputChange2}
            />
          </div>
          <AddMaterial
            nameValue={nameValue}
            HandleNameChange={HandleNameChange}
            HandleSave={HandleSave}
            error1={error1}
            error2={error2}
          />
        </div>
      </div>
    </div>
  );
};
export default MasterMaterialMaster;
