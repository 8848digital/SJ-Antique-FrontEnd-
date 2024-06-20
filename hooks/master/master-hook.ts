import postBBCategoryApi from '@/services/api/Master/post-bbCategory-api';
import postCategoryApi from '@/services/api/Master/post-category-api';
import postClientApi from '@/services/api/Master/post-client-api';
import postGroupDataApi from '@/services/api/Master/post-client-group-api';
import postKunCsOtCategoryApi from '@/services/api/Master/post-kunCsOtCategory-api';
import postSubCategoryApi from '@/services/api/Master/post-sub-category-api';
import {
  getBBCategoryData,
  get_bb_category_data,
} from '@/store/slices/Master/get-bb-category-slice';
import {
  getCategoryData,
  get_category_data,
} from '@/store/slices/Master/get-category-slice';
import {
  getClientGroupData,
  get_client_group_data,
} from '@/store/slices/Master/get-client-group-slice';
import {
  getClientNameData,
  get_client_name_data,
} from '@/store/slices/Master/get-client-name-slice';
import {
  getKunCategoryData,
  get_kun_category_data,
} from '@/store/slices/Master/get-kun-category-slice';
import {
  getSubCategoryData,
  get_sub_category_data,
} from '@/store/slices/Master/get-sub-category-slice';
import { get_access_token } from '@/store/slices/auth/login-slice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useDeleteModal } from '../DeleteModal/delete-modal-hook';
import MasterUpdateApi from '@/services/api/Master/master-update-api';
import MasterDeleteApi from '@/services/api/Master/master-delete-api';

