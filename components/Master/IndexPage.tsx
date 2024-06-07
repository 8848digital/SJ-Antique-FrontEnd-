import useClientHook from '@/hooks/master/client-hook';
import useMasterHooks from '@/hooks/master/masterHooks';
import useMaterialHook from '@/hooks/master/material-hook';
import { useRouter } from 'next/router';
import MasterKarigar from './MasterKarigar/MasterKarigar';
import MasterMaterialMaster from './MasterMaterial/MasterMaterialMaster';

const IndexPage = () => {
  const {
    karigarList,
    kunKarigarList,
    inputValue,
    HandleInputValue,
    HandleSubmit,
    HandleKunInputValue,
    HandleKunSubmit,
    error,
    setError,
  }: any = useMasterHooks();
  const {
    materialList,
    HandleNameChange,
    HandleSave,
    nameValue,
    error1,
    error2,
    error3,
    HandleMaterialGrpSubmit,
    HandleMaterialGrpValue,
    errorM,
    setErrorM,
    materialGroupList,
    inputValueM,
    selectedMaterialGroup,
    setSelectedMaterialGroup,
    matDropdownReset,
    setMatDropDownReset,
  }: any = useMaterialHook();
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
    errorC,
    setErrorC,
    HandleClientGrpSubmit,
    HandleClientGrpValue,
    inputValue1,
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
  }: any = useClientHook();

  const router = useRouter();
  const pathcontent = router?.asPath?.split('/');

  const key = pathcontent[pathcontent?.length - 1];
  let clientGroup: any =
    clientGroupList?.length > 0 &&
    clientGroupList !== null &&
    clientGroupList.map((data: any) => ({
      karigar_name: data.client_group,
    }));
  let materialGroup: any =
    materialGroupList?.length > 0 &&
    materialGroupList !== null &&
    materialGroupList.map((data: any) => ({
      karigar_name: data.material_group,
    }));
  let categoryName: any =
    category?.length > 0 &&
    category.map((data: any) => ({
      karigar_name: data,
    }));

  return (
    <div>
      {key === 'karigar' && (
        <MasterKarigar
          karigarData={karigarList}
          inputValue={inputValue}
          HandleInputValue={HandleInputValue}
          HandleSubmit={HandleSubmit}
          error={error}
          setError={setError}
          value={key}
          placeholder={'Karigar Name'}
          tab1={'Karigar List'}
          tab2={'Create New Karigar'}
        />
      )}
      {key === 'kundanKarigar' && (
        <MasterKarigar
          karigarData={kunKarigarList}
          inputValue={inputValue}
          HandleInputValue={HandleKunInputValue}
          HandleSubmit={HandleKunSubmit}
          error={error}
          setError={setError}
          value={key}
          placeholder={'Kundan Karigar Name'}
          tab1={'Kundan Karigar List'}
          tab2={'Create New Kundan Karigar'}
        />
      )}
      {key === 'clientGroup' && (
        <MasterKarigar
          karigarData={clientGroup}
          inputValue={inputValue1}
          HandleInputValue={HandleClientGrpValue}
          HandleSubmit={HandleClientGrpSubmit}
          error={errorC}
          setError={setErrorC}
          value={key}
          placeholder={'Client Group Name'}
          tab1={'Client Group List'}
          tab2={'Create New Client Group'}
        />
      )}
      {key === 'materialGroup' && (
        <MasterKarigar
          karigarData={materialGroup}
          inputValue={inputValueM}
          HandleInputValue={HandleMaterialGrpValue}
          HandleSubmit={HandleMaterialGrpSubmit}
          error={errorM}
          setError={setErrorM}
          value={key}
          placeholder={'Material Group Name'}
          tab1={'Material Group List'}
          tab2={'Create New Material Group'}
        />
      )}
      {key === 'material' && (
        <MasterMaterialMaster
          value={key}
          materialList={materialList}
          HandleNameChange={HandleNameChange}
          HandleSave={HandleSave}
          nameValue={nameValue}
          error1={error1}
          error2={error2}
          error3={error3}
          tab1={'Material List'}
          tab2={'Create New Material'}
          placeholder1={'Material Name'}
          placeholder2={'Material Abbr'}
          placeholder3={'Material Group'}
          clientGroup={materialGroup}
          setSearchClient={setSelectedMaterialGroup}
          searchClient={selectedMaterialGroup}
          selectDropDownReset={matDropdownReset}
          setSelectDropDownReset={setMatDropDownReset}
        />
      )}
      {key === 'client' && (
        <MasterMaterialMaster
          value={key}
          materialList={
            clientList?.length > 0 &&
            clientList !== null &&
            clientList.map((data: any) => ({
              material: data.client_name,
              material_abbr: data.client_group,
            }))
          }
          clientGroup={clientGroup}
          HandleNameChange={HandleClientNameChange}
          HandleSave={HandleClientSave}
          nameValue={clientName}
          error1={error1}
          error2={error2}
          placeholder1={'Client Name'}
          placeholder2={'Client Group'}
          tab1={'Client Name List'}
          tab2={'Create New Client Name'}
          setSearchClient={setSearchClient}
          searchClient={searchClient}
          selectDropDownReset={selectDropDownReset}
          setSelectDropDownReset={setSelectDropDownReset}
        />
      )}
      {key === 'kunCsOtCategory' && (
        <MasterMaterialMaster
          value={key}
          materialList={
            KunCsOtCategory?.length > 0 &&
            KunCsOtCategory !== null &&
            KunCsOtCategory.map((data: any) => ({
              material: data.name1,
              type: data.type,
            }))
          }
          HandleNameChange={HandleKunCsOtChange}
          HandleSave={HandleKunCsOtSave}
          nameValue={clientName}
          error1={errorC1}
          error2={errorC2}
          placeholder1={'Category Name'}
          placeholder2={'Type'}
          tab1={'Category Name'}
          tab2={'Create New Category'}
        />
      )}
      {key === 'BBCategory' && (
        <MasterMaterialMaster
          value={key}
          materialList={
            BBCategory?.length > 0 &&
            BBCategory !== null &&
            BBCategory.map((data: any) => ({
              material: data.name1,
              type: data.type,
            }))
          }
          HandleNameChange={HandleBBChange}
          HandleSave={HandleBBSave}
          nameValue={clientName}
          error1={errorC1}
          error2={errorC2}
          placeholder1={'Category Name'}
          placeholder2={'Type'}
          tab1={'Category Name'}
          tab2={'Create New BB Category'}
        />
      )}
      {key === 'category' && (
        <MasterKarigar
          karigarData={categoryName}
          inputValue={inputValue1}
          HandleInputValue={HandleCategoryValue}
          HandleSubmit={HandleCategorySubmit}
          error={errorC}
          setError={setErrorC}
          value={key}
          placeholder={'Category Name'}
          tab1={'Category List'}
          tab2={'Create New Category'}
        />
      )}
      {key === 'subCategory' && (
        <MasterMaterialMaster
          value={key}
          materialList={
            subCategory?.length > 0 &&
            subCategory !== null &&
            subCategory.map((data: any) => ({
              material: data.subcategory,
              material_abbr: data.category,
            }))
          }
          clientGroup={categoryName}
          HandleNameChange={HandleSubCategoryChange}
          HandleSave={HandleSubCategorySave}
          nameValue={clientName}
          error1={error1}
          error2={error2}
          placeholder1={'Sub-category Name'}
          placeholder2={'Category Name'}
          tab1={'Sub-Category name'}
          tab2={'Create New Sub-Category'}
          setSearchClient={setSearchCategory}
          searchClient={searchCategory}
          selectDropDownReset={selectDropDownReset}
          setSelectDropDownReset={setSelectDropDownReset}
        />
      )}
    </div>
  );
};

export default IndexPage;
