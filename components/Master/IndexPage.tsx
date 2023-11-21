import useMasterHooks from '@/hooks/master/masterHooks';
import { useRouter } from 'next/router';
import React from 'react'
import MasterKarigar from './MasterKarigar/MasterKarigar';
import MasterMaterialMaster from './MasterMaterial/MasterMaterialMaster';
import useMaterialHook from '@/hooks/master/material-hook';

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
      }:any = useMasterHooks();
      const {
        materialList,
        HandleNameChange,
        HandleSave,
        nameValue,
        error1,
        error2
        }:any= useMaterialHook()
      const router = useRouter()
      const pathcontent = router?.asPath?.split('/')
      console.log(pathcontent, 'pathcontent index')
      const key = pathcontent[pathcontent?.length - 1]
      return (
        <div >
        {key === 'karigar' &&(
          <MasterKarigar
          karigarData={karigarList}
          inputValue={inputValue}
          HandleInputValue={HandleInputValue}
          HandleSubmit={HandleSubmit}
          error={error}
          setError={setError}
          value={key}
          placeholder={'Karigar Name'}
        />
        )}
        {key === 'kundanKarigar' &&(
          <MasterKarigar
            karigarData={kunKarigarList}
            inputValue={inputValue}
            HandleInputValue={HandleKunInputValue}
            HandleSubmit={HandleKunSubmit}
            error={error}
            setError={setError}
            value={key}
            placeholder={'Kundan Karigar Name'}
          />
        )}
        {key === 'material' &&(
          <MasterMaterialMaster
          value={key}
          materialList={materialList}
          HandleNameChange={HandleNameChange}
          HandleSave={HandleSave}
          nameValue={nameValue}
          error1={error1}
          error2={error2}
          />
        )}
        </div>
      )
}

export default IndexPage