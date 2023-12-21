import getBBCategoryApi from '@/services/api/Master/get-bbCategory-api';
import getClientApi from '@/services/api/Master/get-client-api';
import getClientGroupApi from '@/services/api/Master/get-client-group-api';
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
  const [clientGroupList, setClientGroup] = useState();
  const [KunCsOtCategory, setKunCsOtCategory] = useState();
  const [BBCategory, setBBCategory] = useState();
  // get api function
  useEffect(() => {
    const getStateData: any = async () => {
      const clientData: any = await getClientApi(loginAcessToken.token);
      const clientgrpData = await getClientGroupApi(loginAcessToken.token);
      const kunCsOtData = await getKunCsOtCategoryApi(loginAcessToken.token);
      const BBData = await getBBCategoryApi(loginAcessToken.token);
      console.log(clientData, 'KarigarData Master');
      setClientList(clientData);
      setClientGroup(clientgrpData);
      setKunCsOtCategory(kunCsOtData);
      setBBCategory(BBData);
    };
    getStateData();
  }, []);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  //post client Name
  const HandleClientSubmit = async () => {
    const values = {
      version: 'v1',
      method: 'create_karigar',
      entity: 'post_karigar_api',
      karigar_name: inputValue,
    };
    console.log(values, 'values');
    if (inputValue.trim() === '') {
      setError('Input field cannot be empty');
      console.log(error);
    } else {
      let apiRes: any = await postClientApi(loginAcessToken?.token, values);
      console.log('apires', apiRes);
      if (apiRes?.status === 'success' && apiRes?.hasOwnProperty('data')) {
        toast.success('Client Name Created');
        const clientApi: any = await getClientApi(loginAcessToken.token);
        setClientList(clientApi);
      } else {
        toast.error('Client Name already exist');
      }
      setError('');
      setInputValue('');
    }
  };
  const HandleClientInputValue = (e: any) => {
    setError('');
    setInputValue(e.target.value);
    console.log(inputValue, 'input value');
  };
  return {
    clientList,
    HandleClientSubmit,
    HandleClientInputValue,
  };
};
export default useClientHook;
