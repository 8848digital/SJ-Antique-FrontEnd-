import { useState } from 'react';
import MasterListing from '../MasterListing';
import AddRecord from './AddRecord';
import MasterMaterialListing from './MasterMultipleListing';
import TabSection from '@/components/TabSection';

const MultipleRecordMaster: any = ({
  value,
  materialList,
  HandleNameChange,
  HandleSave,
  nameValue,
  error1,
  error2,
  error3,
  placeholder1,
  placeholder2,
  placeholder3,
  tab1,
  tab2,
  searchClient,
  setSearchClient,
  clientGroup,
  selectDropDownReset,
  setSelectDropDownReset,
  showDeleteModal,
  handleCloseDeleteModal,
  handleShowDeleteModal,
  deleteRecord,
  showAddRecord,
  handleShowAddRecord,
  handleCloseAddRecord,
  handleUpdate,
  handleDelete,
}: any) => {
  const [inputName, setInputName] = useState('');
  const [inputMatGroup, setInputMatGrp] = useState('');
  const [inputGroup, setInputGroup] = useState('');
  const handleInputChange1 = (event: any) => {
    setInputName(event.target.value);
  };
  const handleInputChange2 = (event: any) => {
    setInputGroup(event.target.value);
  };
  const handleInputChange3 = (event: any) => {
    setInputMatGrp(event.target.value);
  };
  const filteredList: any =
    materialList?.length > 0 &&
    materialList !== null &&
    materialList?.filter((client: any) => {
      const materialMatch =
        !inputName ||
        client?.material?.toLowerCase().includes(inputName?.toLowerCase());
      const materialAbbrMatch =
        !inputGroup ||
        client?.material_abbr
          ?.toLowerCase()
          .includes(inputGroup?.toLowerCase()) ||
        (client?.type && client?.type.toString().includes(inputGroup)) ||
        false;
      const materialGroupMatch =
        !inputMatGroup ||
        client?.material_group
          ?.toLowerCase()
          .includes(inputMatGroup?.toLowerCase());

      return materialMatch && materialGroupMatch && materialAbbrMatch;
    });

  return (
    <div className="container-lg">
      <MasterListing value={value} />
      <div>
        <div className="d-flex justify-content-center">
          <TabSection firstTabHeading={tab1} secondTabHeading={tab2} />
        </div>
        <div
          className="tab-content d-flex justify-content-center"
          id="pills-tabContent"
        >
          <div
            className="tab-pane fade show active tab-width"
            id="pills-home"
            role="tabpanel"
            aria-labelledby="pills-home-tab"
          >
            <MasterMaterialListing
              materialList={filteredList}
              defaultData={materialList}
              handleInputChange1={handleInputChange1}
              handleInputChange2={handleInputChange2}
              handleInputChange3={handleInputChange3}
              placeholder1={placeholder1}
              placeholder2={placeholder2}
              placeholder3={placeholder3}
              value={value}
              showDeleteModal={showDeleteModal}
              handleCloseDeleteModal={handleCloseDeleteModal}
              handleShowDeleteModal={handleShowDeleteModal}
              deleteRecord={deleteRecord}
              showAddRecord={showAddRecord}
              handleShowAddRecord={handleShowAddRecord}
              handleCloseAddRecord={handleCloseAddRecord}
              clientGroup={clientGroup}
              selectDropDownReset={selectDropDownReset}
              setSelectDropDownReset={setSelectDropDownReset}
              searchClient={searchClient}
              setSearchClient={setSearchClient}
              nameValue={nameValue}
              handleUpdate={handleUpdate}
              HandleNameChange={HandleNameChange}
              error1={error1}
              error2={error2}
              error3={error3}
              handleDelete={handleDelete}
            />
          </div>
          <AddRecord
            nameValue={nameValue}
            HandleNameChange={HandleNameChange}
            HandleSave={HandleSave}
            error1={error1}
            error2={error2}
            error3={error3}
            placeholder1={placeholder1}
            placeholder2={placeholder2}
            placeholder3={placeholder3}
            searchClient={searchClient}
            setSearchClient={setSearchClient}
            value={value}
            clientGroup={clientGroup}
            selectDropDownReset={selectDropDownReset}
            setSelectDropDownReset={setSelectDropDownReset}
          />
        </div>
      </div>
    </div>
  );
};
export default MultipleRecordMaster;
