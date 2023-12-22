import getBBCategoryApi from '@/services/api/Master/get-bbCategory-api';
import getClientApi from '@/services/api/Master/get-client-api';
import getKunCsOtCategoryApi from '@/services/api/Master/get-kunCsOtCategory-api';
import postBBCategoryApi from '@/services/api/Master/post-bbCategory-api';
import postClientApi from '@/services/api/Master/post-client-api';
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
  const [KunCsOtCategory, setKunCsOtCategory] = useState();
  const [BBCategory, setBBCategory] = useState();
  const [searchClient, setSearchClient] = useState();
  // get api function
  useEffect(() => {
    const getStateData: any = async () => {
      const clientData: any = await getClientApi(loginAcessToken.token);
      const kunCsOtData = await getKunCsOtCategoryApi(loginAcessToken.token);
      const BBData = await getBBCategoryApi(loginAcessToken.token);
      console.log(kunCsOtData, 'kuncsotdata');
      setClientList(clientData);
      setKunCsOtCategory(kunCsOtData);
      setBBCategory(BBData);
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
      method: 'client_create',
      entity: 'client_api',
      client_name: clientName?.material,
      client_group: clientName?.material_abbr,
    };
    console.log(values, 'valuesname');
    if (clientName?.material === '' || clientName.material === undefined) {
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
    console.log(clientName, 'material saved');
    const values = {
      version: 'v1',
      method: 'create_kun_category',
      entity: 'kun_cs_ot_category_api',
      name1: clientName?.material,
      type: clientName?.material_abbr,
    };
    console.log(values, 'valuesname');
    if (clientName?.material === '' || clientName.material === undefined) {
      setError1('Input field cannot be empty');
      console.log(error1);
    } else if (
      clientName.material_abbr === '' ||
      clientName.material_abbr === undefined
    ) {
      setError2('Input field cannot be empty');
    } else {
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
      console.log(error1);
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
  };
};
export default useClientHook;
