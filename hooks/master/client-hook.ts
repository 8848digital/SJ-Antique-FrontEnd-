import getBBCategoryApi from '@/services/api/Master/get-bbCategory-api';
import getClientApi from '@/services/api/Master/get-client-api';
import getClientGroupApi from '@/services/api/Master/get-client-group-api';
import getKunCsOtCategoryApi from '@/services/api/Master/get-kunCsOtCategory-api';
import postBBCategoryApi from '@/services/api/Master/post-bbCategory-api';
import postClientApi from '@/services/api/Master/post-client-api';
import postClientGroupApi from '@/services/api/Master/post-client-group-api';
import postKunCsOtCategoryApi from '@/services/api/Master/post-kunCsOtCategory-api';
import { get_access_token } from '@/store/slices/auth/login-slice';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const useClientHook = () => {
  // access token
  const loginAcessToken = useSelector(get_access_token);
  // api states
  const [clientList, setClientList] = useState();
  const [clientGroupList, setClientGroupList] = useState();
  const [KunCsOtCategory, setKunCsOtCategory] = useState();
  const [BBCategory, setBBCategory] = useState();
  const [searchClient, setSearchClient] = useState('');
  const [inputValue1, setInputValue1] = useState('');
  const [errorC, setErrorC] = useState('');

  console.log(searchClient, 'search client in dropdown');
  // get api function
  useEffect(() => {
    const getStateData: any = async () => {
      const clientData: any = await getClientApi(loginAcessToken.token);
      const clientGroupData: any = await getClientGroupApi(
        loginAcessToken.token
      );
      const kunCsOtData = await getKunCsOtCategoryApi(loginAcessToken.token);
      const BBData = await getBBCategoryApi(loginAcessToken.token);
      console.log(clientGroupData, 'client Group data');
      setClientList(clientData);
      setClientGroupList(clientGroupData);
      if (kunCsOtData?.data?.message?.status === 'success') {
        setKunCsOtCategory(kunCsOtData?.data?.message?.data);
      }
      if (BBData?.data?.message?.status === 'success') {
        setBBCategory(BBData?.data?.message?.data);
      }
    };
    getStateData();
  }, []);
  const [errorC1, setError1] = useState('');
  const [errorC2, setError2] = useState('');
  const [clientName, setClientNameValue] = useState({
    material: '',
    material_abbr: '',
  });
  // client post api
  const HandleClientNameChange = (e: any) => {
    const { name, value } = e.target;
    setClientNameValue({
      ...clientName,
      [name]: value,
      material_abbr: searchClient,
    });
    setError1('');
    setError2('');
  };
  const HandleClientSave = async () => {
    console.log(clientName, 'client name saved');
    const values = {
      version: 'v1',
      method: 'client_create',
      entity: 'client_api',
      client_name: clientName?.material,
      client_group: searchClient,
    };
    console.log(values, 'valuesname');
    if (clientName?.material === '' || clientName.material === undefined) {
      setError1('Input field cannot be empty');
      console.log(errorC1);
    } else if (
      clientName.material_abbr === '' ||
      clientName.material_abbr === undefined
    ) {
      setError2('Input field cannot be empty');
    } else {
      let apiRes: any = await postClientApi(loginAcessToken?.token, values);
      console.log('apires', apiRes);
      if (apiRes?.status === 'success') {
        toast.success('Client Name Created');
        const clientData = await getClientApi(loginAcessToken.token);
        setClientList(clientData);
      } else {
        toast.error('Client Name already exist');
      }
      setError1('');
      setClientNameValue({
        material: '',
        material_abbr: '',
      });
    }
  };
  // KunCsOt category post api
  const HandleKunCsOtChange = (e: any) => {
    console.log(clientName, 'changing client');
    const { name, value } = e.target;
    setClientNameValue({ ...clientName, [name]: value });
    setError1('');
    setError2('');
  };
  console.log(clientName, 'clientName');
  const HandleKunCsOtSave = async () => {
    console.log(clientName, 'Kun Cat saved');
    const values = {
      version: 'v1',
      method: 'create_kun_category',
      entity: 'kun_cs_ot_category_api',
      name1: clientName?.material,
      type: clientName?.material_abbr,
    };
    console.log(values, 'valuesname');
    if (clientName?.material === '' || clientName.material === undefined) {
      console.log('in condition 1');
      setError1('Input field cannot be empty');
    } else if (
      clientName.material_abbr === '' ||
      clientName.material_abbr === undefined
    ) {
      console.log('in condition 2');
      setError2('Input field cannot be empty');
    } else {
      console.log('in condition 3');
      let apiRes: any = await postKunCsOtCategoryApi(
        loginAcessToken?.token,
        values
      );
      console.log('apires', apiRes);
      if (apiRes?.status === 'success') {
        toast.success('Kun-Cs-Ot Category Created');
        const KunData = await getKunCsOtCategoryApi(loginAcessToken.token);
        setKunCsOtCategory(KunData);
      } else {
        toast.error('Kun-Cs-Ot Category already exist');
      }
      setError1('');
      setClientNameValue({
        material: '',
        material_abbr: '',
      });
    }
  };
  // post bb category api
  const HandleBBChange = (e: any) => {
    console.log(clientName, 'changing client');
    const { name, value } = e.target;
    setClientNameValue({ ...clientName, [name]: value });
    setError1('');
    setError2('');
  };
  console.log(clientName, 'clientName');
  const HandleBBSave = async () => {
    console.log(clientName, 'material saved');
    const values = {
      version: 'v1',
      method: 'create_bb_category',
      entity: 'bb_category_api',
      name1: clientName?.material,
      type: clientName?.material_abbr,
    };
    console.log(values, 'valuesname');
    if (clientName?.material === '' || clientName.material === undefined) {
      setError1('Input field cannot be empty');
      console.log(errorC1);
    } else if (
      clientName.material_abbr === '' ||
      clientName.material_abbr === undefined
    ) {
      setError2('Input field cannot be empty');
    } else {
      let apiRes: any = await postBBCategoryApi(loginAcessToken?.token, values);
      console.log('apires', apiRes);
      if (apiRes?.status === 'success') {
        toast.success('BB Category Created');
        const BbData = await getBBCategoryApi(loginAcessToken.token);
        setBBCategory(BbData);
      } else {
        toast.error('BB Category already exist');
      }
      setError1('');
      setClientNameValue({
        material: '',
        material_abbr: '',
      });
    }
  };

  // client group post api
  const HandleClientGrpSubmit = async () => {
    const values = {
      version: 'v1',
      method: 'create_client_group',
      entity: 'client_group_post_api',
      client_group: inputValue1,
    };
    console.log(values, 'valuesname');
    if (inputValue1.trim() === '') {
      setErrorC('Input field cannot be empty');
    } else {
      let apiRes: any = await postClientGroupApi(
        loginAcessToken?.token,
        values
      );
      console.log('apires', apiRes);
      if (apiRes?.status === 'success' && apiRes?.hasOwnProperty('data')) {
        toast.success('Client Group Created');
        const clientGrpData: any = await getClientApi(loginAcessToken.token);
        setClientList(clientGrpData);
      } else {
        toast.error('Client Group already exist');
      }
      setErrorC('');
      setInputValue1('');
    }
  };
  const HandleClientGrpValue = (e: any) => {
    setErrorC('');
    setInputValue1(e.target.value);
    console.log(inputValue1, 'input value');
  };

  return {
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
  };
};
export default useClientHook;
