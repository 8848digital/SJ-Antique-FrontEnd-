import useMasterHook from '@/hooks/master/master-hook';
import { useRouter } from 'next/router';
import MultipleRecordMaster from '../MasterMultipleListing/MasterMaterialMaster';
import MasterSingleRecord from '../MasterSingleListing/MasterSingleRecord';

const MasterIndexPage = () => {
  const {
    clientList,
    HandleClientNameChange,
    HandleClientSave,
    KunCsOtCategory,
    BBCategory,
    clientName,
    HandleKunCsOtChange,
    HandleKunCsOtSave,
    HandleBBChange,
    HandleBBSave,
    setSearchClient,
    searchClient,
    errorC1,
    errorC2,
    errorC3,
    errorC,
    setErrorC,
    HandleClientGrpSubmit,
    HandleClientGrpValue,
    inputValue1,
    setInputValue1,
    clientGroupList,
    selectDropDownReset,
    setSelectDropDownReset,
    category,
    handleSelectCategory,
    HandleCategorySubmit,
    HandleCategoryValue,
    subCategory,
    HandleSubCategoryChange,
    HandleSubCategorySave,
    setSearchCategory,
    searchCategory,
    showDeleteModal,
    setShowDeleteModal,
    handleCloseDeleteModal,
    handleShowDeleteModal,
    deleteRecord,
    showAddRecord,
    handleShowAddRecord,
    handleCloseAddRecord,
    handleUpdateCategory,
    handleUpdateSubCategory,
    handleUpdateClient,
    handleUpdateClientGroup,
    handleUpdateBBCategory,
    handleUpdateKunCsOtCategory,
    handleDeleteCategory,
    handleDeleteSubCategory,
    handleDeleteClient,
    handleDeleteClientGroup,
    handleDeleteBBCategory,
    handleDeleteKunCSOtCategory,
  }: any = useMasterHook();
  const router = useRouter();
  const pathcontent = router?.asPath?.split('/');

  const key = pathcontent[pathcontent?.length - 1];
  let clientGroup: any =
    clientGroupList?.length > 0 &&
    clientGroupList !== null &&
    clientGroupList.map((data: any) => ({
      karigar_name: data.client_group,
      delete: data.delete,
    }));

  let categoryName: any =
    category?.length > 0 &&
    category.map((data: any) => ({
      karigar_name: data?.category,
      delete: data?.delete,
    }));
  return (
    <div>
      {key === 'clientGroup' && (
        <MasterSingleRecord
          karigarData={clientGroup}
          inputValue={inputValue1}
          HandleInputValue={HandleClientGrpValue}
          HandleSubmit={HandleClientGrpSubmit}
          error={errorC}
          setError={setErrorC}
          value={key}
          placeholder={'Client Group'}
          tab1={'Client Group List'}
          tab2={'Create New Client Group'}
          showDeleteModal={showDeleteModal}
          handleCloseDeleteModal={handleCloseDeleteModal}
          handleShowDeleteModal={handleShowDeleteModal}
          deleteRecord={deleteRecord}
          showAddRecord={showAddRecord}
          handleShowAddRecord={handleShowAddRecord}
          handleCloseAddRecord={handleCloseAddRecord}
          setInputValue={setInputValue1}
          handleUpdate={handleUpdateClientGroup}
          handleDelete={handleDeleteClientGroup}
        />
      )}
      {key === 'client' && (
        <MultipleRecordMaster
          value={key}
          materialList={
            clientList?.length > 0 &&
            clientList !== null &&
            clientList.map((data: any) => ({
              material: data.client_name,
              material_abbr: data.client_group,
              delete: data.delete,
            }))
          }
          clientGroup={clientGroup}
          HandleNameChange={HandleClientNameChange}
          HandleSave={HandleClientSave}
          nameValue={clientName}
          error1={errorC1}
          error2={errorC2}
          placeholder1={'Client'}
          placeholder2={'Client Group'}
          tab1={'Client Name List'}
          tab2={'Create New Client'}
          setSearchClient={setSearchClient}
          searchClient={searchClient}
          selectDropDownReset={selectDropDownReset}
          setSelectDropDownReset={setSelectDropDownReset}
          showDeleteModal={showDeleteModal}
          handleCloseDeleteModal={handleCloseDeleteModal}
          handleShowDeleteModal={handleShowDeleteModal}
          deleteRecord={deleteRecord}
          showAddRecord={showAddRecord}
          handleShowAddRecord={handleShowAddRecord}
          handleCloseAddRecord={handleCloseAddRecord}
          handleUpdate={handleUpdateClient}
          handleDelete={handleDeleteClient}
        />
      )}
      {key === 'kunCsOtCategory' && (
        <MultipleRecordMaster
          value={key}
          materialList={
            KunCsOtCategory?.length > 0 &&
            KunCsOtCategory !== null &&
            KunCsOtCategory.map((data: any) => ({
              material: data.name1,
              material_abbr: data.type,
              delete: data.delete,
            }))
          }
          HandleNameChange={HandleKunCsOtChange}
          HandleSave={HandleKunCsOtSave}
          nameValue={clientName}
          error1={errorC1}
          error2={errorC2}
          placeholder1={'Category'}
          placeholder2={'Type'}
          tab1={'Category'}
          tab2={'Create New Category'}
          showDeleteModal={showDeleteModal}
          handleCloseDeleteModal={handleCloseDeleteModal}
          handleShowDeleteModal={handleShowDeleteModal}
          deleteRecord={deleteRecord}
          showAddRecord={showAddRecord}
          handleShowAddRecord={handleShowAddRecord}
          handleCloseAddRecord={handleCloseAddRecord}
          handleUpdate={handleUpdateKunCsOtCategory}
          handleDelete={handleDeleteKunCSOtCategory}
        />
      )}
      {key === 'BBCategory' && (
        <MultipleRecordMaster
          value={key}
          materialList={
            BBCategory?.length > 0 &&
            BBCategory !== null &&
            BBCategory.map((data: any) => ({
              material: data.name1,
              material_abbr: data.type,
              delete: data.delete,
            }))
          }
          HandleNameChange={HandleBBChange}
          HandleSave={HandleBBSave}
          nameValue={clientName}
          error1={errorC1}
          error2={errorC2}
          placeholder1={'Category'}
          placeholder2={'Type'}
          tab1={'Category'}
          tab2={'Create New BB Category'}
          showDeleteModal={showDeleteModal}
          handleCloseDeleteModal={handleCloseDeleteModal}
          handleShowDeleteModal={handleShowDeleteModal}
          deleteRecord={deleteRecord}
          showAddRecord={showAddRecord}
          handleShowAddRecord={handleShowAddRecord}
          handleCloseAddRecord={handleCloseAddRecord}
          handleUpdate={handleUpdateBBCategory}
          handleDelete={handleDeleteBBCategory}
        />
      )}
      {key === 'category' && (
        <MasterSingleRecord
          karigarData={categoryName}
          inputValue={inputValue1}
          HandleInputValue={HandleCategoryValue}
          HandleSubmit={HandleCategorySubmit}
          error={errorC}
          setError={setErrorC}
          value={key}
          placeholder={'Category'}
          tab1={'Category List'}
          tab2={'Create New Category'}
          showDeleteModal={showDeleteModal}
          handleCloseDeleteModal={handleCloseDeleteModal}
          handleShowDeleteModal={handleShowDeleteModal}
          deleteRecord={deleteRecord}
          showAddRecord={showAddRecord}
          handleShowAddRecord={handleShowAddRecord}
          handleCloseAddRecord={handleCloseAddRecord}
          handleUpdate={handleUpdateCategory}
          handleDelete={handleDeleteCategory}
        />
      )}
      {key === 'subCategory' && (
        <MultipleRecordMaster
          value={key}
          materialList={
            subCategory?.length > 0 &&
            subCategory !== null &&
            subCategory.map((data: any) => ({
              material: data.code,
              material_abbr: data.sub_category,
              material_group: data.category,
              delete: data.delete,
            }))
          }
          clientGroup={categoryName}
          HandleNameChange={HandleSubCategoryChange}
          HandleSave={HandleSubCategorySave}
          nameValue={clientName}
          error1={errorC1}
          error2={errorC2}
          error3={errorC3}
          placeholder1={'Code'}
          placeholder2={'Sub Category'}
          placeholder3={'Category'}
          tab1={'Sub Category'}
          tab2={'Create New Sub Category'}
          setSearchClient={setSearchCategory}
          searchClient={searchCategory}
          selectDropDownReset={selectDropDownReset}
          setSelectDropDownReset={setSelectDropDownReset}
          showDeleteModal={showDeleteModal}
          handleCloseDeleteModal={handleCloseDeleteModal}
          handleShowDeleteModal={handleShowDeleteModal}
          deleteRecord={deleteRecord}
          showAddRecord={showAddRecord}
          handleShowAddRecord={handleShowAddRecord}
          handleCloseAddRecord={handleCloseAddRecord}
          handleUpdate={handleUpdateSubCategory}
          handleDelete={handleDeleteSubCategory}
        />
      )}
    </div>
  );
};

export default MasterIndexPage;
