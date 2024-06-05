import postKarigarApi from '@/services/api/Master/post-karigar-name';
import postKunKarigarApi from '@/services/api/Master/post-kundan-karigar-name';
import getKarigarApi from '@/services/api/PurchaseReceipt/get-karigar-list-api';
import kundanKarigarApi from '@/services/api/PurchaseReceipt/get-kundan-karigar-list-api';
import { get_access_token } from '@/store/slices/auth/login-slice';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const useMasterHooks = () => {
  const router = useRouter();
  const loginAcessToken = useSelector(get_access_token);
  const show = useRef<boolean>(false);
  // get api states
  const [karigarList, setKarigarList] = useState();
  const [kunKarigarList, setKunKarigarList] = useState();

  // get api functions
  useEffect(() => {
    const getStateData: any = async () => {
      const karigarData: any = await getKarigarApi(loginAcessToken.token);
      const kunKarigarData = await kundanKarigarApi(loginAcessToken.token);
      if (karigarData?.data?.message?.status === 'success') {
        setKarigarList(karigarData?.data?.message?.data);
      }

      if (kunKarigarData?.data?.message?.status === 'success') {
        setKunKarigarList(kunKarigarData?.data?.message?.data);
      }
    };
    getStateData();
  }, []);
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
        const karigarApi: any = await getKarigarApi(loginAcessToken.token);
        if (karigarApi?.data?.message?.status === 'success') {
          setKarigarList(karigarApi?.data?.message?.data);
        }
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
        const karigarApi = await kundanKarigarApi(loginAcessToken?.token);
        if (karigarApi?.data?.message?.status === 'success') {
          setKunKarigarList(karigarApi?.data?.message?.data);
        }
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

  return {
    karigarList,
    kunKarigarList,
    inputValue,
    HandleInputValue,
    HandleSubmit,
    HandleKunInputValue,
    HandleKunSubmit,
    error,
    setError,
    router,
    show,
  };
};

export default useMasterHooks;
