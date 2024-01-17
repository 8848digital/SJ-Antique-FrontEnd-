import { get_access_token } from '@/store/slices/auth/login-slice';
import { useSelector } from 'react-redux';
import React, { useEffect, useState, useRef } from 'react';

import { toast } from 'react-toastify';
import postMaterialMasterApi from '@/services/api/Master/post-material-name';
import materialApi from '@/services/api/PurchaseReceipt/get-material-list-api';
import postClientGroupApi from '@/services/api/Master/post-client-group-api';
import getClientGroupApi from '@/services/api/Master/get-client-group-api';

const useMaterialHook = () => {
  const loginAcessToken = useSelector(get_access_token);
  const [materialList, setMaterialList] = useState();
  const [error1, setError1] = useState('');
  const [error2, setError2] = useState('');
  const [nameValue, setNameValue] = useState({
    material: '',
    material_abbr: '',
  });
  const [inputValueM, setInputValueM] = useState('');
  const [errorM, setErrorM] = useState('');
  const [materialGroupList, setMaterialGroupList] = useState();
  const [selectedMaterialGroup, setSelectedMaterialGroup] = useState();
  useEffect(() => {
    const getStateData: any = async () => {
      const materialData = await materialApi(loginAcessToken.token);
      const materialGroupData = await getClientGroupApi(loginAcessToken.token);
      setMaterialList(materialData);
      console.log(materialGroupData.data.message.data, 'material group data');
      if (materialGroupData?.data?.message?.status === 'success') {
        setMaterialGroupList(materialGroupData?.data?.message?.data);
      }
      console.log(materialGroupList, 'material group data');
    };
    getStateData();
  }, []);
  const HandleNameChange = (e: any) => {
    console.log(nameValue, 'changing client');
    const { name, value } = e.target;
    setNameValue({ ...nameValue, [name]: value });
    setError1('');
    setError2('');
  };
  const HandleSave = async () => {
    console.log(nameValue, 'material saved');
    const values = {
      version: 'v1',
      method: 'create_material',
      entity: 'material_post_api',
      data: [nameValue],
    };
    console.log(values, 'valuesname');
    if (nameValue.material === '' || nameValue.material === undefined) {
      setError1('Input field cannot be empty');
      console.log(error1);
    } else if (
      nameValue.material_abbr === '' ||
      nameValue.material_abbr === undefined
    ) {
      setError2('Input field cannot be empty');
    } else {
      let apiRes: any = await postMaterialMasterApi(
        loginAcessToken?.token,
        values
      );
      console.log('apires', apiRes);
      if (apiRes?.status === 'success') {
        toast.success('Material Name Created');
        const materialData = await materialApi(loginAcessToken.token);
        setMaterialList(materialData);
      } else {
        toast.error('Material Name already exist');
      }
      setError1('');
      setNameValue({
        material: '',
        material_abbr: '',
      });
    }
  };
  // post material group
  const HandleMaterialGrpSubmit = async () => {
    const values = {
      version: 'v1',
      method: 'create_material_group',
      entity: 'material_post_api',
      client_group: inputValueM,
    };
    console.log(values, 'valuesname');
    if (inputValueM.trim() === '') {
      setErrorM('Input field cannot be empty');
    } else {
      let apiRes: any = await postClientGroupApi(
        loginAcessToken?.token,
        values
      );
      console.log('apires', apiRes);
      if (apiRes?.status === 'success' && apiRes?.hasOwnProperty('data')) {
        toast.success('Client Group Created');
        const clientGrpData: any = await getClientGroupApi(
          loginAcessToken.token
        );
        setMaterialGroupList(clientGrpData?.data?.message?.data);
      } else {
        toast.error('Client Group already exist');
      }
      setErrorM('');
      setInputValueM('');
    }
  };
  const HandleMaterialGrpValue = (e: any) => {
    setErrorM('');
    setInputValueM(e.target.value);
    console.log(inputValueM, 'input value');
  };

  return {
    materialList,
    error1,
    error2,
    nameValue,
    HandleNameChange,
    HandleSave,
    HandleMaterialGrpSubmit,
    HandleMaterialGrpValue,
    errorM,
    setErrorM,
    materialGroupList,
    inputValueM,
    selectedMaterialGroup,
    setSelectedMaterialGroup,
  };
};
export default useMaterialHook;
