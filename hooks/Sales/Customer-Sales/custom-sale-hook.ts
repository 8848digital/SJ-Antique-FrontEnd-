import { useEffect, useState } from 'react';
import UseCustomerSaleHook from './customer-sale-hook';
import getDeliveryNoteApi from '@/services/api/Sales/get-delivery-note-api';
import { useSelector } from 'react-redux';
import { get_access_token } from '@/store/slices/auth/login-slice';
import getDeliveryNoteListing from '@/services/api/Sales/get-delivery-note-listing-api';

const UseDeliveryNoteHook = () => {
  const loginAcessToken = useSelector(get_access_token);
  const [deliveryNoteListing, setDeliveryNoteListing] = useState();
  console.log('inside dn hook');
  useEffect(() => {
    const getKunCsOTCategoryData = async () => {
      const deliveryNoteApi: any = await getDeliveryNoteListing(
        loginAcessToken.token
      );
      if (deliveryNoteApi?.data?.message?.status === 'success') {
        setDeliveryNoteListing(deliveryNoteApi?.data?.message?.data);
      }
    };

    getKunCsOTCategoryData();
  }, []);

  return {
    deliveryNoteListing,
  };
};
export default UseDeliveryNoteHook;
