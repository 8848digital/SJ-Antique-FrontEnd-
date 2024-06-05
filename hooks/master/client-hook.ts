import getBBCategoryApi from '@/services/api/Master/get-bbCategory-api';
import getCategoryApi from '@/services/api/Master/get-category-api';
import getClientApi from '@/services/api/Master/get-client-api';
import getClientGroupApi from '@/services/api/Master/get-client-group-api';
import getKunCsOtCategoryApi from '@/services/api/Master/get-kunCsOtCategory-api';
import getSubCategoryApi from '@/services/api/Master/grt-sub-category-api';
import postBBCategoryApi from '@/services/api/Master/post-bbCategory-api';
import postCategoryApi from '@/services/api/Master/post-category-api';
import postClientApi from '@/services/api/Master/post-client-api';
import postGroupDataApi from '@/services/api/Master/post-client-group-api';
import postKunCsOtCategoryApi from '@/services/api/Master/post-kunCsOtCategory-api';
import postSubCategoryApi from '@/services/api/Master/post-sub-category-api';
import { get_access_token } from '@/store/slices/auth/login-slice';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const useClientHook = () => {
  // const dispatch = useDispatch();
  // access token
  const loginAcessToken = useSelector(get_access_token);
  // api states
  const [clientList, setClientList] = useState();
  const [clientGroupList, setClientGroupList] = useState();
  const [KunCsOtCategory, setKunCsOtCategory] = useState();
  const [BBCategory, setBBCategory] = useState();
  const [category, setCategory] = useState();
  const [subCategory, setSubCategory] = useState();
  const [searchClient, setSearchClient] = useState('');
  const [searchCategory, setSearchCategory] = useState('');
  const [inputValue1, setInputValue1] = useState('');
  const [errorC, setErrorC] = useState('');
  const [selectDropDownReset, setSelectDropDownReset] =
    useState<boolean>(false);
  // get api function
  useEffect(() => {
    const getStateData: any = async () => {
      const clientData: any = await getClientApi(loginAcessToken.token);
      const clientGroupData: any = await getClientGroupApi(
        loginAcessToken.token
      );
      const kunCsOtData = await getKunCsOtCategoryApi(loginAcessToken.token);
      const BBData = await getBBCategoryApi(loginAcessToken.token);
      const categoryData = await getCategoryApi(loginAcessToken.token);
      const subCategoryData = await getSubCategoryApi(loginAcessToken.token);
      if (clientGroupData?.data?.message?.status === 'success') {
        setClientGroupList(clientGroupData?.data?.message?.data);
      }
      if (clientData?.data?.message?.status === 'success') {
        setClientList(clientData?.data?.message?.data);
      }
      if (kunCsOtData?.data?.message?.status === 'success') {
        setKunCsOtCategory(kunCsOtData?.data?.message?.data);
      }
      if (BBData?.data?.message?.status === 'success') {
        setBBCategory(BBData?.data?.message?.data);
      }
      if (categoryData?.data?.message?.status === 'success') {
        setCategory(BBData?.data?.message?.data);
      }
      if (subCategoryData?.data?.message?.status === 'success') {
        setSubCategory(BBData?.data?.message?.data);
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
  useEffect(() => {
    setClientNameValue({
      ...clientName,
      material_abbr: searchClient,
    });
    setError1('');
    setError2('');
  }, [searchClient]);
  const HandleClientNameChange = (e: any) => {
    const { value } = e.target;

    setClientNameValue({
      ...clientName,
      material: value,
      material_abbr: searchClient,
    });
    setError1('');
    setError2('');
  };
  const HandleClientSave = async () => {
    const values = {
      version: 'v1',
      method: 'create_client',
      entity: 'client',
      client_name: clientName?.material,
      client_group: searchClient,
    };
    if (clientName?.material === '' || clientName.material === undefined) {
      setError1('Input field cannot be empty');
    } else if (
      clientName.material_abbr === '' ||
      clientName.material_abbr === undefined
    ) {
      setError2('Input field cannot be empty');
    } else {
      let apiRes: any = await postClientApi(loginAcessToken?.token, values);
      if (apiRes?.status === 'success') {
        toast.success('Client Name Created');
        const clientData = await getClientApi(loginAcessToken.token);
        setClientList(clientData?.data?.message?.data);
      } else {
        toast.error('Client Name already exist');
      }
      setError1('');
      setClientNameValue({
        material: '',
        material_abbr: '',
      });
      setSelectDropDownReset(true);
    }
  };

  // Sub-category post API
  const HandleSubCategoryChange = (e: any) => {
    const { value } = e.target;
    setClientNameValue({
      ...clientName,
      material: value,
      material_abbr: searchCategory,
    });
    setError1('');
    setError2('');
  };
  const HandleSubCategorySave = async () => {
    const values = {
      version: 'v1',
      method: 'create_client',
      entity: 'client',
      client_name: clientName?.material,
      client_group: searchCategory,
    };
    if (clientName?.material === '' || clientName.material === undefined) {
      setError1('Input field cannot be empty');
    } else if (
      clientName.material_abbr === '' ||
      clientName.material_abbr === undefined
    ) {
      setError2('Input field cannot be empty');
    } else {
      let apiRes: any = await postSubCategoryApi(loginAcessToken?.token, values);
      if (apiRes?.status === 'success') {
        toast.success('Sub-category Name Created');
        const clientData = await getClientApi(loginAcessToken.token);
        setClientList(clientData?.data?.message?.data);
      } else {
        toast.error('Sub-category Name already exist');
      }
      setError1('');
      setClientNameValue({
        material: '',
        material_abbr: '',
      });
      setSelectDropDownReset(true);
    }
  };

  // KunCsOt category post api
  const HandleKunCsOtChange = (e: any) => {
    const { name, value } = e.target;
    setClientNameValue({ ...clientName, [name]: value });
    setError1('');
    setError2('');
  };
  const HandleKunCsOtSave = async () => {
    const values = {
      version: 'v1',
      method: 'create_kun_cs_ot_category',
      entity: 'kun_cs_ot_category',
      name1: clientName?.material,
      type: clientName?.material_abbr,
    };
    if (clientName?.material === '' || clientName.material === undefined) {
      setError1('Input field cannot be empty');
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
      if (apiRes?.status === 'success') {
        toast.success('Kun-Cs-Ot Category Created');
        const KunData = await getKunCsOtCategoryApi(loginAcessToken.token);
        setKunCsOtCategory(KunData?.data?.message?.data);
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
    const { name, value } = e.target;
    setClientNameValue({ ...clientName, [name]: value });
    setError1('');
    setError2('');
  };
  const HandleBBSave = async () => {
    const values = {
      version: 'v1',
      method: 'create_bb_category',
      entity: 'bb_category',
      name1: clientName?.material,
      type: clientName?.material_abbr,
    };
    if (clientName?.material === '' || clientName.material === undefined) {
      setError1('Input field cannot be empty');
    } else if (
      clientName.material_abbr === '' ||
      clientName.material_abbr === undefined
    ) {
      setError2('Input field cannot be empty');
    } else {
      let apiRes: any = await postBBCategoryApi(loginAcessToken?.token, values);
      if (apiRes?.status === 'success') {
        toast.success('BB Category Created');
        const BbData = await getBBCategoryApi(loginAcessToken.token);
        setBBCategory(BbData?.data?.message?.data);
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
      entity: 'client_group',
      client_group: inputValue1,
    };
    if (inputValue1.trim() === '') {
      setErrorC('Input field cannot be empty');
    } else {
      let apiRes: any = await postGroupDataApi(loginAcessToken?.token, values);
      if (apiRes?.status === 'success' && apiRes?.hasOwnProperty('data')) {
        toast.success('Client Group Created');
        const clientGrpData: any = await getClientGroupApi(
          loginAcessToken.token
        );
        setClientGroupList(clientGrpData?.data?.message?.data);
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
  };
  const handleSelectClientGroup = (value: any) => {
    setSearchClient(value);
  };

  // Category post API
  const HandleCategorySubmit = async () => {
    const values = {
      version: 'v1',
      method: 'create_client_group',
      entity: 'client_group',
      client_group: inputValue1,
    };
    if (inputValue1.trim() === '') {
      setErrorC('Input field cannot be empty');
    } else {
      let apiRes: any = await postCategoryApi(loginAcessToken?.token, values);
      if (apiRes?.status === 'success' && apiRes?.hasOwnProperty('data')) {
        toast.success('Category Name Created');
        const categoryData: any = await getCategoryApi(loginAcessToken.token);
        setCategory(categoryData?.data?.message?.data);
      } else {
        toast.error('Category Name already exist');
      }
      setErrorC('');
      setInputValue1('');
    }
  };
  const HandleCategoryValue = (e: any) => {
    setErrorC('');
    setInputValue1(e.target.value);
  };
  const handleSelectCategory = (value: any) => {
    setSearchCategory(value);
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
    handleSelectClientGroup,
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
    searchCategory
  };
};
export default useClientHook;
