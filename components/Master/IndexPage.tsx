import useMasterHooks from '@/hooks/master/masterHooks';
import { useRouter } from 'next/router';
import React from 'react';
import MasterKarigar from './MasterKarigar/MasterKarigar';
import MasterMaterialMaster from './MasterMaterial/MasterMaterialMaster';
import useMaterialHook from '@/hooks/master/material-hook';
import { clientGroupDataset } from '../../datasets/clientGroup';
import { clientNameDataset } from '../../datasets/clientName';
import useClientHook from '@/hooks/master/client-hook';

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
  const { clientList, KunCsOtCategory, BBCategory }: any = useClientHook();
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
          inputValue={inputValue}
          HandleInputValue={HandleKunInputValue}
          HandleSubmit={HandleKunSubmit}
          error={error}
          setError={setError}
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
          HandleNameChange={HandleNameChange}
          HandleSave={HandleSave}
          nameValue={nameValue}
          error1={error1}
          error2={error2}
          placeholder1={'Client Name'}
          placeholder2={'Client Group'}
          tab1={'Client Name List'}
          tab2={'Create New Client Name'}
        />
      )}
      {key === 'kunCsOtCategory' && (
        <MasterMaterialMaster
          value={key}
          materialList={kunCsOtList}
          HandleNameChange={HandleNameChange}
          HandleSave={HandleSave}
          nameValue={nameValue}
          error1={error1}
          error2={error2}
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
          HandleNameChange={HandleNameChange}
          HandleSave={HandleSave}
          nameValue={nameValue}
          error1={error1}
          error2={error2}
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
