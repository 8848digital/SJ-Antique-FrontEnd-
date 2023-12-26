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
  }: any = useClientHook();
  console.log(clientList, 'indexPage client list');
  const router = useRouter();
  const pathcontent = router?.asPath?.split('/');
  console.log(pathcontent, 'pathcontent index');
  const key = pathcontent[pathcontent?.length - 1];
  let clientGroup: any =
    clientList?.length > 0 &&
    clientList !== null &&
    clientList.map((data: any) => ({
      karigar_name: data.client_group,
    }));
  console.log(clientGroup, 'client grp in index');
  let clientNameList: any =
    clientList?.length > 0 &&
    clientList !== null &&
    clientList.map((data: any) => ({
      material: data.client_name,
      material_abbr: data.client_group,
    }));
  let kunCsOtList: any =
    KunCsOtCategory?.length > 0 &&
    KunCsOtCategory !== null &&
    KunCsOtCategory.map((data: any) => ({
      material: data.name1,
      type: data.type,
    }));
  let BBList: any =
    BBCategory?.length > 0 &&
    BBCategory !== null &&
    BBCategory.map((data: any) => ({
      material: data.name1,
      type: data.type,
    }));
  console.log(kunCsOtList, 'kuncsotdata');
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
      {key === 'material' && (
        <MasterMaterialMaster
          value={key}
          materialList={materialList}
          HandleNameChange={HandleNameChange}
          HandleSave={HandleSave}
          nameValue={nameValue}
          error1={error1}
          error2={error2}
          tab1={'Material List'}
          tab2={'Create New Material'}
          placeholder1={'Material name'}
          placeholder2={'Material Abbr'}
        />
      )}
      {key === 'client' && (
        <MasterMaterialMaster
          value={key}
          materialList={clientNameList}
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
          key1={'clientName'}
        />
      )}
      {key === 'kunCsOtCategory' && (
        <MasterMaterialMaster
          value={key}
          materialList={kunCsOtList}
          HandleNameChange={HandleKunCsOtChange}
          HandleSave={HandleKunCsOtSave}
          nameValue={clientName}
          error1={errorC1}
          error2={errorC2}
          placeholder1={'Category Name'}
          placeholder2={'Type'}
          tab1={'Category Name'}
          tab2={'Create New Name'}
        />
      )}
      {key === 'BBCategory' && (
        <MasterMaterialMaster
          value={key}
          materialList={BBList}
          HandleNameChange={HandleBBChange}
          HandleSave={HandleBBSave}
          nameValue={clientName}
          error1={errorC1}
          error2={errorC2}
          placeholder1={'Category Name'}
          placeholder2={'Type'}
          tab1={'Category Name'}
          tab2={'Create New Name'}
        />
      )}
    </div>
  );
};

export default IndexPage;
