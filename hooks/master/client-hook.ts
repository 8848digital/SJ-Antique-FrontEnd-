import getBBCategoryApi from '@/services/api/Master/get-bbCategory-api';
import getClientApi from '@/services/api/Master/get-client-api';
import getKunCsOtCategoryApi from '@/services/api/Master/get-kunCsOtCategory-api';
import postClientApi from '@/services/api/Master/post-client-api';
import { get_access_token } from '@/store/slices/auth/login-slice';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const useClientHook = () => {
  // access token
  const loginAcessToken = useSelector(get_access_token);
  // api states
  const [clientList, setClientList] = useState();
  const [KunCsOtCategory, setKunCsOtCategory] = useState();
  const [BBCategory, setBBCategory] = useState();
  // get api function
  useEffect(() => {
    const getStateData: any = async () => {
      const clientData: any = await getClientApi(loginAcessToken.token);
      const kunCsOtData = await getKunCsOtCategoryApi(loginAcessToken.token);
      const BBData = await getBBCategoryApi(loginAcessToken.token);
      console.log(kunCsOtData, 'kuncsotdata');
      setClientList(clientData);
      if (kunCsOtData?.data?.message?.status === 'success') {
        setKunCsOtCategory(kunCsOtData?.data?.message?.data);
      }
      if (BBData?.data?.message?.status === 'success') {
        setBBCategory(BBData?.data?.message?.data);
      }
    };
    getStateData();
  }, []);
  const [error1, setError1] = useState('');
  const [error2, setError2] = useState('');
  const [clientName, setClientNameValue] = useState({
    material: '',
    material_abbr: '',
  });
  // client post api
  const HandleClientNameChange = (e: any) => {
    const { name, value } = e.target;
    setClientNameValue({ ...clientName, [name]: value });
    setError1('');
    setError2('');
  };
  console.log(clientName, 'clientName');
  const HandleClientSave = async () => {
    console.log(clientName, 'material saved');
    const values = {
      version: 'v1',
      method: 'create_material',
      entity: 'material_post_api',
      data: [clientName],
    };
    console.log(values, 'valuesname');
    if (clientName.material === '' || clientName.material === undefined) {
      setError1('Input field cannot be empty');
      console.log(error1);
    } else if (
      clientName.material_abbr === '' ||
      clientName.material_abbr === undefined
    ) {
      setError2('Input field cannot be empty');
    } else {
      let apiRes: any = await postClientApi(loginAcessToken?.token, values);
      console.log('apires', apiRes);
      if (apiRes?.status === 'success') {
        toast.success('Material Name Created');
        const materialData = await getClientApi(loginAcessToken.token);
        setClientList(materialData);
      } else {
        toast.error('Material Name already exist');
      }
      setError1('');
      setClientNameValue({
        material: '',
        material_abbr: '',
      });
    }
  };
  return {
    clientList,
    HandleClientNameChange,
    HandleClientSave,
    KunCsOtCategory,
    BBCategory,
  };
};
export default useClientHook;
