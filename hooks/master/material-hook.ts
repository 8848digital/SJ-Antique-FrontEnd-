import { get_access_token } from '@/store/slices/auth/login-slice';
import { useSelector } from 'react-redux';
import React, { useEffect, useState, useRef } from 'react';
import materialApi from '@/services/api/get-material-list-api';
import { toast } from 'react-toastify';
import postMaterialMasterApi from '@/services/api/Master/post-material-name';

const useMaterialHook = () => {
  const loginAcessToken = useSelector(get_access_token);
  const [materialList, setMaterialList] = useState();
  const [error1, setError1] = useState('');
  const [error2, setError2] = useState('');
  const [nameValue, setNameValue] = useState({
    material: '',
    material_abbr: '',
  });
  useEffect(() => {
    const getStateData: any = async () => {
      const materialData = await materialApi(loginAcessToken.token);
      setMaterialList(materialData);
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
  return {
    materialList,
    error1,
    error2,
    nameValue,
    HandleNameChange,
    HandleSave,
  };
};
export default useMaterialHook;