const useMasterHook = () => {
  const {
    showDeleteModal,
    setShowDeleteModal,
    handleCloseDeleteModal,
    handleShowDeleteModal,
    deleteRecord,
  }: any = useDeleteModal();
  const [showAddRecord, setShowAddRecord] = useState(false);

  const dispatch = useDispatch();
  // access token
  const loginAcessToken = useSelector(get_access_token);
  // Listing states
  let clientList = useSelector(get_client_name_data).data;
  let clientGroupList = useSelector(get_client_group_data).data;
  let KunCsOtCategory = useSelector(get_kun_category_data).data;
  let BBCategory = useSelector(get_bb_category_data).data;
  let category = useSelector(get_category_data).data;
  let subCategory = useSelector(get_sub_category_data).data;

  const [searchClient, setSearchClient] = useState('');
  const [searchCategory, setSearchCategory] = useState('');
  const [inputValue1, setInputValue1] = useState('');
  const [errorC, setErrorC] = useState('');
  const [selectDropDownReset, setSelectDropDownReset] =
    useState<boolean>(false);
  const [errorC1, setError1] = useState('');
  const [errorC2, setError2] = useState('');
  const [errorC3, setError3] = useState('');
  const [clientName, setClientNameValue] = useState({
    material: '',
    material_abbr: '',
  });

  const [originalName, setOriginalName] = useState();

  // client post api
  // useEffect(() => {
  //   setClientNameValue({
  //     ...clientName,
  //     material_abbr: searchClient,
  //   });
  //   setError1('');
  //   setError2('');
  // }, []);
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
      searchClient === '' ||
      searchClient === undefined
    ) {
      setError2('Input field cannot be empty');
    } else {
      let apiRes: any = await postClientApi(loginAcessToken?.token, values);
      if (apiRes?.status === 'success') {
        toast.success('Client Name Created');
        dispatch(getClientNameData(loginAcessToken.token));
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
  const handleUpdateClient = async () => {
    const body = {
      version: 'v1',
      entity: 'client',
      method: 'update_client_detail',
      name: originalName,
      client_group: searchClient,
      client_name: clientName?.material,
    };
    if (clientName?.material === '' || clientName.material === undefined) {
      setError1('Input field cannot be empty');
    } else if (
      searchClient === '' ||
      searchClient === undefined
    ) {
      setError2('Input field cannot be empty');
    } else {
      let apiRes: any = await MasterUpdateApi(loginAcessToken?.token, body);
      if (apiRes?.data?.message?.status === 'success') {
        toast.success('Client Name Created');
        dispatch(getClientNameData(loginAcessToken.token));
      } else {
        toast.error('Client Name already exist');
      }
      setError1('');
      setClientNameValue({
        material: '',
        material_abbr: '',
      });
      setSelectDropDownReset(true);
      setSearchClient('')
      setShowAddRecord(false);
    }
  };
  const handleDeleteClient = async (name: any) => {
    if (name !== undefined && name !== '') {
      const apiRes = await MasterDeleteApi(
        loginAcessToken?.token,
        'Client',
        name
      );
      if(apiRes?.status === 202){
        toast.success('Client Deleted Successfully!')
        dispatch(getClientNameData(loginAcessToken.token));
      }else{
        toast.error('Client cannot be deleted')
      }
      setShowDeleteModal(false)
    }
  };

  // Sub-category post API
  const HandleSubCategoryChange = (e: any) => {
    const { name, value } = e.target;
    setClientNameValue({ ...clientName, [name]: value });
    setError1('');
    setError2('');
  };
  const HandleSubCategorySave = async () => {
    const values = {
      version: 'v1',
      method: 'create_subcategory',
      entity: 'category',
      category_name: searchCategory,
      subcategory_name: clientName?.material,
      full_form: clientName?.material_abbr,
    };

    if (clientName?.material === '' || clientName.material === undefined) {
      setError1('Input field cannot be empty');
    } else if (clientName?.material?.length !== 3) {
      setError1('Subcategory name must be at least 3 letters.');
    } else if (
      clientName?.material_abbr === '' ||
      clientName?.material_abbr === undefined
    ) {
      setError2('Input field cannot be empty');
    } else if (searchCategory === '' || searchCategory === undefined) {
      setError3('Input field cannot be empty');
    } else {
      let apiRes: any = await postSubCategoryApi(
        loginAcessToken?.token,
        values
      );
      if (apiRes?.status === 'success') {
        toast.success('Sub-category Name Created');
        dispatch(getSubCategoryData(loginAcessToken.token));
      } else {
        toast.error('Sub Category Name already exist');
      }
      setError1('');
      setClientNameValue({
        material: '',
        material_abbr: '',
      });
      setSelectDropDownReset(true);
    }
  };
  const handleUpdateSubCategory = async () => {
    const body = {
      version: 'v1',
      entity: 'category',
      method: 'update_sub_category_details',
      name: originalName,
      subcategory_name: clientName?.material,
      category: searchCategory,
      full_form: clientName?.material_abbr,
    };
    if (clientName?.material === '' || clientName.material === undefined) {
      setError1('Input field cannot be empty');
    } else if (clientName?.material?.length !== 3) {
      setError1('Subcategory name must be at least 3 letters.');
    } else if (
      clientName?.material_abbr === '' ||
      clientName?.material_abbr === undefined
    ) {
      setError2('Input field cannot be empty');
    } else if (searchCategory === '' || searchCategory === undefined) {
      setError3('Input field cannot be empty');
    } else {
      let apiRes: any = await MasterUpdateApi(loginAcessToken?.token, body);
      if (apiRes?.data?.message?.status === 'success') {
        toast.success('Sub-category Name Created');
        dispatch(getSubCategoryData(loginAcessToken.token));
      } else {
        toast.error('Sub Category Name already exist');
      }
      setError1('');
      setClientNameValue({
        material: '',
        material_abbr: '',
      });
      setSelectDropDownReset(true);
      setShowAddRecord(false);
    }
  };
  const handleDeleteSubCategory = async (name: any) => {
    if (name !== undefined && name !== '') {
      const apiRes = await MasterDeleteApi(
        loginAcessToken?.token,
        'Sub Category',
        name
      );
      if(apiRes?.status === 202){
        toast.success('Sub Category Deleted Successfully!')
        dispatch(getSubCategoryData(loginAcessToken.token));
      }else{
        toast.error('Sub Category cannot be deleted')
      }
      setShowDeleteModal(false)
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
        dispatch(getKunCategoryData(loginAcessToken.token));
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
  const handleUpdateKunCsOtCategory = async () => {
    const body = {
      version: 'v1',
      entity: 'kun_cs_ot_category',
      method: 'update_kun_cs_ot_details',
      name: originalName,
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
      let apiRes: any = await MasterUpdateApi(loginAcessToken?.token, body);
      if (apiRes?.data?.message?.status === 'success') {
        toast.success('Kun-Cs-Ot Category Created');
        dispatch(getKunCategoryData(loginAcessToken.token));
      } else {
        toast.error('Kun-Cs-Ot Category already exist');
      }
      setError1('');
      setClientNameValue({
        material: '',
        material_abbr: '',
      });
      setShowAddRecord(false);
    }
  };
  const handleDeleteKunCSOtCategory = async (name: any) => {
    if (name !== undefined && name !== '') {
      const apiRes = await MasterDeleteApi(
        loginAcessToken?.token,
        'Kun-CS-Ot Category',
        name
      );
      if(apiRes?.status === 202){
        toast.success('Kun-CS-Ot Category Deleted Successfully!')
        dispatch(getKunCategoryData(loginAcessToken.token));
      }else{
        toast.error('Kun-CS-Ot Category cannot be deleted')
      }
      setShowDeleteModal(false)
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
        dispatch(getBBCategoryData(loginAcessToken.token));
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
  const handleUpdateBBCategory = async () => {
    const body = {
      version: 'v1',
      entity: 'bb_category',
      method: 'update_bb_category_details',
      name: originalName,
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
      let apiRes: any = await MasterUpdateApi(loginAcessToken?.token, body);
      if (apiRes?.data?.message?.status === 'success') {
        toast.success('BB Category Created');
        dispatch(getBBCategoryData(loginAcessToken.token));
      } else {
        toast.error('BB Category already exist');
      }
      setError1('');
      setClientNameValue({
        material: '',
        material_abbr: '',
      });
      setShowAddRecord(false);
    }
  };
  const handleDeleteBBCategory = async (name: any) => {
    if (name !== undefined && name !== '') {
      const apiRes = await MasterDeleteApi(
        loginAcessToken?.token,
        'BB Category',
        name
      );
      if(apiRes?.status === 202){
        toast.success('BB Category Deleted Successfully!')
        dispatch(getBBCategoryData(loginAcessToken.token));
      }else{
        toast.error('BB Category cannot be deleted')
      }
      setShowDeleteModal(false)
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
        dispatch(getClientGroupData(loginAcessToken.token));
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
  const handleUpdateClientGroup = async () => {
    const body = {
      version: 'v1',
      entity: 'client_group',
      method: 'update_client_group_detail',
      name: originalName,
      client_group: inputValue1,
    };
    if (inputValue1.trim() === '') {
      setErrorC('Input field cannot be empty');
    } else {
      let apiRes: any = await MasterUpdateApi(loginAcessToken?.token, body);
      if (
        apiRes?.data?.message?.status === 'success' &&
        apiRes?.hasOwnProperty('data')
      ) {
        toast.success('Client Group Updated Successfully!');
        dispatch(getClientGroupData(loginAcessToken.token));
      } else {
        toast.error('Client Group already exist');
      }
      setErrorC('');
      setInputValue1('');
      setShowAddRecord(false);
    }
  };
  const handleDeleteClientGroup = async (name: any) => {
    if (name !== undefined && name !== '') {
      const apiRes = await MasterDeleteApi(
        loginAcessToken?.token,
        'Client Group',
        name
      );
      if(apiRes?.status === 202){
        toast.success('Client Group Deleted Successfully!')
        dispatch(getClientGroupData(loginAcessToken.token));
      }else{
        toast.error('Client Group cannot be deleted')
      }
      setShowDeleteModal(false)
    }
  };

  // Category post API
  const HandleCategorySubmit = async () => {
    const values = {
      version: 'v1',
      method: 'create_category',
      entity: 'category',
      category_name: inputValue1,
    };
    if (inputValue1.trim() === '') {
      setErrorC('Input field cannot be empty');
    } else {
      let apiRes: any = await postCategoryApi(loginAcessToken?.token, values);
      if (apiRes?.status === 'success' && apiRes?.hasOwnProperty('data')) {
        toast.success('Category Name Created');
        dispatch(getCategoryData(loginAcessToken.token));
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
  const handleUpdateCategory = async () => {
    const body = {
      version: 'v1',
      entity: 'category',
      method: 'update_category_details',
      name: originalName,
      category_name: inputValue1,
    };
    if (inputValue1.trim() === '') {
      setErrorC('Input field cannot be empty');
    } else {
      let apiRes: any = await MasterUpdateApi(loginAcessToken?.token, body);
      if (
        apiRes?.data?.message?.status === 'success' &&
        apiRes?.hasOwnProperty('data')
      ) {
        toast.success('Category Name Updated Successfully!');
        dispatch(getCategoryData(loginAcessToken.token));
      } else {
        toast.error('Category Name already exist');
      }
      setErrorC('');
      setInputValue1('');
      setSearchCategory('')
      setShowAddRecord(false);
    }
  };
  const handleDeleteCategory = async (name: any) => {
    if (name !== undefined && name !== '') {
      const apiRes = await MasterDeleteApi(
        loginAcessToken?.token,
        'Category',
        name
      );
      if(apiRes?.status === 202){
        toast.success('Category Deleted Successfully!')
        dispatch(getCategoryData(loginAcessToken.token));
      }else{
        toast.error('Category cannot be deleted')
      }
      setShowDeleteModal(false)
    }
  };

  // Handle Add record Modal
  const handleCloseAddRecord = () => {setShowAddRecord(false)
    setSearchClient('')
    setClientNameValue({
      material: '',
      material_abbr: '',
    })
    setInputValue1('')
    setSearchCategory('')
  };
  const handleShowAddRecord = (item: any) => {
    if (item?.karigar_name) {
      setInputValue1(item?.karigar_name);
      setOriginalName(item?.karigar_name);
    } else {
      setClientNameValue(item);
      setSearchClient(item?.material_abbr);
      setSearchCategory(item?.material_group);
      setOriginalName(item?.material);
      setSelectDropDownReset(false)
    }
    setShowAddRecord(true);
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
    errorC3,
    errorC,
    setErrorC,
    HandleClientGrpSubmit,
    HandleClientGrpValue,
    inputValue1,
    setInputValue1,
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
    searchCategory,
    showDeleteModal,
    setShowDeleteModal,
    handleCloseDeleteModal,
    handleShowDeleteModal,
    deleteRecord,
    showAddRecord,
    handleShowAddRecord,
    handleCloseAddRecord,
    handleUpdateCategory,
    handleUpdateSubCategory,
    handleUpdateClient,
    handleUpdateClientGroup,
    handleUpdateBBCategory,
    handleUpdateKunCsOtCategory,
    handleDeleteCategory,
    handleDeleteSubCategory,
    handleDeleteClient,
    handleDeleteClientGroup,
    handleDeleteBBCategory,
    handleDeleteKunCSOtCategory
  };
};
export default useMasterHook;
