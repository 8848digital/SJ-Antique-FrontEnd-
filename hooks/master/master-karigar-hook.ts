import postKarigarApi from '@/services/api/Master/post-karigar-name';
import postKunKarigarApi from '@/services/api/Master/post-kundan-karigar-name';
import {
  getKarigarNameData,
  get_karigar_name_data,
} from '@/store/slices/Master/karigar-name-slice';
import {
  getKunKarigarNameData,
  get_kun_karigar_name_data,
} from '@/store/slices/Master/kun-karigar-name-slice';
import { get_access_token } from '@/store/slices/auth/login-slice';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useDeleteModal } from '../DeleteModal/delete-modal-hook';
import MasterUpdateApi from '@/services/api/Master/master-update-api';

const useKarigarHooks = () => {
  const {
    showDeleteModal,
    setShowDeleteModal,
    handleCloseDeleteModal,
    handleShowDeleteModal,
    deleteRecord,
  }: any = useDeleteModal();
  const [showAddRecord, setShowAddRecord] = useState(false);
  const [originalName, setOriginalName] = useState();
  const dispatch = useDispatch();

  const router = useRouter();
  const loginAcessToken = useSelector(get_access_token);
  const show = useRef<boolean>(false);

  let karigarList = useSelector(get_karigar_name_data).data;
  let kunKarigarList = useSelector(get_kun_karigar_name_data).data;

  //post karigar name
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  const HandleSubmit = async () => {
    const values = {
      version: 'v1',
      method: 'create_karigar',
      entity: 'karigar',
      karigar_name: inputValue,
    };
    if (inputValue.trim() === '') {
      setError('Input field cannot be empty');
    } else {
      let apiRes: any = await postKarigarApi(loginAcessToken?.token, values);

      if (apiRes?.status === 'success' && apiRes?.hasOwnProperty('data')) {
        toast.success('Karigar Name Created');
        dispatch(getKarigarNameData(loginAcessToken.token));
      } else {
        toast.error('Karigar Name already exist');
      }
      setError('');
      setInputValue('');
    }
  };
  const HandleInputValue = (e: any) => {
    setError('');
    setInputValue(e.target.value);
  };
  const handleUpdateKarigar = async () => {
    const body = {
      version: 'v1',
      entity: 'karigar',
      method: 'update_karigar_detail',
      name: originalName,
      karigar_name: inputValue,
    };
    if (inputValue.trim() === '') {
      setError('Input field cannot be empty');
    } else {
      let apiRes: any = await MasterUpdateApi(loginAcessToken?.token, body);
      if (apiRes?.data?.message?.status === 'success' && apiRes?.hasOwnProperty('data')) {
        toast.success('Karigar Name Updated Successfully!');
        dispatch(getKarigarNameData(loginAcessToken.token));
      } else {
        toast.error('Karigar Name already exist');
      }
      setError('');
      setInputValue('');
    }
    setShowAddRecord(false);
  };
  // post kundan karigar api
  const HandleKunSubmit = async () => {
    const values = {
      version: 'v1',
      method: 'create_kundan_karigar',
      entity: 'kundan_karigar',
      karigar_name: inputValue,
    };
    if (inputValue.trim() === '') {
      setError('Input field cannot be empty');
    } else {
      let apiRes: any = await postKunKarigarApi(loginAcessToken?.token, values);

      if (apiRes?.status === 'success' && apiRes?.hasOwnProperty('data')) {
        toast.success('Kundan Karigar Name Created');
        dispatch(getKunKarigarNameData(loginAcessToken.token));
      } else {
        toast.error('Kundan Karigar Name already exist');
      }
      setError('');
      setInputValue('');
    }
  };
  const HandleKunInputValue = (e: any) => {
    setError('');
    setInputValue(e.target.value);
  };
  const handleUpdateKunKarigar = async () => {
    const body = {
      version: 'v1',
      entity: 'kundan_karigar',
      method: 'update_kundan_karigar_detail',
      name: originalName,
      karigar_name: inputValue,
      warehouse: 'Mumbai - 8DL',
    };
    if (inputValue.trim() === '') {
      setError('Input field cannot be empty');
    } else {
      let apiRes: any = await MasterUpdateApi(loginAcessToken?.token, body);
      if (apiRes?.data?.message?.status === 'success' && apiRes?.hasOwnProperty('data')) {
        toast.success('Kundan Karigar Name Updated Successfully!');
        dispatch(getKunKarigarNameData(loginAcessToken.token));
      } else {
        toast.error('Kundan Karigar Name already exist');
      }
      setError('');
      setInputValue('');
      setShowAddRecord(false)
    }
  };

  // Add Record Functions
  const handleCloseAddRecord = () => {
    setShowAddRecord(false), setInputValue('');
  };
  const handleShowAddRecord = (item: any) => {
    setInputValue(item?.karigar_name);
    setOriginalName(item?.karigar_name);
    setShowAddRecord(true);
  };
  return {
    karigarList,
    kunKarigarList,
    inputValue,
    setInputValue,
    HandleInputValue,
    HandleSubmit,
    HandleKunInputValue,
    HandleKunSubmit,
    error,
    setError,
    router,
    show,
    showAddRecord,
    handleShowAddRecord,
    handleCloseAddRecord,
    showDeleteModal,
    setShowDeleteModal,
    handleCloseDeleteModal,
    handleShowDeleteModal,
    deleteRecord,
    handleUpdateKarigar,
    handleUpdateKunKarigar,
  };
};

export default useKarigarHooks;
