import getDeliveryNoteListing from '@/services/api/Sales/get-delivery-note-listing-api';
import { get_access_token } from '@/store/slices/auth/login-slice';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const UseDeliveryNoteHook = () => {
  const loginAcessToken = useSelector(get_access_token);
  const [deliveryNoteListing, setDeliveryNoteListing] = useState();
  console.log('inside dn hook');
  const deliveryNoteListParams = {
    version: 'v1',
    method: 'get_listening_delivery_note_sales_return',
    entity: 'delivery_note_api',
  };
  useEffect(() => {
    const getKunCsOTCategoryData = async () => {
      const deliveryNoteApi: any = await getDeliveryNoteListing(
        loginAcessToken.token,
        deliveryNoteListParams
      );
      if (deliveryNoteApi?.data?.message?.status === 'success') {
        setDeliveryNoteListing(deliveryNoteApi?.data?.message?.data);
      }
    };

    getKunCsOTCategoryData();
  }, []);

  return {
    deliveryNoteListing,
    setDeliveryNoteListing,
  };
};
export default UseDeliveryNoteHook;
